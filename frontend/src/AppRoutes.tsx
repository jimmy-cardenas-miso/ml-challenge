import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Header } from './components/layout/Header';
import { HomePage } from './pages/Home.page';
import { ItemDetailPage } from './pages/ItemDetail.page';
import { ItemListPage } from './pages/ItemList.page';

export const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/items" Component={ItemListPage} />
        <Route path="/items/1" Component={ItemDetailPage} />
      </Routes>
    </Router>
  );
};
