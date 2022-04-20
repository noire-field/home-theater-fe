import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nLangDetector from "i18next-browser-languagedetector";

import 'flowbite';
import './assets/scss/index.scss';

import App from './App';
import { store } from './store';

import LangEN from './translations/english';
import LangLT from './translations/lithuanian';

i18n.use(i18nLangDetector).use(initReactI18next).init({
    resources: { 
		en: LangEN,
		lt: LangLT
	},
	lng: "en",
    fallbackLng: "en",
    interpolation: {
    	escapeValue: false
    }
});

Modal.setAppElement('#root');

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);