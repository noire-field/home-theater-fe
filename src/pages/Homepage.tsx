import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAllDispatch } from '../store';
import { AppSetLoading } from '../App.slice';

import Header from './../components/layouts/Header';
import RoomFoundModal from '../components/modals/RoomFound.modal';

import { AppAPI, AxiosError, AxiosResponse } from '../utils/api';
import { ModalWatchToggleRoomFound } from '../Modal.slice';

function Homepage() {
    const dispatch = useAllDispatch();
    const { t } = useTranslation();

    const [errorCode, setErrorCode] = useState('');
    const refPassCode = useRef<HTMLInputElement>(null);

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> Homepage: Render${errorCode.length > 0 ? ` (Error: ${errorCode})` : ''}`);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch(AppSetLoading(true));

        AppAPI.get(`/watch/find-room/${refPassCode.current?.value || ''}`).then((res: AxiosResponse) => {
            if(res.status === 200) {// OK
                setErrorCode('');
                dispatch(ModalWatchToggleRoomFound({ show: true, showTitle: res.data.showTitle, passCode: refPassCode.current?.value, startTime: res.data.realStartTime }));
            }
        }).catch((err: AxiosError) => {
            if(err.response) {
                setErrorCode(err.response.data.langCode || err.response.data.message);
            } else setErrorCode('Error:SomethingWentWrong');
        }).finally(() => {
            dispatch(AppSetLoading(false));
        })
    }

    return (
        <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro simple-fade-in'>
            <div>
                <Header/>
            </div>
            <div className='mb-5 md:mb-0 mt-0 md:mt-5 flex flex-row justify-center'>
                <div className='flex flex-col w-500 h-115 justify-between'>
                    <form onSubmit={onSubmit}>
                        <div className='flex flex-row justify-center mb-1'>
                            <div className='mr-2'>
                                <div className="relative">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-shiro" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm3 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm2-6c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z"/></svg>
                                    </div>
                                    <input ref={refPassCode} type="text" className="border border-kuro-5 rounded-lg block w-200 pl-10 p-2.5 bg-kuro-7 placeholder-kuro-4 text-shiro tracking-widest" placeholder={t('Field:PINCode')} required/>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-blue mt-1"><i className="fa-solid fa-magnifying-glass mr-2"></i>{ t('Action:FindRoom') }</button>
                            </div>
                        </div>
                        { errorCode.length > 0 && <p className='text-center text-pink-600'>{ t(errorCode) }</p> }
                    </form>
                    <div className='text-center'>
                        <Link to={`/manage-room`} className='transition-all text-shiro hover:text-gray-300'><i className="fa-solid fa-gauge mr-1"></i>{ t('Action:ManageRoom') }</Link>
                    </div>
                </div>
            </div>
            <div>
                <RoomFoundModal/>
            </div>
        </div>
    )
}

export default React.memo(Homepage);