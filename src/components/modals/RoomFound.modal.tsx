import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RootState, useAllDispatch } from '../../store';
import { ModalWatchToggleRoomFound } from '../../Modal.slice';
import { StyleCompact } from './../../utils/modal';
import { WatchSetStatus, WatchStatus } from '../../Watch.slice';

function RoomFoundModal() {
    const dispatch = useAllDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation();
    const refFriendlyName = useRef<HTMLInputElement>(null);

    const show = useSelector((state: RootState) => state.modal.watch.showRoomFound);
    const roomInfo = useSelector((state: RootState) => state.modal.watch.roomInfo);

    //const [errorCode, setErrorCode] = useState('');
    const friendlyName = localStorage.getItem('friendlyName') || '';

    const onCloseModal = () => {
        //setErrorCode('');
        dispatch(ModalWatchToggleRoomFound({ show: false }));
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('friendlyName', refFriendlyName.current?.value || 'Viewer-007');
        dispatch(ModalWatchToggleRoomFound({ show: false }));
        dispatch(WatchSetStatus(WatchStatus.WATCH_WAITING))
        navigate(`/watch/${roomInfo.passCode}`, { replace: true });
    }

    return (
        <Modal isOpen={show} onRequestClose={onCloseModal} style={StyleCompact} contentLabel="Modal: Room Found">
            <div className="text-shiro bg-kuro-7 border-kuro-8 px-7 py-5">
                <div className='flex flex-row justify-between mb-5'>
                    <p className='text-3xl text-center'>{ t('Watch:RoomFound.JoiningRoom') }</p>
                    <a onClick={onCloseModal} href="#" className='text-white transition-all hover:text-gray-200 text-3xl'><i className="far fa-times-circle"></i></a>
                </div>
                <p className='text-lg text-center mb-3'>{ t('Watch:RoomFound.WeFoundRoom') }</p>
                <p className='text-2xl text-yellow-300 tracking-widest text-center'>{ roomInfo.showTitle }</p>
                <p className='text-center text-sm text-gray-300'>({ (new Date(roomInfo.startTime || new Date())).toLocaleString() })</p>
                <form onSubmit={onSubmit} className='flex flex-row justify-center mt-10 mb-1'>
                    <div className='mr-2'>
                        <input ref={refFriendlyName} type="text" id="text" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" maxLength={16} placeholder={t('Field:MyFriendlyName')} defaultValue={friendlyName} required/>
                    </div>
                    <div className=''>
                        <button type="submit" className="transition-all text-white text-uppper text-center font-medium rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-800"><i className="fa-solid fa-arrow-right-to-bracket mr-2"></i>{ t('Action:JoinRoom') }</button>
                    </div>
                </form>
                <p className='text-center text-sm text-gray-300'>{ t('Watch:RoomFound.WhyFriendlyName') }</p>
            </div>
        </Modal>
    )
}

export default React.memo(RoomFoundModal);