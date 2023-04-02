import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes, useLocation } from "react-router-dom";
import AppRoute from './config/app-route.jsx';

// bootstrap
import 'bootstrap';

// css
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import './scss/styles.scss';


const container = document.getElementById('root');
const root = createRoot(container);
function App() {
	let element = useRoutes(AppRoute);
	let location = useLocation();
	
	// on every route change
	React.useEffect(() => {
		var elm = document.querySelector('.app');
		if (elm) {
			elm.classList.remove('app-sidebar-mobile-toggled');
		}
	}, [location]);
	
	return element;
}

root.render(
  <BrowserRouter>
  	<App />
  </BrowserRouter>
);
