import connectDB from "./db";
import { Board, Column } from "./model";

const DEFAULT_COLUMNS = [
    { name: "Wish List", order: 0 },
    { name: "Applied", order: 1 },
    { name: "Interviewing", order: 2 },
    { name: "Offer", order: 3 },
    { name: "Rejected", order: 4 },
];

export async function initUserBoard(userId: string) {
    await connectDB();

    const existingBoard = await Board.findOne({
        userId,
        name: "Job Hunt",
    });

    if (existingBoard) {
        if (!existingBoard.columns || existingBoard.columns.length === 0) {
            const newColumns = await Promise.all(
                DEFAULT_COLUMNS.map((col) =>
                    Column.create({
                        name: col.name,
                        order: col.order,
                        boardId: existingBoard._id,
                        jobApplications: [],
                    })
                )
            );
            existingBoard.columns = newColumns.map((col) => col._id);
            await existingBoard.save();
        }
        return existingBoard;
    }

    const board = await Board.create({
        userId,
        name: "Job Hunt",
        columns: [],
    });

    const columns = await Promise.all(
        DEFAULT_COLUMNS.map((col) =>
            Column.create({
                name: col.name,
                order: col.order,
                boardId: board._id,
                jobApplications: [],
            })
        )
    );

    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
}