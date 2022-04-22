import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RootState, useAllDispatch } from './../store';
import { ShowSetFetched, ShowSetList } from '../Show.slice';
import { ModalShowToggleAdd } from '../Modal.slice';
import { AppSetLoading } from '../App.slice';

import Header from '../components/layouts/Header';
import ShowList from '../components/ShowList';
import AddShowModal from '../components/modals/AddShow.modal';
import EditShowModal from '../components/modals/EditShow.modal';

import { AppAPI, AxiosError, AxiosResponse } from '../utils/api';

function ManageRoom() {
    const dispatch = useAllDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const fetched = useSelector((state: RootState) => state.show.fetched);
    const [errorCode, setErrorCode] = useState('');

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> ManageRoom: Render (Login: ${loggedIn} / Is Admin: ${isAdmin} / Fetched: ${fetched})`);

    useEffect(() => {
        if(!loggedIn) return navigate('/admin-login?url=/manage-room');
        if(!isAdmin) return navigate('/');
    });

    useEffect(() => {
        if(!loggedIn || !isAdmin) return;

        // Logged as Admin? Not Fetched? Fetch data now!
        if(!fetched) {
            dispatch(AppSetLoading(true));
            AppAPI.get('/shows').then((res: AxiosResponse) => {
                if(res.status === 200) {
                    dispatch(ShowSetList(res.data));
                    dispatch(ShowSetFetched(true));
                }
            }).catch((err: AxiosError) => {
                if(err.response) {
                    setErrorCode(err.response.data.langCode || err.response.data.message);
                } else setErrorCode('Error:SomethingWentWrong');
            }).finally(() => {
                dispatch(AppSetLoading(false));
            });
        }
    }, [fetched])

    if(!loggedIn || !isAdmin || !fetched)
        return null;

    const onClickAdd = () => {
        dispatch(ModalShowToggleAdd(true));
    }

    const onClickRefresh = () => {
        dispatch(ShowSetFetched(false));
    }

    return (
        <div className='flex flex-col justify-start h-screen p-3 md:p-10 text-shiro simple-fade-in'>
            <div className='mb-10'>
                <Header/>
            </div>
            <div className=''>
                { errorCode.length > 0 && <p className='text-left text-pink-600 mb-2'>{ t(`${errorCode}`) }</p> }
                <div className='flex flex-row justify-between align-middle mb-3'>
                    <h1 className='text-2xl'>{ t('Manage:ListOfShows') }</h1>
                    <div>
                        <button onClick={onClickRefresh} type="button" className="btn btn-blue mr-2"><i className="fa-solid fa-arrow-rotate-right mr-2"></i>{ t('Action:Refresh') }</button>
                        <button onClick={onClickAdd} type="button" className="btn btn-green"><i className="fa-solid fa-circle-plus mr-2"></i>{ t('Action:AddShow') }</button>
                    </div>
                </div>
                <div>
                    <ShowList/>
                </div>
            </div>
            <AddShowModal/>
            <EditShowModal/>
        </div>
    )
}

export default React.memo(ManageRoom);