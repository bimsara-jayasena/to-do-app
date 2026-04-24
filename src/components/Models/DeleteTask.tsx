import { useEffect} from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../Dialog"
import { Button } from "../Button"
import { useStore } from "../../app/store"
import { toast } from "sonner"
interface Props {
    open: boolean,
    handleClose: (arg: boolean) => void,
    id: number
}
export default function DeleteTask({
    open,
    handleClose,
    id
}: Props) {
    const {deleteTask,resetDeleteTaskState,deleteTaskState}=useStore();
    const handleSubmit=()=>{
        deleteTask(id);
    }
    useEffect(()=>{
        if(!deleteTaskState.isLoading){
            if(deleteTaskState.isSuccess && deleteTaskState.value){
                resetDeleteTaskState();
                handleClose(true);
            }else if(deleteTaskState.error){
                toast.error(deleteTaskState.error);
            }
        }
    },[deleteTaskState.isLoading,deleteTaskState.isSuccess,deleteTaskState.value])
    return (
        <Dialog open={open} onOpenChange={() => handleClose(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription className="text-red-700 font-bold">
                        are you sure you want to delete this task? this task cannot be reverse.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button variant="outline" autoFocus className="focus:bg-gray-400">Cancel</Button>
                    </DialogClose>
                    <Button type="button" variant={"destructive"} onClick={handleSubmit}>Yes, Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}