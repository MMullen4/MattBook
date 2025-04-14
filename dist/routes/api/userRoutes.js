import { Router } from "express";
import userController from "../../controllers/userController.js";
// import {
//     getUsers,
//     createUser,
//     getSingleUser,
//     updateUser,
//     deleteUser,
//     addFriend,
//     deleteFriend
// } from "../../controllers/userController";
const router = Router();
// get all users and create a new user
router.route("/").get(userController.getUsers).post(userController.createUser);
// get a single user, update a user, and delete a user
router.route("/:userId").get(userController.getSingleUser).put(userController.updateUser).delete(userController.deleteUser);
// add and delete a friend
router.route("/:userId/friends/:friendId")
    .post(userController.addFriend)
    .delete(userController.deleteFriend);
export default router;
