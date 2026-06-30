"use server"

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../model";

interface CreateJobApplication {

    company: string;
    position: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId: string;
    boardId: string;
    tags?: string[];
    description?: string;
}

export async function CreateJobApplication(data: CreateJobApplication) {


    const session = await getSession()

    if (!session?.user?.id) {
        return { error: "User not found" }
    }

    await connectDB()

    const {
        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        tags,
        description,
    } = data;

    if (!company || !position || !boardId || !columnId) {
        return { error: "Missing required fields" }
    }

    const board = await Board.findOne(
        {
            _id: boardId,
            userId: session.user.id
        })


    if (!board) {
        return { error: "Board not found" };
    }

    const column = await Column.findOne({
        _id: columnId,
        boardId: boardId
    })

    if (!column) {
        return { error: "Column not found" }
    }

    const maxOrder = (await JobApplication.findOne({ columnId })
        .sort({ order: -1 })
        .select("order")
        .lean()) as { order: number } | null;

    const jobApplication = await JobApplication.create({

        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        userId: session.user.id,
        tags: tags || [],
        description,
        status: "applied",
        order: maxOrder ? maxOrder.order + 1 : 0,
    })

    await Column.findByIdAndUpdate(columnId, {
        $push: { jobApplications: jobApplication._id },
    });

    revalidatePath("/dashboard")

    return { data: JSON.parse(JSON.stringify(jobApplication)) }

}

export async function updateJobApplication(
    id: string,
    updates: {
        company?: string;
        position?: string;
        location?: string;
        notes?: string;
        salary?: string;
        jobUrl?: string;
        columnId?: string;
        order?: number;
        tags?: string[];
        description?: string;
    }
) {

    const session = await getSession();

    if (!session?.user?.id) {
        return { error: "unauthrorized" }
    }

    const jobApplication = await JobApplication.findById(id)

    if (!jobApplication) {
        return { error: "Job application not found" }
    }

    if (jobApplication.userId !== session.user.id) {
        return { error: "unauthorized to access job" }
    }

    const { columnId, order, ...otherUpdates } = updates;

    const updatesToApply: Partial<{
        company: string;
        posistion: string;
        location: string;
        notes: string;
        salary: string;
        jobUrl: string;
        columnId: string;
        order: number;
        tags: string[];
        description: string;
    }> = otherUpdates;

    const currentColumnsId = jobApplication.columnId.toString()
    const newColumnId = columnId?.toString()

    const isMovingToDifferenetColumn =
        newColumnId && newColumnId !== currentColumnsId

    if (isMovingToDifferenetColumn) {
        await Column.findByIdAndUpdate(currentColumnsId, {
            $pull: { jobApplications: id },
        })

        const jobsInTargetColumn = await JobApplication.find({
            columnId: newColumnId,
            _id: { $ne: id },
        }).sort({ order: 1 }).lean()

        let newOrderValue: number;

        if (order !== undefined && order !== null) {
            newOrderValue = order;

            const jobsThatNeedToShift = jobsInTargetColumn.slice(order)
            for (const job of jobsThatNeedToShift) {
                await JobApplication.findByIdAndUpdate(job._id, {
                    $set: { order: job.order + 1 },
                })
            }
        } else {
            if (jobsInTargetColumn.length > 0) {
                const lastJobOrder = jobsInTargetColumn[jobsInTargetColumn.length - 1].order || 0;
                newOrderValue = lastJobOrder + 100;
            } else {
                newOrderValue = 0;
            }
        }

        updatesToApply.columnId = newColumnId;
        updatesToApply.order = newOrderValue;

        await Column.findByIdAndUpdate(newColumnId, {
            $push: { jobApplications: id },
        })

    } else if (order !== undefined && order !== null) {
        const otherJobsInColumn = await JobApplication.find({
            columnId: currentColumnsId,
            _id: { $ne: id },
        }).sort({ order: 1 }).lean();

        const currentOrder = jobApplication.order || 0;

        const currentPossitionIndex = otherJobsInColumn.findIndex((job) => job.order > currentOrder)

        const olderPositionIndex = currentPossitionIndex === -1
            ? otherJobsInColumn.length
            : currentPossitionIndex;

        const newOrderValue = order * 100

        if (order < olderPositionIndex) {
            const jobsToShiftDown = otherJobsInColumn.slice(order, olderPositionIndex)

            for (const job of jobsToShiftDown) {
                await JobApplication.findByIdAndUpdate(job._id, {
                    $set: { order: job.order + 100 },
                })
            }
        } else if (order > olderPositionIndex) {
            const jobsToShiftUp = otherJobsInColumn.slice(olderPositionIndex, order)

            const newOrder = Math.max(0, jobApplication.order - 100)
            for (const job of jobsToShiftUp) {
                await JobApplication.findByIdAndUpdate(job._id, {
                    $set: { order: newOrder },
                })
            }
        }
        updatesToApply.order = newOrderValue
    }

    const updated = await JobApplication.findByIdAndUpdate(id, updatesToApply, {
        new: true
    })

    revalidatePath("/dashboard");

    return { data: JSON.parse(JSON.stringify(updated)) };

}
