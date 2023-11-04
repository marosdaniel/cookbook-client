import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { __DEV__ } from '@apollo/client/utilities/globals';

import Router from './router';
import { useAuthState } from './store/Auth';

function App() {
  const { isAuthenticated } = useAuthState();
  console.log('isAuthenticated', isAuthenticated);
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
