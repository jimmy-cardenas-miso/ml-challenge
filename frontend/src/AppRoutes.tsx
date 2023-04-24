import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { ItemProvider } from './contexts/Item.Provider';
import { HomePage } from './pages/HomePage/Home.page';
import { ItemDetailPage } from './pages/ItemDetail/ItemDetail.page';
import { ItemListPage } from './pages/ItemList/ItemList.page';

export const AppRoutes = () => {
  return (
    <ItemProvider>
      <Router>
        <Header />
        <main className="layout">
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/items" Component={ItemListPage} />
            <Route path="/items/:id" Component={ItemDetailPage} />
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Routes>
        </main>
      </Router>
    </ItemProvider>
  );
};
