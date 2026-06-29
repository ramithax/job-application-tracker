"use client"

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { CreateJobApplication } from "@/lib/actions/job-applicartions";


export interface CreateJobApplicationDialogProps {
    columnId: string;
    boardId: string;
}

const INITIAL_FORM_DATA = {
    company: "",
    position: "",
    location: "",
    notes: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
};

export default function CreateJobApplicationDialog({ columnId, boardId }: CreateJobApplicationDialogProps) {

    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {

            const result = await CreateJobApplication({
                ...formData,
                columnId,
                boardId,
                tags: formData.tags.split(",").map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0),
            })

            if (!result.error) {
                setFormData(INITIAL_FORM_DATA);
                setOpen(false)
            }
            else {
                console.log("Error creating job application", result.error)
            }

        }
        catch (error) {
            console.log(error)
        }
    }


    return (

        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full mb-4 justify-start text-muted-foreground border-dashed border-2 hover:border-solid hover:bg-muted/50"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Job
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader className="space-y-1">
                    <DialogTitle>Create Job Application</DialogTitle>
                    <DialogDescription>
                        Add a new job application to your board.
                    </DialogDescription>
                </DialogHeader>

                {/* FORM */}
                <form className="space-y-6 pt-4" onSubmit={handleOnSubmit}>

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
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Create Job
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}