import { configureStore, Middleware } from '@reduxjs/toolkit'
import appReducer from "./features/AppSlice";
import devicesReducer from "./features/DevicesSlice";


// convert object to string and store in localStorage
// MIDDLEWARE
const localStorageMiddleware: Middleware = store => next => action => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(store.getState()));
    return result;
};

const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
        return JSON.parse(localStorage.getItem('applicationState') as string);
    }
};

const reducer = {
    app: appReducer,
    devices: devicesReducer,
};

const store = configureStore({
    reducer,
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;
