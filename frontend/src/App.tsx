import './App.css';

import { Provider } from 'react-redux';

import { AppRoutes } from './AppRoutes';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
