import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
    show: {
        showAdd: boolean;
        showEdit: boolean;
        targetId: number | null;
    },
    watch: {
        showRoomFound: boolean;
        roomInfo: {
            passCode: string;
            showTitle: string;
            startTime: Date | null;
        }
    }
}

const initialState: ModalState = {
    show: {
        showAdd: false,
        showEdit: false,
        targetId: null
    },
    watch: {
        showRoomFound: false,
        roomInfo: {
            passCode: '',
            showTitle: '',
            startTime: null
        }
    }
}

export const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        ModalShowToggleAdd(state, action: PayloadAction<boolean>) {
            state.show.showAdd = action.payload
        },
        ModalShowToggleEdit(state, action: PayloadAction<ModalShowToggleEditState>) {
            state.show.showEdit = action.payload.show;
            if(action.payload.id != -1) state.show.targetId = action.payload.id;
        },
        ModalWatchToggleRoomFound(state, action: PayloadAction<ModalWatchToggleRoomFoundState>) {
            state.watch.showRoomFound = action.payload.show;

            if(state.watch.showRoomFound) {
                // @ts-ignore
                state.watch.roomInfo.passCode = action.payload.passCode;
                // @ts-ignore
                state.watch.roomInfo.showTitle = action.payload.showTitle;
                // @ts-ignore
                state.watch.roomInfo.startTime = action.payload.startTime;
            }
        }
    }
});

export const { ModalShowToggleAdd, ModalShowToggleEdit, ModalWatchToggleRoomFound } = ModalSlice.actions;

// Interface
export interface ModalShowToggleEditState {
    show: boolean;
    id: number;
}

export interface ModalWatchToggleRoomFoundState {
    show: boolean;
    showTitle?: string;
    passCode?: string;
    startTime?: Date;
}

// Export
export default ModalSlice.reducer;