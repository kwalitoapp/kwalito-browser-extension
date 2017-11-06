import DatabaseManager from './DatabaseManager';
import * as actionsTypes from '../constants/ActionTypes';

const middlewareActions = {
  [actionsTypes.USER_SIGNIN]: (dbManager, action) => dbManager.dbs.reference.login({ login: action.login, password: action.password })
    .then((user) => dbManager.dbs.reference.getSession())
    .then((session) => dbManager.userSignedIn({ name: session.userCtx.name, authSession: session.userCtx.authSession })),
  [actionsTypes.USER_SIGNUP]: (dbManager, action) => dbManager.dbs.reference.signupOrLogin({ login: action.login, password: action.password })
    .then((user) => dbManager.userSignedIn({ name: user.name, authSession: user.authSession }))
};

export default (remoteCouchBaseUrl) => {
  const dbManager = new DatabaseManager(remoteCouchBaseUrl);
  return dbManager.init()
    .then(() => (store) => (next) => (action) => {
        if (middlewareActions[action.type]) {
          return middlewareActions[action.type](dbManager, action)
            .then(() => {
              if(action.next){
                store.dispatch();
              }
            })
            .then(() => next(action))
            ;
        }
        next(action);
      }
    )
    ;
}
