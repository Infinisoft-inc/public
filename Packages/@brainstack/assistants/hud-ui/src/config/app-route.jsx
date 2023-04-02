import React from 'react';
import App from './../app.jsx';
import { Navigate } from 'react-router-dom';

import Home from './../pages/home/home.js';

const AppRoute = [
  {
    path: '*', 
    element: <App />,
    children: [
    	{ path: '', element: <Navigate to='/home' /> },
    	{ path: 'home', element: <Home /> }
		]
  }
];


export default AppRoute;