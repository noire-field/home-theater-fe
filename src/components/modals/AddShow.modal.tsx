import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState, useAllDispatch } from '../../store';
import { ModalShowToggleAdd } from '../../Modal.slice';

import { StyleLarge } from './../../utils/modal';
import { IsStartTimeValid } from '../../utils/show';
import { AppSetLoading } from '../../App.slice';
import { AppAPI, AxiosError, AxiosResponse } from '../../utils/api';
import { ShowUnshift } from '../../Show.slice';

function AddShowModal() {
    const { t } = useTranslation();
    const dispatch = useAllDispatch();

    const show = useSelector((state: RootState) => state.modal.show.showAdd);
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
        console.log(`App >> ManageRoom >> Modals >> Add: Render (${show})`);

    const [errorCode, setErrorCode] = useState('');

    const onCloseModal = () => {
        setErrorCode('');
        dispatch(ModalShowToggleAdd(false));
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Parse StartTime
        const rawTime = inputs.startTime.current?.value || '';
        var startTime = IsStartTimeValid(rawTime);

        if(!startTime.valid) {
            setErrorCode(`Error:InvalidTimeFormat`);
            return;
        }
        
        setErrorCode('');
        dispatch(AppSetLoading(true));

        AppAPI.post('/shows', {
            title: inputs.title.current?.value,
            passCode: inputs.pinCode.current?.value,
            movieUrl: inputs.movieUrl.current?.value,
            subtitleUrl: inputs.subtitleUrl.current?.value,
            startTime: startTime.time?.getTime().toString(),
            smartSync: inputs.smartSync.current?.checked,
            votingControl: inputs.votingControl.current?.checked
        }).then((res: AxiosResponse) => {
            if(res.status === 201) {
                dispatch(ShowUnshift(res.data));
                dispatch(ModalShowToggleAdd(false));
            }
        }).catch((err: AxiosError) => {
            if(err.response) {
                setErrorCode(err.response.data.langCode || err.response.data.message);
            } else setErrorCode('Error:SomethingWentWrong');
        }).finally(() => {
            dispatch(AppSetLoading(false));
        });
    }

    return (
        <Modal isOpen={show} onRequestClose={onCloseModal} style={StyleLarge} contentLabel="Modal: Add Show">
            <div className="text-shiro bg-kuro-7 border-kuro-8 px-7 py-5">
                <form onSubmit={onSubmit}>
                    <div className='flex flex-row justify-between mb-5'>
                        <p className='text-3xl text-center'>{ t('Action:AddShow') }</p>
                        <a onClick={onCloseModal} href="#" className='text-white transition-all hover:text-gray-200 text-3xl'><i className="far fa-times-circle"></i></a>
                    </div>
                    <div className='grid grid-cols-12 gap-4 mb-5'>
                        <div className='col-span-12 md:col-span-8'>
                            <label htmlFor='show-title' className='custom-label'>{ t('Field:Title') }</label>
                            <input ref={inputs.title} id='show-title' className='custom-input' placeholder='Doctor Strange (2016)' maxLength={250} required/>
                        </div>
                        <div className='col-span-12 md:col-span-4'>
                            <label htmlFor='show-pincode' className='custom-label'>{ t('Field:PINCode') }</label>
                            <input ref={inputs.pinCode} id='show-pincode' className='custom-input' placeholder='00001' minLength={5} maxLength={5} required/>
                        </div>
                        <div className='col-span-12 md:col-span-6'>
                            <label htmlFor='show-movieurl' className='custom-label'>{ t('Field:MovieUrl') }</label>
                            <input ref={inputs.movieUrl} id='show-movieurl' className='custom-input' placeholder='https://awesome.com/movie.mp4' maxLength={250} required/>
                        </div>
                        <div className='col-span-12 md:col-span-6'>
                            <label htmlFor='show-subtitleurl' className='custom-label'>{ t('Field:SubtitleUrl') }</label>
                            <input ref={inputs.subtitleUrl} id='show-subtitleurl' className='custom-input' placeholder='https://awesome.com/movie.en.srt' maxLength={250}/>
                        </div>
                        <div className='col-span-12 md:col-span-6'>
                            <label htmlFor='show-starttime' className='custom-label'>{ t('Field:StartTime') }</label>
                            <input ref={inputs.startTime} id='show-starttime' className='custom-input' placeholder='13:30 2022/12/24' maxLength={16} required/>
                        </div>
                        <div className='col-span-12 md:col-span-6'>
                            <label htmlFor='show-starttime' className='custom-label'>{ t('Field:Addons') }</label>
                            <div className='flex flex-row justify-start mt-2 md:mt-3'>
                                <div className='mr-5'>
                                    <label htmlFor="show-smartsync" className="flex relative items-center cursor-pointer">
                                        <input ref={inputs.smartSync} type="checkbox" id="show-smartsync" className="sr-only" defaultChecked={true}/>
                                        <div className="w-11 h-6 rounded-full border  toggle-bg bg-gray-700 border-gray-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-300">{ t('Field:SmartSync') }</span>
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="show-voting" className="flex relative items-center cursor-pointer">
                                        <input ref={inputs.votingControl} type="checkbox" id="show-voting" className="sr-only"/>
                                        <div className="w-11 h-6 rounded-full border  toggle-bg bg-gray-700 border-gray-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-300">{ t('Field:VotingControl') }</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <p className='mb-2 md:mb-0 self-start md:self-center'>{ errorCode.length > 0 && <span className='text-center text-pink-600'>{ t(`${errorCode}`) }</span> }</p>
                        <button type="submit" className='btn btn-blue self-end'><i className="fa-solid fa-circle-plus mr-2"></i>{ t('Action:Add') }</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default React.memo(AddShowModal);