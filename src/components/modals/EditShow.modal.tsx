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
        <Modal isOpen={show} onRequestClose={onCloseModal} style={StyleLarge} contentLabel="Modal: Edit Show">
            <div className="text-shiro bg-kuro-7 border-kuro-8 px-5 py-3 md:px-7 md:py-5">
                <div className='flex flex-row justify-between mb-5'>
                    <p className='text-3xl text-center'>Edit Show</p>
                    <a onClick={onCloseModal} href="#" className='text-white transition-all hover:text-gray-200 text-3xl'><i className="far fa-times-circle"></i></a>
                </div>
                <div className='grid grid-cols-12 gap-4 mb-2 md:mb-5'>
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
                <div className='flex flex-col md:flex-row justify-between align-middle'>
                    <p className='text-gray-300 mt-2 mb-2 md:mb-0'><i className="fa-solid fa-circle-info mr-1"></i>This show is already finished.</p>
                    <div className='text-right'>
                        <button className='btn btn-yellow mr-2'><i className="fa-solid fa-pen-to-square mr-2"></i>Update</button>
                        <button className='btn btn-red'><i className="fa-solid fa-circle-minus mr-2"></i>Delete</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(CreateShowModal);