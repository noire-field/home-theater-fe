import React from 'react';

import LangSelector from './../LangSelector';

function LayoutHeader() {
    return (
        <div className='md:flex md:justify-between'>
            <div className='bg-kuro-8'>
                <h1 className="text-3xl mt-10 md:mt-0 text-center uppercase"><i className="fa-solid fa-masks-theater mr-2"></i>Home Theater</h1>
            </div>
            <div className='bg-kuro-8 text-center md:text-left'>
                <LangSelector/>
            </div>
        </div>
    )
}

export default React.memo(LayoutHeader);