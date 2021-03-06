import io, { Socket } from "socket.io-client";

import { store } from './../store';
import { IViewer, WatchSetSocketConnected, WatchSetPlayerBuffering, WatchSetViewers, WatchSetStartTime, WatchPrepareToWatch, IPrepareToWatch, IStartWatching, WatchStart, WatchRequireSeek, WatchSetPlayerPlaying, WatchSetPlayerProgress, WatchStatus, IFinishWatch, WatchFinish, WatchSetSubtitleIndex, WatchSetLastSlideAt, WatchSetDuration, WatchSetVoting, WatchSetVoted } from "../Watch.slice";
import { CalculateSeekTime } from "./show";

class AppSocket {
    private established: boolean;
    private client: Socket;
    private passCode: string;

    constructor() {
        this.established = false;
        this.passCode = '';
        
        // @ts-ignore
        this.client = io(process.env.REACT_APP_SOCKET_URL, { autoConnect: false });

        // Handlers
        this.client.on('connect_error', this.OnConnectError);
        this.client.on('connect', this.OnConnect);
        this.client.on('disconnect', this.OnDisconnect);
        
        // Custom Handlers
        this.client.on('UpdateViewers', this.OnUpdateViewers);
        this.client.on('UpdateStartTime', this.OnUpdateStartTime);
        this.client.on('PrepareToWatch', this.OnPrepareToWatch);
        this.client.on('StartWatching', this.OnStartWatching);
        this.client.on('VideoAction', this.OnVideoAction);
        this.client.on('FinishWatching', this.OnFinishWatching);
        this.client.on('UpdateVoting', this.OnUpdateVoting);
    }

    GetClient(): Socket {
        return this.client;
    }

    Connect(): boolean {
        if(this.established) return false;

        this.client.connect();
        this.established = true;

        return true;
    }

    Disconnect(): boolean {
        if(!this.established) return false;

        this.client.disconnect();
        this.established = false;

        return true;
    }

    PauseShow(): void {
        this.client.emit('VideoAction', { passCode: this.passCode, action: 'Pause' });
    }

    ResumeShow(): void {
        this.client.emit('VideoAction', { passCode: this.passCode, action: 'Resume' });
    }

    SlideShow(to: number): void {
        this.client.emit('VideoAction', { passCode: this.passCode, action: 'Slide', to, sendTime: new Date().getTime() });
    }

    RequestVote(toPause: boolean): void {
        this.client.emit('Voting', { passCode: this.passCode, action: 'Request', data: { toPause } });
    }

    Vote(yes: boolean): void {
        this.client.emit('Voting', { passCode: this.passCode, action: 'Vote', data: { yes } });
    }

    // Built-In Handler
    OnConnect() {
        store.dispatch(WatchSetSocketConnected(true));
    }

    OnDisconnect(reason: string) {
        //console.log('Disconnected');
    }

    OnConnectError(error: Error) {
        console.log(error.message);
    }

    // Custom Handler
    OnRoomJoined(passCode: string) {
        this.client.emit('ClientJoinedRoom', { passCode });
        this.passCode = passCode;
    }

    OnUpdateViewers(viewers: IViewer[]) {
        store.dispatch(WatchSetViewers(viewers));
    }

    OnUpdateStartTime(newStartTime: number) {
        store.dispatch(WatchSetStartTime(newStartTime));
    }

    OnPrepareToWatch(res: IPrepareToWatch) {
        store.dispatch(WatchPrepareToWatch(res));
    }

    OnStartWatching(res: IStartWatching) {
        store.dispatch(WatchStart(res));
        store.dispatch(WatchSetDuration(res.duration));
        store.dispatch(WatchSetVoting(res.voting));
        store.dispatch(WatchSetVoted(res.voting.voted)); // WatchSetVoting does not set voted but skip it
        if(res.playing) {
            const targetSeekTime = CalculateSeekTime(res.progress, res.progressAtTime);
            store.dispatch(WatchRequireSeek({ on: true, to: targetSeekTime }))
        } else {
            store.dispatch(WatchSetPlayerPlaying(true));
            store.dispatch(WatchRequireSeek({ on: true, to: res.progress }))
            store.dispatch(WatchSetPlayerProgress(res.progress));
            setTimeout(() => {
                store.dispatch(WatchSetPlayerPlaying(false));
                store.dispatch(WatchSetPlayerBuffering(false));
            }, 100);
        }
    }

    OnVideoAction(res: { action: string, data: any }) {
        switch(res.action) {
            case 'Pause':
                store.dispatch(WatchSetPlayerPlaying(false));
                store.dispatch(WatchRequireSeek({ on: true, to: res.data.progress }));
                
                break;
            case 'Resume':
                store.dispatch(WatchSetPlayerPlaying(true));
                store.dispatch(WatchRequireSeek({ on: true, to: res.data.progress }));
                store.dispatch(WatchSetStartTime(res.data.realStartTime));
                
                break;
            case 'Slide':
                const currentTime = new Date().getTime()
                const correctProgress = res.data.progress + ((currentTime - res.data.sendTime) / 1000);

                store.dispatch(WatchSetLastSlideAt(new Date().getTime()));
                
                // This is a moving backward? if yes, reset the subtitle index (Only other client)
                if(store.getState().watch.player.progress > correctProgress)
                    store.dispatch(WatchSetSubtitleIndex(-1));

                store.dispatch(WatchRequireSeek({ on: true, to: correctProgress }));
                store.dispatch(WatchSetStartTime(res.data.realStartTime));
                
                break;
        }
    }

    OnFinishWatching(res: IFinishWatch) {
        store.dispatch(WatchFinish(res));
    }

    OnUpdateVoting(res: { action: string, data: any }) {
        switch(res.action) {
            case 'Update':
                store.dispatch(WatchSetVoting(res.data));
                break;
            case 'Finish':
                store.dispatch(WatchSetVoting(res.data));
                store.dispatch(WatchSetVoted(-1));
                break;
        }
    }
}

export default new AppSocket();