"use client"

import { Column, JobApplication } from "@/lib/model/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit, Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { deleteJobApplication, updateJobApplication } from "@/lib/actions/job-applicartions";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";

interface JobApplicationCardProps {
    job: JobApplication;
    columns: Column[];
}

export default function JobApplicationCard({ job, columns }: JobApplicationCardProps
) {

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        company: job.company,
        position: job.position,
        location: job.location || "",
        notes: job.notes || "",
        salary: job.salary || "",
        jobUrl: job.jobUrl || "",
        columnId: job.columnId || "",
        tags: job.tags?.join(", ") || "",
        description: job.description || "",
    });

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        try {
            const result = await updateJobApplication(job._id, {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0),
            });

            if (!result.error) {
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Failed to move job application: ", err);
        }
    }

    async function handleDelete() {
        try {

            const result = await deleteJobApplication(job._id)

            if (result.error) {
                console.error("Failed to delete job application:", result.error);
            }

        } catch (err) {
            console.error("Failed to delete job application: ", err);
        }
    }

    async function handleMove(newColumnId: string) {
        try {
            const result = await updateJobApplication(job._id, {
                columnId: newColumnId,
            });
        } catch (err) {
            console.error("Failed to move job application: ", err);
        }
    }
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
                                    <DropdownMenuItem onClick={() => { setIsEditing(true) }}>
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit
                                    </DropdownMenuItem>

                                    {columns.length > 1 && (
                                        <>
                                            {columns
                                                .filter((c) => c._id !== job.columnId)
                                                .map((column, key) => (
                                                    <DropdownMenuItem key={key} onClick={() => handleMove(column._id)}>
                                                        Move to {column.name}
                                                    </DropdownMenuItem>
                                                ))}
                                        </>
                                    )}

                                    <DropdownMenuItem className="text-red-500" onClick={() => handleDelete()}>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </div>
                </CardContent>
            </Card>


            <Dialog open={isEditing} onOpenChange={setIsEditing} >
                <DialogContent className="max-w-2xl">
                    <DialogHeader className="space-y-1">
                        <DialogTitle>Create Job Application</DialogTitle>
                        <DialogDescription>
                            Add a new job application to your board.
                        </DialogDescription>
                    </DialogHeader>

                    {/* FORM */}
                    <form className="space-y-6 pt-4" onSubmit={handleUpdate} >

                        {/* BASIC INFO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium">
                                    Company
                                </label>
                                <Input id="company" placeholder="e.g. Google" required value={formData.company}
                                    onChange={(e) =>
                                        setFormData({ ...formData, company: e.target.value })
                                    } />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="position" className="text-sm font-medium">
                                    Position
                                </label>
                                <Input id="position" placeholder="e.g. Software Engineer" required value={formData.position}
                                    onChange={(e) =>
                                        setFormData({ ...formData, position: e.target.value })
                                    } />
                            </div>
                        </div>

                        {/* DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="location" className="text-sm font-medium">
                                    Location
                                </label>
                                <Input id="location" placeholder="e.g. Remote / Colombo" value={formData.location}
                                    onChange={(e) =>
                                        setFormData({ ...formData, location: e.target.value })
                                    } />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="salary" className="text-sm font-medium">
                                    Salary
                                </label>
                                <Input id="salary" placeholder="e.g. $2000/month" value={formData.salary}
                                    onChange={(e) =>
                                        setFormData({ ...formData, salary: e.target.value })
                                    } />
                            </div>
                        </div>

                        {/* URL */}
                        <div className="space-y-2">
                            <label htmlFor="jobURL" className="text-sm font-medium">
                                Job URL
                            </label>
                            <Input id="jobURL" placeholder="https://..." value={formData.jobUrl}
                                onChange={(e) =>
                                    setFormData({ ...formData, jobUrl: e.target.value })
                                } />
                        </div>

                        {/* TAGS */}
                        <div className="space-y-2">
                            <label htmlFor="tags" className="text-sm font-medium">
                                Tags
                            </label>
                            <Input id="tags" placeholder="Frontend, Remote, Internship" value={formData.tags}
                                onChange={(e) =>
                                    setFormData({ ...formData, tags: e.target.value })
                                } />
                        </div>

                        {/* NOTES */}
                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium">
                                Notes
                            </label>
                            <textarea
                                id="notes"
                                placeholder="Add any notes..."
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                value={formData.notes}
                                onChange={(e) =>
                                    setFormData({ ...formData, notes: e.target.value })
                                } />
                        </div>

                        {/* FOOTER */}
                        <DialogFooter className="pt-2">
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save
                            </Button>
                        </DialogFooter>

                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}