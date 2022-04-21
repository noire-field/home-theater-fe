import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { createSelector } from '@reduxjs/toolkit';

import { RootState, useAllDispatch } from '../../store';
import { ModalShowToggleEdit } from '../../Modal.slice';

import { StyleLarge } from './../../utils/modal';
import { MovieShow } from '../../Show.slice';
import { UserSetLang } from '../../User.slice';

interface ISelectMovie {
    list: MovieShow[];
    targetId: number | null;
}

const selectMovie = createSelector(
    (state: ISelectMovie) => state.list, 
    (state: ISelectMovie) => state.targetId, 
    (list, targetId) => {
        return targetId ? list.find((show: MovieShow) => show.id === targetId) : null;
    }
);

function EditShowModal() {
    const dispatch = useAllDispatch();
    const { t } = useTranslation();

    const show = useSelector((state: RootState) => state.modal.show.showEdit);
    const showList = useSelector((state: RootState) => state.show.list);
    const targetId = useSelector((state: RootState) => state.modal.show.targetId);
    const movie = selectMovie({ 
        list: showList,
        targetId
    });
   
    const inputs = {
        title: useRef<HTMLInputElement>(null),
        pinCode: useRef<HTMLInputElement>(null),
        movieUrl: useRef<HTMLInputElement>(null),
        subtitleUrl: useRef<HTMLInputElement>(null),
        startTime: useRef<HTMLInputElement>(null),
        smartSync: useRef<HTMLInputElement>(null),
        votingControl: useRef<HTMLInputElement>(null)
    }

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> ManageRoom >> Modals >> Edit: Render (${show})`);

    const [errorCode, setErrorCode] = useState('');

    const onCloseModal = () => {
        //setErrorCode('');
        dispatch(ModalShowToggleEdit({ show: false, id: -1 })); // -1 means no change
    }

    if(!movie) return null;

    const onClickUpdate = () => {
        dispatch(UserSetLang('lt'));
    }

    let startTime = new Date(movie.startTime);
    let simplifiedTime = `${startTime.getHours()}:${startTime.getMinutes()} ${startTime.getFullYear()}-${startTime.getMonth()+1}-${startTime.getDate()}`

    return (
        <Modal isOpen={show} onRequestClose={onCloseModal} style={StyleLarge} contentLabel="Modal: Edit Show">
            <div className="text-shiro bg-kuro-7 border-kuro-8 px-5 py-3 md:px-7 md:py-5">
                <div className='flex flex-row justify-between mb-5'>
                    <p className='text-3xl text-center'>{ t('Action:EditShow') }</p>
                    <a onClick={onCloseModal} href="#" className='text-white transition-all hover:text-gray-200 text-3xl'><i className="far fa-times-circle"></i></a>
                </div>
                <div className='grid grid-cols-12 gap-4 mb-2 md:mb-5'>
                    <div className='col-span-12 md:col-span-8'>
                        <label htmlFor='show-title' className='custom-label'>{ t('Field:Title') }</label>
                        <input ref={inputs.title} id='show-title' className='custom-input' placeholder='Doctor Strange (2016)' maxLength={250} defaultValue={movie.title} required/>
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                        <label htmlFor='show-pincode' className='custom-label'>{ t('Field:PINCode') }</label>
                        <input ref={inputs.pinCode} id='show-pincode' className='custom-input' placeholder='00001' minLength={5} maxLength={5} defaultValue={movie.passCode} required/>
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <label htmlFor='show-movieurl' className='custom-label'>{ t('Field:MovieUrl') }</label>
                        <input ref={inputs.movieUrl} id='show-movieurl' className='custom-input' placeholder='https://awesome.com/movie.mp4' maxLength={250} defaultValue={movie.movieUrl} required/>
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <label htmlFor='show-subtitleurl' className='custom-label'>{ t('Field:SubtitleUrl') }</label>
                        <input ref={inputs.subtitleUrl} id='show-subtitleurl' className='custom-input' placeholder='https://awesome.com/movie.en.srt' maxLength={250} defaultValue={movie.subtitleUrl}/>
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <label htmlFor='show-starttime' className='custom-label'>{ t('Field:StartTime') }</label>
                        <input ref={inputs.startTime} id='show-starttime' className='custom-input' placeholder='13:30 2022/12/24' maxLength={16} defaultValue={simplifiedTime} required/>
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <label htmlFor='show-starttime' className='custom-label'>{ t('Field:Addons') }</label>
                        <div className='flex flex-row justify-start mt-2 md:mt-3'>
                            <div className='mr-5'>
                                <label htmlFor="show-smartsync" className="flex relative items-center cursor-pointer">
                                    <input ref={inputs.smartSync} type="checkbox" id="show-smartsync" className="sr-only" defaultChecked={movie.smartSync >= 1 ? true : false}/>
                                    <div className="w-11 h-6 rounded-full border  toggle-bg bg-gray-700 border-gray-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-300">{ t('Field:SmartSync') }</span>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="show-voting" className="flex relative items-center cursor-pointer">
                                    <input ref={inputs.votingControl} type="checkbox" id="show-voting" className="sr-only" defaultChecked={movie.votingControl >= 1 ? true : false}/>
                                    <div className="w-11 h-6 rounded-full border  toggle-bg bg-gray-700 border-gray-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-300">{ t('Field:VotingControl') }</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-between align-middle'>
                    <p className='text-gray-300 mt-2 mb-2 md:mb-0'><i className="fa-solid fa-circle-info mr-1"></i>{ t('Manage:ShowAlreadyFinished') }</p>
                    <div className='text-right'>
                        <button onClick={onClickUpdate} className='btn btn-yellow mr-2'><i className="fa-solid fa-pen-to-square mr-2"></i>{ t('Action:Update') }</button>
                        <button className='btn btn-red'><i className="fa-solid fa-circle-minus mr-2"></i>{ t('Action:Delete') }</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(EditShowModal);