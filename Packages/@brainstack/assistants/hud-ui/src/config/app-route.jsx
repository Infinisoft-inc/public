import React from 'react';
import App from './../app.jsx';
import { Navigate } from 'react-router-dom';
import Home from './../pages/home/home.js';
import ChatWidgetDragResize from '../pages/ChatWidget/ChatWidgetDragResize.jsx';

const AppRoute = [
  {
    path: '*', 
    element: <App />,
    children: [
    	{ path: '', element: <Navigate to='/home' /> },
    	{ path: 'home', element: <Home /> },
    	{ path: 'chat', element: <ChatWidgetDragResize /> }
		]
  }
];


export default AppRoute;