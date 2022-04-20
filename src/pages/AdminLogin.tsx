import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RootState, useAllDispatch } from './../store';
import { AppSetLoading } from '../App.slice';
import { UserSetLogin } from '../User.slice';

import Header from '../components/layouts/Header';
import { AppAPI, AxiosResponse, AxiosError } from './../utils/api';

function AdminLogin() {
    const { t } = useTranslation();
    const dispatch = useAllDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const refPassword = useRef<HTMLInputElement>(null);
    const [errorCode, setErrorCode] = useState('');
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> AdminLogin: Render (Login: ${loggedIn} / Error: ${errorCode || 'None'})`);

    useEffect(() => {
        if(loggedIn) {
            navigate('/', { replace: true });
            return;
        }
    }, []);

    const onClickLogin = () => {
        const password = refPassword.current?.value || '';
        if(password.length <= 0) {
            refPassword.current?.focus();
            return;
        }

        dispatch(AppSetLoading(true));

        AppAPI.post('/auth/login', { password }).then((res: AxiosResponse) => {
            if(res.status === 200) {// OK
                dispatch(UserSetLogin({ loggedIn: true, isAdmin: res.data.isAdmin }));
                navigate(searchParams.get('url') || '/');
            }
        }).catch((err: AxiosError) => {
            if(err.response) {
                setErrorCode(err.response.data.langCode || err.response.data.message);
            } else setErrorCode('Error:SomethingWentWrong');
        }).finally(() => {
            dispatch(AppSetLoading(false));
        })
    }

    if(loggedIn) return null;

    return (
        <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro simple-fade-in'>
            <div>
                <Header/>
            </div>
            <div className='mb-10 md:mb-0 mt-0 flex flex-row justify-center'>
                <div className='flex flex-col w-500 h-115 justify-between'>
                    <div>
                        <p className='text-center text-2xl mb-5'>{ t('Manage:Authentication') }</p>
                        <div className='flex flex-row justify-center mb-1'>
                            <div className='mr-2'>
                                <div className="relative">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-shiro" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm3 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm2-6c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z"/></svg>
                                    </div>
                                    <input ref={refPassword} type="password" className="border border-kuro-5 rounded-lg block w-200 pl-10 p-2 bg-kuro-7 placeholder-kuro-4 text-shiro" placeholder={t('Field:AdminPassword')}/>
                                </div>
                            </div>
                            <div>
                                <button onClick={onClickLogin} type="button" className="btn btn-blue"><i className="fa-solid fa-arrow-right-to-bracket mr-2"></i>{ t('Action:Login') }</button>
                            </div>
                        </div>
                        { errorCode.length > 0 && <p className='text-center text-pink-600'>{ t(`${errorCode}`) }</p> }
                    </div>
                </div>
            </div>
            <div>
               
            </div>
        </div>
    )
}

export default React.memo(AdminLogin);