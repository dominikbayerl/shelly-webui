import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";

import store from "./store";
import App from "./App";

(async () => {
    if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('./mocks/browser');
        await worker.start();
    } else {
        await require('./serviceworker');
    }

    const root = createRoot((document.getElementById('root') as Element));
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    );
})();
