import React, { useState } from 'react';
import Modal from 'react-modal';

import { StyleLarge } from './../../utils/modal';

function ShowLogModal() {
   
    const show = true; //useSelector(state => state.modal.episode.showCreate);
    //const series = useSelector(state => state.modal.episode.series);
    //const season = useSelector(state => state.modal.episode.season);

    //const [errors, setErrors] = useState([]);

    const onCloseModal = () => {
        //setErrors([]);
        //dispatch(ModalEpisodeToggleCreate(false));
    }

    return (
        <Modal isOpen={show} onRequestClose={onCloseModal} style={StyleLarge} contentLabel="Modal: Show's Log">
            <div className="text-shiro bg-kuro-7 border-kuro-8 px-5 py-3 md:px-7 md:py-5">
                <div className='flex flex-row justify-between mb-5'>
                    <p className='text-3xl text-center'>Show's Log</p>
                    <a onClick={onCloseModal} href="#" className='text-white transition-all hover:text-gray-200 text-3xl'><i className="far fa-times-circle"></i></a>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700 text-gray-400 text-center">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Time</th>
                                <th scope="col" className="px-6 py-3 text-left">Event</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                <td className="px-3 py-2">3</td>
                                <td className="px-3 py-2">13:30 Jan 21, 2022</td>
                                <td className="px-3 py-2 font-medium text-white whitespace-nowrap text-left">Finished watching</td>
                            </tr>
                            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                <td className="px-3 py-2">2</td>
                                <td className="px-3 py-2">13:30 Jan 21, 2022</td>
                                <td className="px-3 py-2 font-medium text-white whitespace-nowrap text-left">Movie processing completed</td>
                            </tr>
                            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                <td className="px-3 py-2">1</td>
                                <td className="px-3 py-2">13:30 Jan 21, 2022</td>
                                <td className="px-3 py-2 font-medium text-white whitespace-nowrap text-left">Show is created</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(ShowLogModal);