import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppAPI, AxiosError, AxiosResponse } from './utils/api';

import { RootState, useAllDispatch } from './store';
import { AppSetLoading, AppSetStatus } from './App.slice';
import { UserSetLang, UserSetLogin } from './User.slice';

import LoadingOverlay from './components/LoadingOverlay';
import Homepage from './pages/Homepage';
import ManageRoom from './pages/ManageRoom';
import AdminLogin from './pages/AdminLogin';

function App() {
	const dispatch = useAllDispatch();
	const { i18n } = useTranslation();

	const status = useSelector((state: RootState) => state.app.status);
	const loading = useSelector((state: RootState) => state.app.loading);
	
		if(process.env.NODE_ENV === 'development')
			console.log(`App: Render (Status: ${status} / Loading: ${loading}`);

	useEffect(() => {
		switch(status) {
			case 0: // Nothing
				dispatch(AppSetLoading(true));

				// Check for logged in user
				AppAPI.post('/auth/verify', {}).then((res: AxiosResponse) => {
					if(res.status === 200) {
						dispatch(UserSetLogin({ loggedIn: true, isAdmin: res.data.isAdmin }));
					}
				}).catch((err: AxiosError) => {
					// Nothing to write, just skip.
				}).finally(() => {
					dispatch(AppSetLoading(false));
					dispatch(AppSetStatus(1));
				});

				// Check user's lang
                var userLang = localStorage.getItem('lang');
                
                i18n.changeLanguage(userLang || 'en');
                dispatch(UserSetLang(userLang || 'en'));

                if(!userLang) localStorage.setItem('lang', 'en');

				break;
		}
	}, [status, dispatch]);

  	return (
		<React.Fragment>
            { status >= 1 && 
				<Routes>
					<Route path="/" element={<Homepage />}/>
					<Route path="/manage-room" element={<ManageRoom />}/>
					<Route path="/admin-login" element={<AdminLogin />}/>
				</Routes> 
			}
            <CSSTransition in={loading} timeout={250} classNames="anim-fading" unmountOnExit>
                <LoadingOverlay/>
            </CSSTransition>
        </React.Fragment>
  	);
}

export default React.memo(App);
