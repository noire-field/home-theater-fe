import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootState, useAllDispatch } from '../../../store';
import { WatchSetVoted } from '../../../Watch.slice';

import AppSocket from '../../../utils/socket';

function VotingBanner() {
    const { t } = useTranslation();
    const dispatch = useAllDispatch();

    const voting = useSelector((state: RootState) => state.watch.voting);

    if(!voting.enable || !voting.active) return null;

    const timeleft = Math.round((voting.endTime - new Date().getTime()) / 1000);

    const onClickVote = (yes: boolean) => {
        dispatch(WatchSetVoted(yes ? 1 : 0));
        AppSocket.Vote(yes); // toPause
    }

    return (
        <div className="px-3 py-2 bg-blue-100 rounded-lg dark:bg-blue-200" role="alert">
            <div className="flex items-center mb-2">
                <svg className="mr-1 w-5 h-5 text-blue-700 dark:text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <p className="text-lg font-medium text-blue-700 dark:text-blue-800 leading-none">{ t( voting.toPause ? 'Watch:Watching.VoteToPause' : 'Watch:Watching.VoteToResume', { name: voting.starterName }) } ({timeleft}s)</p>
            </div>
            <div className='flex justify-end'>
                <button onClick={onClickVote.bind(null, true)} className='btn btn-sm btn-blue mr-1' disabled={voting.voted !== -1}>{ t('Action:Yes') } ({ voting.result.yes })</button>
                <button onClick={onClickVote.bind(null, false)} className='btn btn-sm btn-blue' disabled={voting.voted !== -1}>{ t('Action:No') } ({ voting.result.no })</button>
            </div>
        </div>
    )
}

export default React.memo(VotingBanner);