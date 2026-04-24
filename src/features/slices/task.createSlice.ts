import TaskApi from "../../api/task.api";

export interface CreateTaskSliceStateType{
    createTaskState:{
        value:boolean|null,
        isSuccess:boolean,
        isLoading:boolean,
        error:string|null
    },
    createTask:(value:string)=>void,
    resetCreateTaskState:()=>void
}

const initialState={
    value:null,
    isSuccess:false,
    isLoading:false,
    error:null
}

export const createTaskSlice=(set:any,get:any,store:any)=>({
    createTaskState:{
        ...initialState
    },
    createTask:(value:string)=>{
        set({
            createTaskState:{
                ...initialState,
                isLoading:true,
            }
        });
        try{
            const response=TaskApi.create(value);
            if(response){
                set({
                createTaskState:{
                    value:true,
                    isLoading:false,
                    isSuccess:true,
                    error:null
                }
            })
            }
        }catch(error:any){
            set({
                createTaskState:{
                    isLoading:false,
                    isSuccess:false,
                    error:error
                }
            })
        }
    },
    resetCreateTaskState:()=>set({
        createTaskState:{
            ...initialState
        }
    })
})