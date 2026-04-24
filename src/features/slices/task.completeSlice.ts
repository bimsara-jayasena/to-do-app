import TaskApi from "../../api/task.api";

export interface CompleteTaskSliceStateType{
    completeTaskState:{
        value:boolean|null,
        isSuccess:boolean,
        isLoading:boolean,
        error:string|null
    },
    completeTask:(id:number)=>void,
    resetCompleteState:()=>void
}
const initialState={
    value:null,
    isSuccess:false,
    isLoading:false,
    error:null
}

export const completeTaskSlice=(set:any,get:any,store:any):CompleteTaskSliceStateType=>({
    completeTaskState:{
        ...initialState
    },
    completeTask:(id:number)=>{
        set({
            completeTaskState:{
                ...initialState,
                isLoading:true,
                error:null
            }
        });
        try{
            const response=TaskApi.complete(id);
            if(response){
                set({
                    completeTaskState:{
                        value:true,
                        isSuccess:true,
                        isLoading:false,
                        error:null
                    },
                })
            }
        }catch(error:any){
            set({
                completeTaskState:{
                    isLoading:false,
                    isSuccess:false,
                    error:error
                }
            })
        }
    },
    resetCompleteState:()=>{
        set({
            completeTaskState:{...initialState}
        })
    }
})