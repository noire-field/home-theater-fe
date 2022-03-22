import React, { useState } from 'react';

import RoomFoundModal from '../components/modals/RoomFound.modal';

function Homepage() {
    return (
        <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro'>
            <div>
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
            <div className='mb-5 md:mb-0 mt-0 md:mt-5 flex flex-row justify-center'>
                <div className='flex flex-col w-500 h-115 justify-between'>
                    <div>
                        <div className='flex flex-row justify-center mb-1'>
                            <div className='mr-2'>
                                <div class="relative">
                                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-shiro" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm3 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm2-6c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z"/></svg>
                                    </div>
                                    <input type="text" class="border border-kuro-5 rounded-lg block w-200 pl-10 p-2.5 bg-kuro-7 placeholder-kuro-4 text-shiro tracking-widest" placeholder="PIN CODE"/>
                                </div>
                            </div>
                            <div>
                                <button type="button" class="transition-all text-white text-uppper text-center font-medium rounded-md px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-800"><i className="fa-solid fa-magnifying-glass mr-2"></i>Find Room</button>
                            </div>
                        </div>
                        <p className='text-center text-pink-600'>Something went wrong</p>
                    </div>
                    <div className='text-center'>
                        <a href='#' className='transition-all text-shiro hover:text-gray-300'><i class="fa-solid fa-gauge mr-1"></i>Manage Room</a>
                    </div>
                </div>
            </div>
            <div>
                <RoomFoundModal/>
            </div>
        </div>
    )
}

export default Homepage;