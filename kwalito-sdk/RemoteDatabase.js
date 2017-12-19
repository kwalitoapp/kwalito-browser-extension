import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-authentication'));

export class LocalDatabase {
  constructor(name) {
    this.name = name;
    this.db = new PouchDB(name);
  }

  create(payload) {
    return this.db.post(payload)
      .then(result => this.find(result.id))
      ;
  }

  del(payload) {
    return this.find(payload.id)
      .then(doc => this.db.put({ ...doc, _deleted: true }))
      ;
  }

  deleteAll() {
    return this.findAll()
      .then((docs) => docs.map((doc) => this.del(doc._id)))
      ;
  }

  delAttachment(id, att) {
    return this.find(id)
      .then((doc) => this.db.removeAttachment(doc.id, att, doc._rev))
      .then((finalDoc) => this.find(finalDoc.id))
      ;
  }

  find(id) {
    return this.db.get(id);
  }

  findAll({ options } = {}) {
    return this.db.allDocs({ attachments: true, include_docs: true, ...options })
      .then(docs => docs.rows.map(row => row.doc))
      ;
  }

  update(payload) {
    return this.find(payload.id)
      .then(doc => {
        delete payload._rev;
        payload._rev  = doc._rev;
        return this.db
          .put({...doc, ...payload})
          .then(finalDoc => this.find(finalDoc.id));
      })
  }
}

export class RemoteDatabase extends LocalDatabase {
  constructor({ name, remoteName = name, remoteCouchBaseUrl }) {
    super(name);
    const dbOptions = { skip_setup: true };
    this.remoteName = remoteName;
    this.remoteCouchBaseUrl = remoteCouchBaseUrl;
    this.remoteDb = new PouchDB(`${this.remoteCouchBaseUrl}/${this.remoteName}`, dbOptions);
    this.db.sync(this.remoteDb, {live: true, retry: true}).on('error', console.log.bind(console));
  }

  changePassword({ login, password }) {
    return this.remoteDb.changePassword(login, password);
  }

  getSession() {
    return this.remoteDb.getSession();
  }

  getUser(name) {
    return this.remoteDb.getUser(name);
  }

  login({ login, password }) {
    return new Promise((resolve, reject) => {
      this.remoteDb.login(login, password, {}, (error, data, response) => {
        if(error){
          return reject(error);
        }
        console.log(response);
        resolve(data);
      });
    })
      .then((result) => this.getUser(result.name))
      .then((result) => {console.log('LOGIN RESULT:', result); return result;}).catch((error) => {console.log('SIGNUP ERROR:', error.stack); throw error;});
  }

  logout() {
    return this.remoteDb.logout();
  }

  signup({ login, password }) {
    return this.remoteDb.signup(login, password)
      .then((result) => this.getUser(result.id))
      .then((result) => {console.log('SIGNUP RESULT:', result); return result;}).catch((error) => {console.log('SIGNUP ERROR:', error.stack); throw error;});
  }

  signupOrLogin({ login, password }) {
    return this.signup({ login, password })
      .catch(err => {
        if (err.name === 'conflict') {
          return this.login({ login, password });
        } else {
          throw err;
        }
      })
      ;
  }
}
