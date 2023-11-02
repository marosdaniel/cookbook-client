import React from 'react';

import Login from './Login/';
import Register from './Register';

const SigninPage = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  return <>{isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}</>;
};

export default SigninPage;
