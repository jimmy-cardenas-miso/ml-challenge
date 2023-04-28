import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

const ItemListPage = React.lazy(() => import("./pages/ItemList/ItemList.page"));

export default function Root(props) {
    return <BrowserRouter>
        <React.Suspense fallback={<>...</>}>
            <Provider store={store}>
                <ItemListPage/>
            </Provider>
        </React.Suspense>
    </BrowserRouter>
}
