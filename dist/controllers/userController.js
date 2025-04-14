import { User } from "../models";
export const userController = {
    async getUsers(_req, res) {
        try {
            const users = await User.find({}).select("-__v");
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate("thoughts")
                .populate("friends");
            if (!user) {
                res.status(404).json({ message: "No user with that ID" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { runValidators: true, new: true });
            if (!user) {
                res.status(404).json({ message: "No user with this id!" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: "No user with that ID" });
                return;
            }
            res.json({ user, message: "User successfully deleted!" });
        }
        catch (err) {
            console.error("error", err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true });
            if (!user) {
                res.status(404).json({ message: "No user with this id!" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true });
            if (!user) {
                res.status(404).json({ message: "No user with this id!" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
export default userController;
