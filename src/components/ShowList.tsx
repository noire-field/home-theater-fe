import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { DurationSecondToText } from '../utils/show';

import { RootState, useAllDispatch } from '../store';
import { MovieShow } from '../Show.slice';
import { ModalShowToggleEdit } from '../Modal.slice';
import { Link } from 'react-router-dom';

function ShowList() {
    const dispatch = useAllDispatch();
    const { t } = useTranslation();
    const shows: MovieShow[] = useSelector((state: RootState) => state.show.list);

    if(process.env.NODE_ENV === 'development')
        console.log(`App >> ManageRoom >> ShowList: Render`);

    const onClickEdit = (showId: number, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(ModalShowToggleEdit({ show: true, id: showId }));
    }

    const renderContent = shows.length > 0 ? shows.map((show: MovieShow) => {
        let statusContent;

        switch(show.status) {
            case 0: statusContent = <span className='text-yellow-400'>{ t('StatusText:Processing') }</span>; break;
            case 1: statusContent = <span className='text-green-400'>{ t('StatusText:Scheduled') }</span>; break;
            case 2: statusContent = <span className='text-pink-400'>{ t('StatusText:Watching') }</span>; break;
            case 3: statusContent = <span className='text-blue-400'>{ t('StatusText:Finished') }</span>; break;
            case 4: statusContent = <span className='text-red-400'>{ t('StatusText:Cancelled') }</span>; break;
            case 5: statusContent = <span className='text-red-400'>{ t('StatusText:Error') }</span>; break;
        }
        
        return (
            <tr key={show.id} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4">{ show.id }</td>
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap tracking-widest">{ show.passCode }</td>
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap text-left">{ show.title }</td>
                <td className="px-6 py-4">{ new Date(show.startTime).toLocaleString() }</td>
                <td className="px-6 py-4">{ DurationSecondToText(show.duration) }</td>
                <td className='px-6 py-4 text-center'>{ show.smartSync > 0 ? <span className='text-green-500'><i className="fa-solid fa-circle-check"></i></span> : '-' }</td>
                <td className="px-6 py-4">{ statusContent }</td>
                <td className="px-6 py-4">
                    <Link to={`/?join=${show.passCode}`} target='_blank' className="font-medium text-pink-500 hover:underline mr-2"><i className="fa-solid fa-link mr-1"></i>{ t('Action:Share') }</Link>
                    <a onClick={onClickEdit.bind(null, show.id)} href="#" className="font-medium text-yellow-500 hover:underline"><i className="fa-solid fa-pen-to-square mr-1"></i>{ t('Action:Edit') }</a>
                </td>
            </tr>
        )
    }) : (<tr className="border-b bg-gray-800 border-gray-700"><td className="px-6 py-4" colSpan={8}>{ t('Manage:ListNoShow') }</td></tr>);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400 text-center">
                    <tr>
                        <th scope="col" className="px-6 py-3">{ t('Field:ID') }</th>
                        <th scope="col" className="px-6 py-3">{ t('Field:PINCode') }</th>
                        <th scope="col" className="px-6 py-3 text-left">{ t('Field:Title') }</th>
                        <th scope="col" className="px-6 py-3">{ t('Field:StartTime') }</th>
                        <th scope="col" className="px-6 py-3">{ t('Field:Duration') }</th>
                        <th scope="col" className="px-6 py-3">{ t('Field:SmartSync') }</th>
                        <th scope="col" className="px-6 py-3">{ t('Field:Status') }</th>
                        <th scope="col" className="px-6 py-3">{ t('Field:Action') }</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    { renderContent }
                </tbody>
            </table>
        </div>
    )
}

export default React.memo(ShowList);