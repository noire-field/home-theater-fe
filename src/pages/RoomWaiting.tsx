import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState, useAllDispatch } from '../store';
import { AppSetLoading } from '../App.slice';

import Header from '../components/layouts/Header';
import CountdownTimer from '../components/CountdownTimer';
import { AppAPI, AxiosError, AxiosResponse } from '../utils/api';

function RoomWaiting() {
    const dispatch = useAllDispatch();
    const { t } = useTranslation();

    const showTitle = useSelector((state: RootState) => state.watch.show.title);
    const viewers = useSelector((state: RootState) => state.watch.viewers);
    const passCode = useSelector((state: RootState) => state.watch.passCode);

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> WatchingRoom > RoomWaiting: Render`);

    const onClickAddMoreTime = () => {
        dispatch(AppSetLoading(true));

        AppAPI.patch(`/watch/room/${passCode}/add-wait-time`, { 
            minuteAmount: 5
        }).then((res: AxiosResponse) => {
            if(res.status === 200) { }
        }).catch((res: AxiosError) => {

        }).finally(() => {
            dispatch(AppSetLoading(false));
        });
    }

    return (
        <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro'>
            <div>
                <Header/>
            </div>
            <div>
               <p className='text-center uppercase tracking-widest text-2xl'>{ showTitle }</p>
               <p className='text-center tracking-widest text-5xl'><CountdownTimer/></p>
            </div>
            <div className='flex flex-col md:flex-row justify-between align-middle'>
                <div className='mb-3 md:mb-0 text-center md:text-left'>
                    <p className='text-2xl mb-2'>{ t('Field:Viewers') }: { viewers.length }</p>
                    { viewers.length > 0 && <p>
                        { viewers.map((v, i) => <span key={i} className={`${v.level > 0 ? 'bg-pink-600' : 'bg-white text-gray-800'} rounded py-1 px-2 mr-1`}>{ v.friendlyName }</span>) }
                    </p> }
                </div>
                <div className='flex flex-row justify-center pt-0 md:pt-5'>
                    <button className='btn btn-blue h-15 leading-4 md:h-10 mr-2'><i className="fa-solid fa-eye mr-1"></i>{ t('Action:PreviewMovie') }</button>
                    <button onClick={onClickAddMoreTime} className='btn btn-blue h-15 leading-4 md:h-10 mr-2'><i className="fa-solid fa-clock-rotate-left mr-1"></i>{ t('Action:AddWaitTime') }</button>
                    <button className='btn btn-pink h-15 leading-4 md:h-10'><i className="fa-solid fa-circle-play mr-1"></i>{ t('Action:StartNow') }</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(RoomWaiting);