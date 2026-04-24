import axios from "axios";
import type { Task } from "../features/types/task.type";

const TaskApi = {
    getAll: async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
        return response.data;
    },
    create: (value: string) => {
        try {
            const local = localStorage.getItem('tasks');
            if (local) {
                console.log('new task: ',value)
                const data = JSON.parse(local);
                const ids = data.map((task: Task) => task.id);
                const lastId = Math.max(...ids);
                localStorage.setItem('tasks', JSON.stringify([...data, {
                    id: lastId + 1,
                    title: value,
                    status: "incomplete"
                }]));
                return true;
            }
        } catch (error: any) {
            throw new Error(error);
        }

    },
    update: (id: number, newValue: string) => {
        try {
            console.log(id, newValue);
            const data = localStorage.getItem('tasks');
            console.log("data: ", data);
            if (data) {
                const task = JSON.parse(data).find((t: Task) => t.id == id);

                if (task) {
                    task.title = newValue;
                    const updatedTaskList = JSON.parse(data).map((t: Task) => t.id == id ? {...t,title:newValue} : t);
                    localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
                    return true;
                } else {
                    console.log("invalid id")
                    throw new Error("couldn't find the task")
                }
            }
        } catch (error: any) {
            throw new Error(error);
        }

    },
    complete: (id: number) => {
        try {

            const data = localStorage.getItem('tasks');
            console.log("data: ", data);
            if (data) {
                const task = JSON.parse(data).find((t: Task) => t.id == id);

                if (task) {
                    task.status = "completed";
                    const updatedTaskList = JSON.parse(data).map((t: Task) => t.id == id ? {...t,status:"completed"}:t);
                    localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
                    return true;
                } else {
                    console.log("invalid id")
                    throw new Error("couldn't find the task")
                }
            }
        } catch (error: any) {
            throw new Error(error);
        }

    },
    delete: (id: number) => {
        try {
            const data = localStorage.getItem('tasks');
            if (data) {
                const filtered = JSON.parse(data).filter((task: Task) => task.id !== id);
                localStorage.setItem('tasks', JSON.stringify(filtered));
                return true
            }
        } catch (error: any) {
            throw new Error(error?.message);
        }
    }
}

export default TaskApi;