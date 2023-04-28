import React from "react";

import { createBrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./store";

const ItemDetailPage = React.lazy(() => import("./pages/ItemDetail/ItemDetail.page"));

export const router = createBrowserRouter([
    {
        path: `items/:id`,
        element: (
            <React.Suspense fallback={<>...</>}>
                <Provider store={store}>
                    <ItemDetailPage/>
                </Provider>
            </React.Suspense>
        ),
    },
]);
