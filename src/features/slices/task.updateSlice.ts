import TaskApi from "../../api/task.api";

export interface TaskUpdateSliceType {
    updateTaskState: {
        value: boolean | null,
        isLoading: boolean,
        isSuccess: boolean,
        error: string | null
    },
    updateTask: (id: number, newValue: string) => void,
    resetUpdateTask: () => void
}

const initialState = {
    value: null,
    isLoading: false,
    isSuccess: false,
    error: null
}

export const updateTaskSlice = (set: any, get: any, store: any): TaskUpdateSliceType => ({
    updateTaskState: {
        value: null,
        isLoading: false,
        isSuccess: false,
        error: null
    },
    updateTask: async(id: number, newValue: string) => {
        set({
            updateTaskState: {
                isLoading: true,
                error: null
            }
        });
        try {
            const response = TaskApi.update(id, newValue);
            if (response) {
                set({
                    updateTaskState: {
                        value: true,
                        isSuccess: true,
                        isLoading: false,
                        error: null
                    }
                })
            }
        } catch (error: any) {
            set({
                updateTaskState: {
                    isLoading: false,
                    isSuccess: false,
                    error: error
                }
            });
        }
    },
    resetUpdateTask: () => set({
        updateTaskState: { ...initialState }
    })
})