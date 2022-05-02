import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShowStatus } from './Show.slice';

export interface IFinishWatch {
    watchStatus: WatchStatus;
    showStatus: ShowStatus;
    finishedAt: number;
}

export interface IRequireSeek {
    on: boolean;
    to: number;
}

export interface IPrepareToWatch {
    videoUrl: string;
    watchStatus: WatchStatus;
}

export interface IStartWatching {
    videoUrl: string;
    watchStatus: WatchStatus;
    playing: boolean;
    progress: number;
    progressAtTime: number;
}

export enum WatchStatus {
    WATCH_WAITING = 0,
    WATCH_INIT = 1,
    WATCH_ONLINE = 2,
    WATCH_FINISHED = 3
}

export interface IViewer {
    friendlyName: string;
    level: number;
}

export interface ISubtitleLine {
    id: string;
    startTime: string;
    endTime: string;
    text: string;
}

export interface ISubtitleParsed {
    id: number;
    startTime: number;
    endTime: number;
    text: string;
}

export interface ISetJoinedState {
    passCode: string;
    showTitle: string;
    realStartTime: string;
    smartSync: number;
}

export interface WatchState {
    passCode: string;
    joinedRoom: boolean;
    socketConnected: boolean;
    status: WatchStatus;
    show: {
        title: string;
        realStartTime: string;
        subtitles: ISubtitleParsed[];
        finishedAt: number;
        smartSync: number;
    };
    viewers: IViewer[];
    player: {
        showControl: boolean;
        allowControl: boolean;
        videoUrl: string;
        isBuffering: boolean;
        isPlaying: boolean;
        progress: number;
        duration: number;
        volume: number;
        muted: boolean;
        isFullScreen: boolean;
        playbackRate: number;
    },
    requireSeek: {
        on: boolean;
        to: number;
    }
}

const initialState: WatchState = {
    passCode: '',
    joinedRoom: false,
    socketConnected: false,
    status: WatchStatus.WATCH_WAITING,
    show: {
        title: '',
        realStartTime: '0',
        subtitles: [],
        finishedAt: 0,
        smartSync: 0
    },
    viewers: [],
    player: {
        showControl: false,
        allowControl: false,
        videoUrl: '',
        isBuffering: false,
        isPlaying: false,
        progress: 0.0,
        duration: 125.933333,
        volume: 0.0,
        muted: false,
        isFullScreen: false,
        playbackRate: 1.00
    },
    requireSeek: {
        on: false,
        to: 0.0
    }
}

export const WatchSlice = createSlice({
    name: 'watch',
    initialState,
    reducers: {
        WatchSetSocketConnected(state, action: PayloadAction<boolean>) {
            state.socketConnected = action.payload;
        },
        WatchSetJoined(state, action: PayloadAction<ISetJoinedState>) {
            state.joinedRoom = true;
            state.passCode = action.payload.passCode;
            state.show.title = action.payload.showTitle;
            state.show.realStartTime = action.payload.realStartTime;
            state.show.smartSync = action.payload.smartSync;
        },
        WatchSetSubtitle(state, action: PayloadAction<ISubtitleParsed[]>) {
            state.show.subtitles = action.payload;
        },
        WatchSetViewers(state, action: PayloadAction<IViewer[]>) {
            state.viewers = action.payload;
        },
        WatchSetStartTime(state, action: PayloadAction<number>) {
            state.show.realStartTime = new Date(action.payload).toString();
        },
        WatchSetPlaybackRate(state, action: PayloadAction<number>) {
            state.player.playbackRate = action.payload;
        },
        WatchSetStatus(state, action: PayloadAction<WatchStatus>) { state.status = action.payload },
        WatchSetPlayerBuffering(state, action: PayloadAction<boolean>) { state.player.isBuffering = action.payload },
        WatchSetPlayerPlaying(state, action: PayloadAction<boolean>) { state.player.isPlaying = action.payload },
        WatchSetPlayerProgress(state, action: PayloadAction<number>) { state.player.progress = action.payload },
        WatchSetPlayerVolume(state, action: PayloadAction<number>) { state.player.volume = action.payload },
        WatchSetPlayerMuted(state, action: PayloadAction<boolean>) { state.player.muted = action.payload },
        WatchSetShowControl(state, action: PayloadAction<boolean>) { state.player.showControl = action.payload },
        WatchSetPlayerFullScreen(state, action: PayloadAction<boolean>) { state.player.isFullScreen = action.payload },
        WatchSetPlayerAllowControl(state, action: PayloadAction<boolean>) { state.player.allowControl = action.payload },
        WatchPrepareToWatch(state, action: PayloadAction<IPrepareToWatch>) { 
            state.status = action.payload.watchStatus;
            state.player.videoUrl = action.payload.videoUrl;
        },
        WatchStart(state, action: PayloadAction<IStartWatching>) {
            state.status = action.payload.watchStatus;
            if(state.player.videoUrl !== action.payload.videoUrl) state.player.videoUrl = action.payload.videoUrl;

            state.player.progress = 0.0;
            state.player.isPlaying = action.payload.playing;
        },
        WatchRequireSeek(state, action: PayloadAction<IRequireSeek>) {
            state.requireSeek = action.payload;
        },
        WatchFinish(state, action: PayloadAction<IFinishWatch>) {
            state.passCode = '';
            state.joinedRoom = false;
            state.status = action.payload.watchStatus;
            state.show.finishedAt = action.payload.finishedAt;
            state.viewers = [];
            state.player.volume = 0.0;
            state.show.subtitles = [];
        }
    }
});

export const { 
    WatchSetSocketConnected, WatchSetJoined, WatchSetSubtitle, WatchSetViewers, WatchSetStartTime, WatchSetStatus, WatchSetPlaybackRate,
    WatchSetPlayerBuffering, WatchSetPlayerPlaying, WatchSetPlayerProgress, WatchSetPlayerVolume, WatchSetPlayerMuted, WatchSetShowControl,
    WatchSetPlayerFullScreen, WatchSetPlayerAllowControl, WatchPrepareToWatch, WatchStart, WatchRequireSeek, WatchFinish
} = WatchSlice.actions;

// Export
export default WatchSlice.reducer;