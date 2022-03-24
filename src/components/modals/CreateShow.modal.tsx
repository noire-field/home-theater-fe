import React, { useState } from 'react';
import Modal from 'react-modal';

import { StyleLarge } from './../../utils/modal';

function CreateShowModal() {
   
    const show = true; //useSelector(state => state.modal.episode.showCreate);
    //const series = useSelector(state => state.modal.episode.series);
    //const season = useSelector(state => state.modal.episode.season);

    //const [errors, setErrors] = useState([]);

    const onCloseModal = () => {
        //setErrors([]);
        //dispatch(ModalEpisodeToggleCreate(false));
    }

    return (
        <Modal isOpen={show} onRequestClose={onCloseModal} style={StyleLarge} contentLabel="Modal: Create Show">
            <div className="text-shiro bg-kuro-7 border-kuro-8 px-7 py-5">
                <div className='flex flex-row justify-between mb-5'>
                    <p className='text-3xl text-center'>Create Show</p>
                    <a onClick={onCloseModal} href="#" className='text-white transition-all hover:text-gray-200 text-3xl'><i className="far fa-times-circle"></i></a>
                </div>
                <div className='grid grid-cols-12 gap-4 mb-5'>
                    <div className='col-span-12 md:col-span-8'>
                        <label htmlFor='show-title' className='custom-label'>Title</label>
                        <input id='show-title' className='custom-input' placeholder='Doctor Strange (2016)'/>
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                        <label htmlFor='show-pincode' className='custom-label'>PIN Code</label>
                        <input id='show-pincode' className='custom-input' placeholder='00001'/>
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <label htmlFor='show-movieurl' className='custom-label'>Movie Url</label>
                        <input id='show-movieurl' className='custom-input' placeholder='https://awesome.com/movie.mp4'/>
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <label htmlFor='show-subtitleurl' className='custom-label'>Subtitle Url</label>
                        <input id='show-subtitleurl' className='custom-input' placeholder='https://awesome.com/movie.en.srt'/>
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <label htmlFor='show-starttime' className='custom-label'>Start Time</label>
                        <input id='show-starttime' className='custom-input' placeholder='13:30 2022/12/24'/>
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <label htmlFor='show-starttime' className='custom-label'>Addons</label>
                        <div className='flex flex-row justify-start mt-2 md:mt-3'>
                            <div className='mr-5'>
                                <label htmlFor="show-smartsync" className="flex relative items-center cursor-pointer">
                                    <input type="checkbox" id="show-smartsync" className="sr-only" defaultChecked={true}/>
                                    <div className="w-11 h-6 rounded-full border  toggle-bg bg-gray-700 border-gray-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-300">Smart Sync</span>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="show-voting" className="flex relative items-center cursor-pointer">
                                    <input type="checkbox" id="show-voting" className="sr-only"/>
                                    <div className="w-11 h-6 rounded-full border  toggle-bg bg-gray-700 border-gray-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-300">Control Voting</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button className='btn btn-blue'><i className="fa-solid fa-circle-plus mr-2"></i>Create</button>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(CreateShowModal);