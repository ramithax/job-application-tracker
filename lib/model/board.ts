import mongoose, { Document, Schema, model } from "mongoose";

export interface IBoard extends Document {

    name: string;
    userId: string;
    column: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const BoardSchema = new Schema<IBoard>({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    column: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Column'
        }
    ]
}, {
    timestamps: true
});

export default mongoose.models.Board || mongoose.model<IBoard>("Board", BoardSchema);
