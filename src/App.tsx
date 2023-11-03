import React from 'react';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { __DEV__ } from '@apollo/client/utilities/globals';
import Router from './router';

function App() {
  if (__DEV__) {
    loadDevMessages();
    loadErrorMessages();
  }
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
