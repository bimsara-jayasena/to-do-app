import { useEffect, useState } from "react"
import { Dialog,DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../Dialog"
import { Input } from "../Input"
import { Button } from "../Button"
import { useStore } from "../../app/store"
import { toast } from "sonner"
interface Props {
    open: boolean,
    handleClose: (arg: boolean) => void,
    id: number
}
export default function EditTask({
    open,
    handleClose,
    id
}: Props) {
    const [newValue,setNewValue]=useState<string|null>(null)
    const {updateTask,updateTaskState,resetUpdateTask}=useStore();
    const handleSubmit=()=>{
        updateTask(id,newValue!);
    }
    useEffect(()=>{
        console.log(updateTaskState);
        if(!updateTaskState.isLoading){
            if(updateTaskState.isSuccess&&updateTaskState.value){
                resetUpdateTask();
                handleClose(true);
            }else if(updateTaskState.error){
                toast.error(updateTaskState.error);
            }
        }
    },[updateTaskState.isLoading,updateTaskState.isSuccess,updateTaskState.isSuccess])
    return (
        <Dialog open={open} onOpenChange={() => handleClose(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription className="pt-5">
                        <Input placeholder="new task..." onChange={(e)=>setNewValue(e.target.value)} onKeyDown={(e)=>e.key==="Enter" ? handleSubmit() : null}/>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button type="button" onClick={handleSubmit} >Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}