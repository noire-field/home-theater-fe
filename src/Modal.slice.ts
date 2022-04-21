import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
    show: {
        showAdd: boolean;
        showEdit: boolean;
        targetId: number | null;
    }
}

const initialState: ModalState = {
    show: {
        showAdd: false,
        showEdit: false,
        targetId: null
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
    }
});

export const { ModalShowToggleAdd, ModalShowToggleEdit } = ModalSlice.actions;

// Interface
export interface ModalShowToggleEditState {
    show: boolean;
    id: number;
}

// Export
export default ModalSlice.reducer;