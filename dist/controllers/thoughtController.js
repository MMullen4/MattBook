// import { Types } from 'mongoose';
import { Thought, User } from '../models';
export const thoughtController = {
    async getThought(_req, res) {
        try {
            const allThoughts = await Thought.find();
            console.log(allThoughts);
            res.json(allThoughts);
        }
        catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!singleThought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }
            else {
                res.json(singleThought);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate({ _id: req.body.userId }, // find user by _id and update their thoughts array
            { $push: { thoughts: thought._id } }, // push the new thought's _id to the user's thoughts array
            { new: true } // return the updated document
            );
            if (!user) {
                res.status(404).json({ message: 'Thought created, but found no user with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            const userUpdate = await User.findOneAndUpdate({ _id: req.body.userId }, { $pull: { thoughts: thought._id } }, { new: true });
            res.json({ userUpdate, message: 'Thought successfully deleted!' });
        }
        catch (err) {
            console.error("error", err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { runValidators: true, new: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
export default thoughtController;
