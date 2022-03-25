import React, { useState } from 'react';
import ShowLogModal from '../components/modals/ShowLog.modal';

function Homepage() {
    return (
        <div className='flex flex-col justify-start h-screen p-3 md:p-10 text-shiro'>
            <div className='mb-10'>
                <div className='md:flex md:justify-between'>
                    <div className='bg-kuro-8'>
                        <h1 className="text-3xl mt-10 md:mt-0 text-center uppercase"><i className="fa-solid fa-masks-theater mr-2"></i>Home Theater</h1>
                    </div>
                    <div className='bg-kuro-8 text-center md:text-left'>
                        <button data-dropdown-toggle="dropdown-language" className="transition text-white bg-kuro-7 hover:bg-kuro-6 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" type="button"><img src='https://www.worldometers.info/img/flags/small/tn_us-flag.gif' className='w-5 inline mr-2'/>English <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                        <div id='dropdown-language' className={`hidden z-10 text-base text-left list-none bg-kuro-7 rounded divide-y divide-gray-100 shadow`}>
                            <ul className="py-1 mt-1">
                                <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_us-flag.gif' className='w-5 inline mr-2'/>English</a></li>
                                <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_lh-flag.gif' className='w-5 inline mr-2'/>Lietuvių</a></li>
                                <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_vm-flag.gif' className='w-5 inline mr-2'/>Tiếng Việt</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='flex flex-row justify-between align-middle mb-3'>
                    <h1 className='text-2xl'>List of shows</h1>
                    <button type="button" className="btn btn-green"><i className="fa-solid fa-circle-plus mr-2"></i>Create</button>
                </div>
                <div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs uppercase bg-gray-700 text-gray-400 text-center">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">PIN</th>
                                    <th scope="col" className="px-6 py-3 text-left">Title</th>
                                    <th scope="col" className="px-6 py-3">Start Time</th>
                                    <th scope="col" className="px-6 py-3">Duration</th>
                                    <th scope="col" className="px-6 py-3">Smart Sync</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                    <td className="px-6 py-4">3</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">19402</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Doctor Strange (2016)</td>
                                    <td className="px-6 py-4">13:30 Jan 21, 2022</td>
                                    <td className="px-6 py-4">02:15:24</td>
                                    <td className='px-6 py-4 text-center'><span className='text-green-500'>ON</span></td>
                                    <td className="px-6 py-4"><span className='text-yellow-400'>Processing</span></td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                    <td className="px-6 py-4">2</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">44202</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Spider Man 2 (2004)</td>
                                    <td className="px-6 py-4">13:30 Jan 21, 2022</td>
                                    <td className="px-6 py-4">02:15:24</td>
                                    <td className='px-6 py-4 text-center'><span className=''>OFF</span></td>
                                    <td className="px-6 py-4"><span className='text-green-400'>Scheduled</span></td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">19402</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Doctor Strange (2016)</td>
                                    <td className="px-6 py-4">13:30 Jan 21, 2022</td>
                                    <td className="px-6 py-4">02:15:24</td>
                                    <td className='px-6 py-4 text-center'><span className=''>OFF</span></td>
                                    <td className="px-6 py-4"><span className='text-blue-400'>Finished</span></td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">19402</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Doctor Strange (2016)</td>
                                    <td className="px-6 py-4">07:30 Jan 21, 2022</td>
                                    <td className="px-6 py-4">02:15:24</td>
                                    <td className='px-6 py-4 text-center'><span className='text-green-500'>ON</span></td>
                                    <td className="px-6 py-4"><span className='text-pink-400'>Watching</span></td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">19402</td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">Doctor Strange (2016)</td>
                                    <td className="px-6 py-4">13:30 Jan 21, 2022</td>
                                    <td className="px-6 py-4">02:15:24</td>
                                    <td className='px-6 py-4 text-center'><span className='text-green-500'>ON</span></td>
                                    <td className="px-6 py-4"><span className='text-red-400'>Error</span></td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ShowLogModal/>
        </div>
    )
}

export default Homepage;