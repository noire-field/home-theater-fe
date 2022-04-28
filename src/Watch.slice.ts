import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPrepareToWatch {
    videoUrl: string;
    watchStatus: WatchStatus
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

export interface ISetJoinedState {
    passCode: string;
    showTitle: string;
    realStartTime: string;
}

export interface WatchState {
    passCode: string;
    joinedRoom: boolean;
    socketConnected: boolean;
    status: WatchStatus;
    show: {
        title: string;
        realStartTime: string;
        subtitles: ISubtitleLine[];
    };
    viewers: IViewer[];
    player: {
        allowControl: boolean;
        videoUrl: string;
        isBuffering: boolean;
        isPlaying: boolean;
        progress: number;
        duration: number;
        volume: number;
        muted: boolean;
        isFullScreen: boolean;
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
        subtitles: []
    },
    viewers: [],
    player: {
        allowControl: false,
        videoUrl: '',
        isBuffering: false,
        isPlaying: false,
        progress: 0.0,
        duration: 125.933333,
        volume: 0.0,
        muted: false,
        isFullScreen: false
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
        },
        WatchSetSubtitle(state, action: PayloadAction<ISubtitleLine[]>) {
            state.show.subtitles = action.payload;
        },
        WatchSetViewers(state, action: PayloadAction<IViewer[]>) {
            state.viewers = action.payload;
        },
        WatchSetStartTime(state, action: PayloadAction<number>) {
            state.show.realStartTime = new Date(action.payload).toString();
        },
        WatchSetPlayerBuffering(state, action: PayloadAction<boolean>) { state.player.isBuffering = action.payload },
        WatchSetPlayerPlaying(state, action: PayloadAction<boolean>) { state.player.isPlaying = action.payload },
        WatchSetPlayerProgress(state, action: PayloadAction<number>) { state.player.progress = action.payload },
        WatchSetPlayerVolume(state, action: PayloadAction<number>) { state.player.volume = action.payload },
        WatchSetPlayerMuted(state, action: PayloadAction<boolean>) { state.player.muted = action.payload },
        WatchSetPlayerFullScreen(state, action: PayloadAction<boolean>) { state.player.isFullScreen = action.payload },
        WatchSetPlayerAllowControl(state, action: PayloadAction<boolean>) { state.player.allowControl = action.payload },
        WatchPrepareToWatch(state, action: PayloadAction<IPrepareToWatch>) { 
            state.status = action.payload.watchStatus;
            state.player.videoUrl = action.payload.videoUrl;
        }
    }
});

export const { 
    WatchSetSocketConnected, WatchSetJoined, WatchSetSubtitle, WatchSetViewers, WatchSetStartTime,
    WatchSetPlayerBuffering, WatchSetPlayerPlaying, WatchSetPlayerProgress, WatchSetPlayerVolume, WatchSetPlayerMuted, 
    WatchSetPlayerFullScreen, WatchSetPlayerAllowControl, WatchPrepareToWatch
} = WatchSlice.actions;

// Export
export default WatchSlice.reducer;