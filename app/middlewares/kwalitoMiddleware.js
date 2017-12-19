import assert from 'assert';
import * as actionTypes from '../constants/ActionTypes';
import * as actions from '../actions/kwalito';

export const middlewareActions = {
  [actionTypes.USER_SIGNIN]: (kwalitoSDK, action) => {
    return new Promise((resolve) => {
      assert(action.login, 'Please enter your login (email)');
      assert(action.password, 'Please enter your password');
      resolve(
        kwalitoSDK.userLogin({login: action.login, password: action.password})
          .then((user) => {
            action.user = user;
          })
      );
    });
  },

  [actionTypes.USER_SIGNUP]: (kwalitoSDK, action) => {
    return new Promise((resolve) => {
      assert(action.userInfo.firstName, 'Please enter your first name');
      assert(action.userInfo.lastName, 'Please enter your last name');
      assert(action.login, 'Please enter your login (email)');
      assert(action.password, 'Please enter your password');
      resolve(
        kwalitoSDK.userSignupOrLogin({
          login: action.login,
          password: action.password,
          userInfo: action.userInfo
        })
          .then((user) => {
            action.user = user;
          })
      );
    });
  },

  [actionTypes.USER_SIGNOUT]: (kwalitoSDK, action) => {
    return new Promise((resolve) => {
      resolve(
        kwalitoSDK.userLogout()
          .then((user) => {
            action.user = user;
          })
      );
    });
  },

  [actionTypes.DIET_TOGGLE_SELECT]: (kwalitoSDK, action, store) => {
    return new Promise((resolve) => {
      assert(action.id, 'The id of the diet is mandatory');
      resolve(
        kwalitoSDK.userGet()
          .then((user) => {
            user.diets[action.id].selected = !user.diets[action.id].selected;
            return kwalitoSDK.userDietUpdate(user.diets)
              .then(() => {
                store.dispatch(actions.updateState({user}));
              })
          })
      );
    });
  },

  [actionTypes.DIET_SET_OPTIONS]: (kwalitoSDK, action, store) => {
    return new Promise((resolve) => {
      assert(action.id, 'The id of the diet is mandatory');
      assert(action.options, 'The options of the diet is mandatory');
      resolve(
        kwalitoSDK.userGet()
          .then((user) => {
            user.diets[action.id].options = action.options;
            return kwalitoSDK.userDietUpdate(user.diets)
              .then(() => {
                store.dispatch(actions.updateState({user}));
              })
              ;
          })
      );
    });
  },

  [actionTypes.INGREDIENT_SEARCH]: (kwalitoSDK, action, store) => {
    return new Promise((resolve) => {
      assert(action.query, 'Please write your query');
      resolve(
        kwalitoSDK.ingredientSearch(action.query)
          .then((result) => {
            const state = store.getState();
            console.log('STATE:', state);
            _.pullAllWith(result, state.kwalito.user.ingredients, (a, b) => (a.ingr === b.ingr));
            store.dispatch(actions.updateState({ingredientSearchResult: result}, 'assign'));
          })
      );
    });
  },

  [actionTypes.INGREDIENT_ADD]: (kwalitoSDK, action, store) => {
    return new Promise((resolve) => {
      assert(action.ingredient, 'The ingredient is mandatory');
      resolve(
        kwalitoSDK.ingredientAdd(action.ingredient)
          .then((newUserIngredients) => {
            const state = store.getState();
            const user = _.assign({}, state.kwalito.user);
            user.ingredients = newUserIngredients;
            store.dispatch(actions.updateState({user}, 'assign'));
          })
      );
    });
  },

  [actionTypes.INGREDIENT_REMOVE]: (kwalitoSDK, action, store) => {
    return new Promise((resolve) => {
      assert(action.ingredient, 'The ingredient is mandatory');
      resolve(
        kwalitoSDK.ingredientRemove(action.ingredient)
          .then((newUserIngredients) => {
            const state = store.getState();
            const user = _.assign({}, state.kwalito.user);
            user.ingredients = newUserIngredients;
            store.dispatch(actions.updateState({user}, 'assign'));
          })
      );
    });
  }
};

export default (kwalitoSDK, history) => (store) => (next) => (action) => {
  if (middlewareActions[action.type]) {
    return middlewareActions[action.type](kwalitoSDK, action, store)
      .then(() => {
        if(action.next){
          history.replace(action.next);
        }
      })
      .catch((error) => {
        console.error('CATCH MIDDLEWARE ERROR:', error);
        action.error = error;
      })
      .finally(() => next(action))
      ;
  }
  next(action);
};
