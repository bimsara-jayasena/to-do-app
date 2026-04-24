import TaskApi from "../../api/task.api";
import type { Task } from "../types/task.type";

export interface GetAllTaskSliceType {
    getAllTaskState: {
        value: Task[] | null;
        isLoading: boolean;
        isSuccess: boolean;
        error: string | null;
    }
    // Actions
    getAllTask: () => Promise<void>;
    reset: () => void;
}

const initialState = {
    value: null,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const getAllTaskSlice = (set: any, get: any, store: any): GetAllTaskSliceType => ({
    getAllTaskState: {
        value: null,
        isLoading: false,
        isSuccess: false,
        error: null,
    },
    getAllTask: async () => {
        set({
            getAllTaskState: {
                isLoading: true,
                error: null
            }
        });
        try {
            const data = await TaskApi.getAll();
            const arr = data.map((task:any) => ({
                id: task.id,
                title: task.title,
                status: task.completed ? "completed" : "incomplete"
            }))
            set({
                getAllTaskState: {
                    value: arr,
                    isLoading: false,
                    isSuccess: true,
                    error: null
                }
            });
        } catch (error: any) {
            set({
                getAllTaskState: {
                    isLoading: false,
                    isSuccess: false,
                    error: error?.message
                }
            });
        }
    },
    reset: () => set({
        getAllTaskState: { ...initialState }
    })
})

