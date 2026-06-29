import { Column, JobApplication } from "@/lib/model/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit, Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface JobApplicationCardProps {
    job: JobApplication;
    columns: Column[];
}

export default function JobApplicationCard({ job, columns }: JobApplicationCardProps
) {
    return (
        <>
            <Card className="group hover:shadow-md transition-all border border-muted rounded-xl">
                <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-3">

                        {/* LEFT CONTENT */}
                        <div className="space-y-2 flex-1">
                            <h3 className="text-sm font-semibold text-foreground">
                                {job.position}
                            </h3>

                            <p className="text-xs text-muted-foreground">
                                {job.company}
                            </p>

                            {job.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {job.description}
                                </p>
                            )}

                            {/* TAGS */}
                            {job.tags && job.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1">
                                    {job.tags.map((tag, key) => (
                                        <span
                                            key={key}
                                            className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* JOB LINK */}
                            {job.jobUrl && (
                                <a
                                    target="_blank"
                                    href={job.jobUrl}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline pt-1"
                                >
                                    View Job <ExternalLink className="h-3 w-3" />
                                </a>
                            )}
                        </div>

                        {/* RIGHT MENU */}
                        <div className="opacity-0 group-hover:opacity-100 transition">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-44">
                                    <DropdownMenuItem>
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit
                                    </DropdownMenuItem>

                                    {columns.length > 1 && (
                                        <>
                                            {columns
                                                .filter((c) => c._id !== job.columnId)
                                                .map((column, key) => (
                                                    <DropdownMenuItem key={key}>
                                                        Move to {column.name}
                                                    </DropdownMenuItem>
                                                ))}
                                        </>
                                    )}

                                    <DropdownMenuItem className="text-red-500">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </>
    );
}