import connectDB from "@/lib/db";
import KanbanBoard from "@/components/kanban-board";
import { initUserBoard } from "@/lib/init-user-board";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/auth";
import { Board } from "@/lib/model";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/sign-in");
    }

    await connectDB();

    await initUserBoard(session.user.id);

    const board = await Board.findOne({
        userId: session.user.id,
        name: "Job Hunt",
    }).populate({
        path: "columns"
    });

    if (!board) {
        return <div>No board found</div>;
    }

    return (
        <KanbanBoard
            board={JSON.parse(JSON.stringify(board))}
            userId={session.user.id}
        />
    );
}