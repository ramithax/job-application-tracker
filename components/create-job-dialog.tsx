import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";


export interface CreateJobApplicationDialogProps {
    columnId: string;
    boardId: string;
}

export default function CreateJobApplicationDialog({ columnId, boardId }: CreateJobApplicationDialogProps) {
    return (

        <Dialog>
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
                <form className="space-y-6 pt-4">

                    {/* BASIC INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="company" className="text-sm font-medium">
                                Company
                            </label>
                            <Input id="company" placeholder="e.g. Google" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="position" className="text-sm font-medium">
                                Position
                            </label>
                            <Input id="position" placeholder="e.g. Software Engineer" required />
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium">
                                Location
                            </label>
                            <Input id="location" placeholder="e.g. Remote / Colombo" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="salary" className="text-sm font-medium">
                                Salary
                            </label>
                            <Input id="salary" placeholder="e.g. $2000/month" />
                        </div>
                    </div>

                    {/* URL */}
                    <div className="space-y-2">
                        <label htmlFor="jobURL" className="text-sm font-medium">
                            Job URL
                        </label>
                        <Input id="jobURL" placeholder="https://..." />
                    </div>

                    {/* TAGS */}
                    <div className="space-y-2">
                        <label htmlFor="tags" className="text-sm font-medium">
                            Tags
                        </label>
                        <Input id="tags" placeholder="Frontend, Remote, Internship" />
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
                        />
                    </div>

                    {/* FOOTER */}
                    <DialogFooter className="pt-2">
                        <Button type="button" variant="outline">
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