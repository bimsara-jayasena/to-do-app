import { create } from 'zustand';

import { getAllTaskSlice } from '../features/slices/task.getAllSlice';
import type { GetAllTaskSliceType } from '../features/slices/task.getAllSlice';

import { createTaskSlice } from '../features/slices/task.createSlice';
import type { CreateTaskSliceStateType } from '../features/slices/task.createSlice';

import { updateTaskSlice } from '../features/slices/task.updateSlice';
import type { TaskUpdateSliceType } from '../features/slices/task.updateSlice';

import { completeTaskSlice } from '../features/slices/task.completeSlice';
import type { CompleteTaskSliceStateType } from '../features/slices/task.completeSlice';

import { deleteTaskSlice } from '../features/slices/task.deleteSlice';
import type { DeleteTaskSliceType } from '../features/slices/task.deleteSlice';


type StoreType=GetAllTaskSliceType 
                & CreateTaskSliceStateType
                & TaskUpdateSliceType 
                & CompleteTaskSliceStateType
                & DeleteTaskSliceType;

export const useStore = create<StoreType>((...a) => ({
        ...getAllTaskSlice(...a),
        ...createTaskSlice(...a),
        ...updateTaskSlice(...a),
        ...completeTaskSlice(...a),
        ...deleteTaskSlice(...a),
        
}));