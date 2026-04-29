import React from 'react';
import AppRouter from './router/index';
import Toast from './components/ui/Toast';

const App: React.FC = () => {
  return (
    <>
      <AppRouter />
      <Toast />
    </>
  );
};

export default App;
