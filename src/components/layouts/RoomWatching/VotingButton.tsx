import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store';

import AppSocket from '../../../utils/socket';

function VotingButton() {
    const { t } = useTranslation();

    const enabled = useSelector((state: RootState) => state.watch.voting.enable);
    const active = useSelector((state: RootState) => state.watch.voting.active);
    const isPlaying = useSelector((state: RootState) => state.watch.player.isPlaying);

    if(!enabled || active) return null;

    const onClickStartVote = () => {
        if(window.confirm(t('Watch:Watching.StartVote')) !== true)
            return;

        AppSocket.RequestVote(isPlaying); // toPause
    }

    return (
        <button onClick={onClickStartVote} className='btn btn-sm btn-blue mr-3'>{ t(isPlaying ? 'Action:VoteToPause' : 'Action:VoteToResume') }</button>
    )
}

export default React.memo(VotingButton);