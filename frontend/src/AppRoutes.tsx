import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { ItemProvider } from './contexts/Item.Provider';

const HomePage = React.lazy(() => import('./pages/HomePage/Home.page'));
const ItemListPage = React.lazy(() => import('./pages/ItemList/ItemList.page'));
const ItemDetailPage = React.lazy(
  () => import('./pages/ItemDetail/ItemDetail.page'),
);
export const AppRoutes = () => {
  return (
    <ItemProvider>
      <Router>
        <Header />
        <main className="layout">
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<>...</>}>
                  <HomePage />
                </React.Suspense>
              }
            />
            <Route
              path="/items"
              element={
                <React.Suspense fallback={<>...</>}>
                  <ItemListPage />
                </React.Suspense>
              }
            />
            <Route
              path="/items/:id"
              element={
                <React.Suspense fallback={<>...</>}>
                  <ItemDetailPage />
                </React.Suspense>
              }
            />
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
