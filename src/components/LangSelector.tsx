import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAllDispatch } from '../store';
import { UserSetLang } from '../User.slice';

function LangSelector() {
    const dispatch = useAllDispatch();
    const { t, i18n } = useTranslation();

    const onClickLang = () => {
        var targetLang = i18n.language == 'en' ? 'lt' : 'en';

        i18n.changeLanguage(targetLang);
        dispatch(UserSetLang(targetLang));
        localStorage.setItem('lang', targetLang);
    }

    var renderContent: JSX.Element | string | undefined;

    switch(i18n.language) {
        case 'en': renderContent = <React.Fragment><img src='https://www.worldometers.info/img/flags/small/tn_us-flag.gif' className='w-5 inline mr-2'/>{ t('Language:English') }</React.Fragment> ; break;
        case 'lt': renderContent =  <React.Fragment><img src='https://www.worldometers.info/img/flags/small/tn_lh-flag.gif' className='w-5 inline mr-2'/>{ t('Language:Lithuanian') }</React.Fragment>; break;
    }

    return (
        <button onClick={onClickLang} data-dropdown-toggle="dropdown-language" className="transition text-white bg-kuro-7 hover:bg-kuro-6 active:bg-kuro-7 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" type="button">
            { renderContent }
        </button>
    )

    /*
    return (
        <React.Fragment>
            <button data-dropdown-toggle="dropdown-language" className="transition text-white bg-kuro-7 hover:bg-kuro-6 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" type="button"><img src='https://www.worldometers.info/img/flags/small/tn_us-flag.gif' className='w-5 inline mr-2'/>English <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
            <div id='dropdown-language' className={`hidden z-10 text-base text-left list-none bg-kuro-7 rounded divide-y divide-gray-100 shadow`}>
                <ul className="py-1 mt-1">
                    <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_us-flag.gif' className='w-5 inline mr-2'/>{ t('Language:English') }</a></li>
                    <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_lh-flag.gif' className='w-5 inline mr-2'/>{ t('Language:Lithuanian') }</a></li>
                    <li><a href="#" className="block py-2 px-4 text-sm hover:bg-kuro-6"><img src='https://www.worldometers.info/img/flags/small/tn_vm-flag.gif' className='w-5 inline mr-2'/>{ t('Language:Vietnamese') }</a></li>
                </ul>
            </div>
        </React.Fragment>
    )
    */ 
}

export default React.memo(LangSelector);