import React, { useState } from 'react';
import Modal from 'react-modal';

import { StyleCompact } from './../../utils/modal';

function RoomFoundModal() {
   
    const show = true; //useSelector(state => state.modal.episode.showCreate);
    //const series = useSelector(state => state.modal.episode.series);
    //const season = useSelector(state => state.modal.episode.season);

    //const [errors, setErrors] = useState([]);

    const onCloseModal = () => {
        //setErrors([]);
        //dispatch(ModalEpisodeToggleCreate(false));
    }

    return (
        <Modal isOpen={show} onRequestClose={onCloseModal} style={StyleCompact} contentLabel="Modal: Room Found">
            <div className="text-shiro bg-kuro-7 border-kuro-8 px-7 py-5">
                <div className='flex flex-row justify-between mb-5'>
                    <p className='text-3xl text-center'>Joining Room</p>
                    <a onClick={onCloseModal} href="#" className='text-white transition-all hover:text-gray-200 text-3xl'><i className="far fa-times-circle"></i></a>
                </div>
                <p className='text-lg text-center mb-3'>We found a room that matches your code!</p>
                <p className='text-2xl text-yellow-300 tracking-widest text-center'>Doctor Strange</p>
                <p className='text-center text-sm text-gray-300'>(13:30 Jan 03, 2022)</p>

                <div className='flex flex-row justify-center mt-10 mb-1'>
                    <div className='mr-2'>
                        <input type="email" id="email" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="My friendly name" required/>
                    </div>
                    <div className=''>
                        <button type="button" className="transition-all text-white text-uppper text-center font-medium rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-800">Join Room</button>
                    </div>
                </div>
                <p className='text-center text-sm text-gray-300'>This will help friends in room to recognize you easily.</p>
            </div>
        </Modal>
    )
}

export default React.memo(RoomFoundModal);