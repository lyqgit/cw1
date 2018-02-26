/**
 * Created by lyq on 2018/2/19.
 */
import {
    createReactNavigationReduxMiddleware,
    createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.doSkip,
);
const addListener = createReduxBoundAddListener("root");

export {
    middleware,
    addListener,
};