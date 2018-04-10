import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

//rename component property into Component as otherwise React will see component as normal HTML tag. We need a Capital C
//...rest will include all remaining props and re-include them in <Route />
const ProtectedRoute = ({ component: Component, ...rest }) => {
  !Auth.isAuthenticated() && Flash.setMessage('danger', 'You must be logged in.');
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
