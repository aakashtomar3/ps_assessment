import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from 'redux';
import loginReducer from "../../Login/ducks/LoginReducer";
import TaskReducer from "../../Dashboard/ducks/TaskReducer";
import StateLoader from "../StateLoader";

const stateLoader = new StateLoader();
// Put all middlewares here
let middlewares = [];
const middlewareEnhancer = applyMiddleware(...middlewares);

// Put all enhancers here
let enhancers = [middlewareEnhancer];
let composedEnhancers = null;
composedEnhancers = compose(...enhancers);

const finalReducer = combineReducers({
    loginReducer,
    TaskReducer
});
const store = createStore(finalReducer, stateLoader.loadState(), composedEnhancers);

store.subscribe(() => {
    stateLoader.saveState(store.getState());
});
export default store;