import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import 'flowbite';
import './assets/scss/index.scss';

import App from './App';

Modal.setAppElement('#root');

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);