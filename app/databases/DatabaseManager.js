import { LocalDatabase, RemoteDatabase } from './Database';
import assert from 'assert';

export default class DatabaseManager {
  static basicAnonymousUser() {
    return {
      anonymous: true,
      creationDate: new Date()
    };
  }

  static convertToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
  }

  constructor(remoteCouchBaseUrl) {
    this.remoteCouchBaseUrl = remoteCouchBaseUrl;
    this.dbs = {};
    //   reference:    new RemoteDatabase({name: 'reference', remoteCouchBaseUrl}),
    //   contribution: new RemoteDatabase({name: 'contribution', remoteCouchBaseUrl}),
    //   user:         new LocalDatabase('user')
    // };
  }

  init() {
    this.dbs.user = new LocalDatabase('user');
    return this.dbs.user.findAll()
      .then((allUsers) => {
        // If no user is registered, this is the first time the extension is loaded
        if (allUsers.length === 0) {
          this.dbs.reference = new RemoteDatabase({
            name: 'reference',
            remoteCouchBaseUrl: this.remoteCouchBaseUrl
          });
          this.dbs.contribution = new RemoteDatabase({
            name: 'contribution',
            remoteCouchBaseUrl: this.remoteCouchBaseUrl
          });
          return this.dbs.user.create(DatabaseManager.basicAnonymousUser());
        }
        const user = allUsers[0];
        // if the user has an authentication token, register it
        if (user.authSession) {
          this.userSignedIn(user);
          this.dbs.reference = new RemoteDatabase({
            name: 'reference',
            remoteCouchBaseUrl: this.remoteCouchBaseUrl,
            authSession: user.authSession
          });
          this.dbs.contribution = new RemoteDatabase({
            name: 'contribution',
            remoteCouchBaseUrl: this.remoteCouchBaseUrl,
            authSession: user.authSession
          });
          return this.dbs.user.getUser(user.name);
        }
        // if the user is anonymous, just return him
        this.dbs.reference = new RemoteDatabase({
          name: 'reference',
          remoteCouchBaseUrl: this.remoteCouchBaseUrl
        });
        this.dbs.contribution = new RemoteDatabase({
          name: 'contribution',
          remoteCouchBaseUrl: this.remoteCouchBaseUrl
        });
        return user;
      })
      ;
  }

  userSignedIn({ name, authSession }) {
    assert(name, 'You must provide the user\'s database name');
    // assert(authSession, 'You must provide the user\'s session token');
    // Re-open the user database synchronized with the remote one
    this.dbs.user = new RemoteDatabase({
      name:       'user',
      remoteName: `userdb-${DatabaseManager.convertToHex(name)}`,
      remoteCouchBaseUrl: this.remoteCouchBaseUrl,
      authSession
    });
    // refresh the session token
    // return new Promise((resolve, reject) => {
    //   return this.dbs.user.renewSession(undefined, (error, data, response) => {
    //     if(error){
    //       return reject(error);
    //     }
    //     console.log(response.headers);
    //     resolve(data);
    //   })
    // });
  }
}