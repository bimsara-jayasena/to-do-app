import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ToggleGroup, ToggleGroupItem } from "../components/Toggle-group";
import Card from "../components/Card";
import EditTask from "../components/Models/EditTask";
import DeleteTask from "../components/Models/DeleteTask";
import CompleteTask from "../components/Models/CompleteTask";
import { useStore } from "../app/store";
import type { Task } from "../features/types/task.type";
import { Toaster } from "../components/Sonner";
import { toast } from "sonner";

import { Loader } from "lucide-react";
import EmptyState from "../components/EmptyPage";

export default function Dashboard() {
    const [selected, setSelected] = useState("all");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [del, setDel] = useState<number | undefined>(undefined);
    const [edit, setEdit] = useState<number | undefined>(undefined);
    const [complete, setComplete] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState<{ loading: boolean, action: string | null }>({ loading: false, action: null });
    const [newTask, setNewTask] = useState<string | null>(null);
    const taskRef = useRef<Task[]>([]);
    const { getAllTask, getAllTaskState, createTask, resetCreateTaskState, createTaskState } = useStore();
    
    /* fetch */
    const fetchData = () => {
        
        const storedData = localStorage.getItem('tasks');
        if (storedData) {
            setLoading({ loading: false, action: null });
            taskRef.current = JSON.parse(storedData);
            setTasks(JSON.parse(storedData));
        } else {
            getAllTask();
        }
    }
    useEffect(() => {
        setLoading({ loading: true, action: "fetching tasks..." })
        fetchData();
    }, [])
    useEffect(() => {
        if (!getAllTaskState.isLoading && !localStorage.getItem('tasks')) {
            
            if (getAllTaskState.isSuccess && getAllTaskState.value) {
                setLoading({ loading: false, action: null });
                setTasks(getAllTaskState.value);
                taskRef.current = getAllTaskState.value;
                localStorage.setItem('tasks', JSON.stringify(getAllTaskState.value));
            } else if(getAllTaskState.error){
               toast.error(getAllTaskState.error);
                setLoading({ loading: false, action: null });
            }
        }
    }, [getAllTaskState.isLoading, getAllTaskState.isSuccess, getAllTaskState.value])

    /* filter */
    useEffect(() => {
        if (selected === "all") {
            setTasks(taskRef.current);
        } else {
            const filtered = taskRef.current.filter((task) => task.status === selected);
            if (filtered) {
                setTasks(filtered);
            }
        }
    }, [selected]);

    /* create */
    const checkDuplicates = () => {
        console.log(newTask);
        const duplicates = taskRef.current.find((t) => t.title.toLocaleLowerCase().trim() === newTask?.toLocaleLowerCase().trim());
        return duplicates;
    }
    const handleAddNewTask = () => {
        if (!checkDuplicates()) {
            setLoading({ loading: true, action: "adding new task..." })
            createTask(newTask!);
        } else {
            setLoading({ loading: false, action: null })
            toast.error("task already exists!");
        }
    }
    useEffect(() => {
        if (!createTaskState.isLoading) {
            if (createTaskState.isSuccess && createTaskState.value) {
                resetCreateTaskState();
                setLoading({ loading: false, action: null });
                toast.success("New task added");
                fetchData();
            } else if (createTaskState.error) {
                toast.error(createTaskState.error);
            }
        }
    }, [createTaskState.isLoading, createTaskState.isSuccess])
    return (
        <div className="p-5 flex flex-col gap-5">
            {/* HEADER */}
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <div className="font-bold text-3xl text-[#0080FF]">TaskFlow</div>
                    <div className="">clear mind,organized days</div>
                </div>
                <div className="flex flex-row gap-5">
                    <div className="border-1 rounded-3xl text-xl p-1 pl-3 pr-3 border-[#0080FF] text-[#0080FF]"> {taskRef.current.filter((t) => t.status === "completed").length} Done</div>
                    <div className="border-1 rounded-3xl text-xl p-1 pl-3 pr-3 border-[#0080FF] text-[#0080FF]">{taskRef.current.filter((t) => t.status === "incomplete").length} left</div>
                </div>
            </div>
            {/* BODY */}
            <div className="flex flex-row justify-between items-center">
                <Input placeholder="Add new task..." onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? handleAddNewTask() : null} />
                <Button onClick={handleAddNewTask}>+ Add new task</Button>
            </div>
            <div >
                <ToggleGroup variant="outline" type="single" value={selected} onValueChange={(e) => setSelected(e || "all")}>
                    <ToggleGroupItem value="all" aria-label="Toggle all">
                        All
                    </ToggleGroupItem>
                    <ToggleGroupItem value="completed" aria-label="Toggle completed">
                        Completed
                    </ToggleGroupItem>
                    <ToggleGroupItem value="incomplete" aria-label="Toggle incomplete">
                        Incomplete
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            {/* DATA */}
            <div className="flex flex-col gap-5 ">
                {tasks.length==0 ? <EmptyState filter={selected as "all" | "completed" | "incomplete"} />:tasks.map((card) => (
                    <div key={card.id}>
                        <Card data={card} cardActions={{ handleEdit: setEdit, handleDelete: setDel, handleComplete: setComplete }} />
                    </div>
                ))}
            </div>
            {edit && (
                <EditTask open={edit ? true : false} handleClose={(arg) => {
                    if (arg) {
                        setEdit(undefined);
                        fetchData();
                        toast.success('task updated successfully');
                    } else {
                        setEdit(undefined);
                    }
                }} id={edit} />
            )}

            {del && (
                <DeleteTask open={del ? true : false} handleClose={(arg) => {
                    if (arg) {
                        setDel(undefined);
                        toast.success('task deleted successfully')
                        fetchData();
                    } else {
                        setDel(undefined);
                    }
                }} id={del} />
            )}

            {complete && (
                <CompleteTask open={complete ? true : false} handleClose={(arg) => {
                    if (arg) {
                        setComplete(undefined);
                        toast.success('success');
                        fetchData();
                    } else {
                        setComplete(undefined);
                    }
                }} id={complete} />
            )}

            {loading.loading && (
                <div className="flex flex-col gap-3 justify-center items-center fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0">
                   <Loader className="h-10 w-10 animate-spin text-[#B2B2B2]" />
                   {loading.action}
                </div>
            )}
            <Toaster position="top-center"/>
        </div>
    )
}
