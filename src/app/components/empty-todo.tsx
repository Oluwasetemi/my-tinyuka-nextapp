import {FolderLock} from "lucide-react"
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import Link from "next/link"

function EmptyTodo() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FolderLock />
                </EmptyMedia>
                <EmptyTitle>No Todos Yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any todos yet. Get started by creating
                    your first Todo.
                </EmptyDescription>
            </EmptyHeader>
            <Button
                variant="link"
                asChild
                className="text-gray-50 bg-blue-500 hover:no-underline hover:bg-blue-400"
                size="sm"
            >
                <Link href="/todos/new">
                    Create Todo <ArrowUpRightIcon />
                </Link>
            </Button>
        </Empty>
    )
}

export default EmptyTodo;