import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import LangSelector from './../LangSelector';

function LayoutHeader() {
    const { t } = useTranslation();

    return (
        <div className='md:flex md:justify-between'>
            <div className='bg-kuro-8'>
                <Link to={'/'}><h1 className="text-3xl mt-10 md:mt-0 text-center uppercase hover:cursor-pointer"><i className="fa-solid fa-masks-theater mr-2"></i>{ t('Common:AppName') }</h1></Link>
            </div>
            <div className='bg-kuro-8 text-center md:text-left'>
                <LangSelector/>
            </div>
        </div>
    )
}

export default React.memo(LayoutHeader);