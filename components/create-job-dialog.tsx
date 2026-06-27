import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";


export interface CreateJobApplicationDialogProps {
    columnId: string;
    boardId: string;
}

export default function CreateJobApplicationDialog({ columnId, boardId }: CreateJobApplicationDialogProps) {
    return (

        <Dialog>
            <DialogTrigger>
                <Button variant="outline" className="w-full">
                    <Plus />Add Job
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Job Application</DialogTitle>
                    <DialogDescription>
                        Add a new job application to the board.
                    </DialogDescription>
                    <form>
                        <div>
                            <div>
                                <div>
                                    <label htmlFor="company">Company </label>
                                    <Input id="company" placeholder="Company Name" required />
                                </div>
                                <div>
                                    <label htmlFor="company">Company </label>
                                    <Input id="company" placeholder="Company Name" required />
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}