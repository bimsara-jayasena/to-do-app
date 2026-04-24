import { useEffect} from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../Dialog"

import { Button } from "../Button"
import { useStore } from "../../app/store"
import { toast } from "sonner"
interface Props {
    open: boolean,
    handleClose: (arg: boolean) => void,
    id: number
}
export default function CompleteTask({
    open,
    handleClose,
    id
}: Props) {
    const {completeTask,resetCompleteState,completeTaskState}=useStore();
    const handleSubmit=()=>{
       completeTask(id);
    }
    useEffect(()=>{
        if(!completeTaskState.isLoading){
            if(completeTaskState.isSuccess&&completeTaskState.value){
                resetCompleteState();
                handleClose(true);
            }else if(completeTaskState.error){
                toast.error(completeTaskState.error);
            }
        }
    },[completeTaskState.isLoading,completeTaskState.isSuccess])
    return (
        <Dialog open={open} onOpenChange={() => handleClose(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Complete Task</DialogTitle>
                    <DialogDescription className="pt-5">
                       mark as completed?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button type="button" onClick={handleSubmit}>Ok</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}