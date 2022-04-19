import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Route, Routes } from 'react-router-dom';
import { AppAPI, AxiosError, AxiosResponse } from './utils/api';

import { RootState, useAllDispatch } from './store';
import { AppSetLoading, AppSetStatus } from './App.slice';

import Homepage from './pages/Homepage';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
	const dispatch = useAllDispatch();

	const status = useSelector((state: RootState) => state.app.status);
	const loading = useSelector((state: RootState) => state.app.loading);
	
	if(process.env.NODE_ENV === 'development')
		console.log(`[App] Render (Status: ${status} / Loading: ${loading}`);

	useEffect(() => {
		switch(status) {
			case 0: // Nothing
				dispatch(AppSetLoading(true));

				// Check for logged in user
				AppAPI.post('/auth/verify', {}).then((res: AxiosResponse) => {
					if(res.status === 200) {
						// Write Later
					}
				}).catch((err: AxiosError) => {
					// Write Later
				}).finally(() => {
					dispatch(AppSetLoading(false));
					dispatch(AppSetStatus(1));
				});

				break;
		}
	}, [status, dispatch]);

  	return (
		<React.Fragment>
            { status >= 1 && 
				<Routes>
					<Route path="/" element={<Homepage />}/>
				</Routes> 
			}
            <CSSTransition in={loading} timeout={250} classNames="anim-fading" unmountOnExit>
                <LoadingOverlay/>
            </CSSTransition>
        </React.Fragment>
  	);
}

export default React.memo(App);
