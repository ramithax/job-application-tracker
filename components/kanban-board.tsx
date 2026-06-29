"use client";

import { Board, Column, JobApplication } from "@/lib/model/models.types";
import {
    Award,
    Calendar,
    CheckCircle2,
    Mic,
    MoreVertical,
    Trash2,
    XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./create-job-dialog";
import JobApplicationCard from "./JobApplicationCard";

interface KanbanBoardProps {
    board: Board;
    userId: string;
}

interface ColConfig {
    color: string;
    icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
    {
        color: "bg-cyan-500",
        icon: <Calendar className="h-4 w-4" />,
    },
    {
        color: "bg-purple-500",
        icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
        color: "bg-green-500",
        icon: <Mic className="h-4 w-4" />,
    },
    {
        color: "bg-yellow-500",
        icon: <Award className="h-4 w-4" />,
    },
    {
        color: "bg-red-500",
        icon: <XCircle className="h-4 w-4" />,
    },
]

function DropableColumn({ column, config, boardId, sortedCoulmns }: {
    column: Column;
    config: ColConfig;
    boardId: string;
    sortedCoulmns: Column[];
}) {

    const sortedJobs = column.jobApplications.sort((a, b) => a.order - b.order) || [];
    return (
        <Card className="min-h-[250px] flex flex-col">
            <CardHeader className={`${config.color}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {config.icon}
                        <CardTitle>{column.name}</CardTitle>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-[150px]">

                {sortedJobs.map((job, key) => (
                    <SortableJobCard key={job._id as string || key} job={{ ...job, columnId: job.columnId || column._id }} columns={sortedCoulmns} />
                ))}

                <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
            </CardContent>

            <div className="flex-1 p-3 text-sm text-gray-500">
                No tasks yet
            </div>
        </Card>
    );
}

function SortableJobCard({ job, columns }: {
    job: JobApplication;
    columns: Column[];

}) {
    return (
        <div>
            <JobApplicationCard job={job} columns={columns} />
        </div>
    );
}

export default function KanbanBoard({ board }: KanbanBoardProps) {
    const columns = board?.columns || []; // 🔥 SAFE

    const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

    return (
        <div className="grid grid-cols-5 gap-4">
            {columns.map((col, key) => {
                const config =
                    COLUMN_CONFIG[key] || COLUMN_CONFIG[0];

                return (
                    <DropableColumn
                        key={col._id}
                        column={col}
                        config={config}
                        boardId={board._id}
                        sortedCoulmns={sortedColumns}
                    />
                );
            })}
        </div>
    );
}