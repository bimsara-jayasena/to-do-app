import { Check, Pencil, Trash } from "lucide-react"
import { Button } from "./Button"
import type { Task } from "../features/types/task.type"

interface CardActions {
    handleEdit: (arg: number) => void,
    handleDelete: (arg: number) => void,
    handleComplete: (arg: number) => void
}
export default function Card({ data, cardActions }: { data: Task, cardActions: CardActions }) {
    return (
        <div className={`flex flex-row justify-between items-center border ${data.status=="completed" ? "border-gray-700 opacity-50 hover:border-[#0080FF] hover:opacity-100" : 'border-[#0080FF]'} rounded-sm p-5 shadow-lg cursor-pointer transition-all duration-300 ease-out
                        hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,128,255,0.25)]
                        hover:border-[#3399FF] hover:bg-[#0080FF]/5 text-left`}>
            <div>
                <div className={`transition-colors duration-300 font-medium hover:text-[#0080FF] ${data.status=="completed" ? "line-through" : ''}`}>
                    {data.title}
                </div>
                <div className="text-sm text-gray-500 mt-1 transition-opacity duration-300 opacity-70 group-hover:opacity-100 ">
                    {data.status}
                </div>
            </div>
            <div>
                {data.status!=="completed" && (<>
                    <Button variant="secondary" size="lg" className="cursor-pointer" onClick={() => cardActions.handleComplete(data.id)}>
                        <Check />
                    </Button>
                    <Button variant="outline" size="lg" className="cursor-pointer" onClick={() => cardActions.handleEdit(data.id)}>
                        <Pencil />
                    </Button>
                </>)}
                <Button variant="destructive" size="lg" className="cursor-pointer" onClick={() => cardActions.handleDelete(data.id)}>
                    <Trash />
                </Button>

            </div>

        </div>
    )
}