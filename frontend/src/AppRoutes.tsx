import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/Home.page";
import {ItemListPage} from "./pages/ItemList.page";
import {ItemDetailPage} from "./pages/ItemDetail.page";
import React from "react";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={HomePage}/>
                <Route path="/items" Component={ItemListPage}/>
                <Route path="/items/1" Component={ItemDetailPage}/>
            </Routes>
        </Router>
    );
};
