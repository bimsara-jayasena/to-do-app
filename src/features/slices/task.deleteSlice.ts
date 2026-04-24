import TaskApi from "../../api/task.api";

export interface DeleteTaskSliceType {
    deleteTaskState: {
        value: boolean | null,
        isSuccess: boolean,
        isLoading: boolean,
        error: string | null
    }
    deleteTask: (id: number) => void,
    resetDeleteTaskState: () => void
}

const initialState = {
    value: null,
    isSuccess: false,
    isLoading: false,
    error: null
}

export const deleteTaskSlice=(set:any,store:any,get:any):DeleteTaskSliceType=>({
    deleteTaskState: {
        ...initialState
    },
    deleteTask:(id:number)=>{
        set({deleteTaskState:{
            ...initialState,
            isLoading:true,
            error:null
        }});
        try{
            const response=TaskApi.delete(id);
            if(response){
                set({
                    deleteTaskState:{
                        value:true,
                        isSuccess:true,
                        isLoading:false,
                        error:null
                    }
                });
            }
        }catch(error:any){
            set({deleteTaskState:{
                isLoading:false,
                isSuccess:false,
                error:error
            }});
        }
    },
    resetDeleteTaskState:()=>set({
        deleteTaskState:{...initialState}
    })
})