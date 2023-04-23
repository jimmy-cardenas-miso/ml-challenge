import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/Home.page';
import { ItemDetailPage } from './pages/ItemDetail.page';
import { ItemListPage } from './pages/ItemList.page';
import { Header } from './components/Header';

export const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/items" Component={ItemListPage} />
        <Route path="/items/1" Component={ItemDetailPage} />
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};
