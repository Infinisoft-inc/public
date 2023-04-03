import React from 'react';
import App from './../app.jsx';
import { Navigate } from 'react-router-dom';

import Home from './../pages/home/home.js';
import ChatWidgetWrapper from '../pages/ChatWidget/ChatWidgetWrapper.jsx';

const AppRoute = [
  {
    path: '*', 
    element: <App />,
    children: [
    	{ path: '', element: <Navigate to='/home' /> },
    	{ path: 'home', element: <Home /> },
    	{ path: 'chat', element: <ChatWidgetWrapper /> }
		]
  }
];


export default AppRoute;