import { Schema, model, Types, Document } from 'mongoose';

// interface for Reaction documents
interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// interface for Thought documents
interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
    reactionCount: number;
}

const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, // specs this will store date types
        default: Date.now, // set default to current date/time
        get: (timeStamp: { toLocaleDateString: () => any; }) => timeStamp.toLocaleDateString(), // formats how date is returned
    }
}, {
    toJSON: {
        getters: true
    }
});

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timeStamp: { toLocaleDateString: () => any; }) => timeStamp.toLocaleDateString(),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
       
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;