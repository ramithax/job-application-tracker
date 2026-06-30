import { useState } from "react";
import { Board, Column } from "../model/models.types";


export function useBoard(initialBoard: Board | null) {

    const [board, setBoard] = useState<Board | null>(initialBoard || null);
    const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || [])
    const [error, setError] = useState<string | null>(null)

    async function moveJobs(
        jobApplicationId: string,
        newColumnId: string,
        newOrder: number
    ) {


    }

    return {
        board, columns, error
    }

}