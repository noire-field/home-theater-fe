import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

import Header from './../components/layouts/Header';

function FinishedWatching() {
    const { t } = useTranslation();

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> FinishedWatching: Render`);

    return (
        <div className='flex flex-col justify-between h-screen p-3 md:p-10 text-shiro simple-fade-in'>
            <div>
                <Header/>
            </div>
            <div className='mb-5 md:mb-0 mt-0 md:mt-5 flex flex-row justify-center'>
                <div className='flex flex-col w-500 h-115 justify-center'>
                    <p className='text-5xl text-center mb-3'>{ t('Watch:Finished.TheEnd') }</p>
                    <p className='text-xl text-center mb-10'>{ t('Watch:Finished.HopeYouLikeIt') }</p>
                    <Link to={'/'} replace={true} className='text-center text-orange-300'><FontAwesomeIcon icon={faHouse}/> { t('Action:ReturnHomepage') }</Link>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default React.memo(FinishedWatching);