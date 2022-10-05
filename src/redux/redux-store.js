import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import appReducer from './app-reducer.js';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    app: appReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;