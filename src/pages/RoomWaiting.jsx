import React, { useState } from 'react';

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
            <div>
               <p className='text-center uppercase tracking-widest text-2xl'>Doctor Strange</p>
               <p className='text-center tracking-widest text-5xl'>03:11:20</p>
            </div>
            <div className='flex flex-col md:flex-row justify-between align-middle'>
                <div className='mb-3 md:mb-0 text-center md:text-left '>
                    <p className='text-2xl mb-2'>Viewers: 2</p>
                    <p>
                        <span className='bg-pink-600 rounded py-1 px-2 mr-1'>Justas</span>
                        <span className='bg-white text-gray-800 rounded py-1 px-2 mr-1'>Noirefield</span>
                    </p>
                </div>
                <div className='flex flex-row justify-center pt-0 md:pt-5'>
                    <button className='btn btn-blue h-15 leading-4 md:h-10 mr-2'><i class="fa-solid fa-eye mr-1"></i>Movie Preview</button>
                    <button className='btn btn-blue h-15 leading-4 md:h-10 mr-2'><i class="fa-solid fa-clock-rotate-left mr-1"></i>More 5 Minutes</button>
                    <button className='btn btn-pink h-15 leading-4 md:h-10'><i class="fa-solid fa-circle-play mr-1"></i>Start Now</button>
                </div>
            </div>
        </div>
    )
}

export default Homepage;