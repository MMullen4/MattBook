import { Router } from "express";
import thoughtController from "../../controllers/thoughtController.js";
// import {
//   getThought,
//   getSingleThought,
//   createThought,
//   deleteThought,
//   updateThought,
//   addReaction,
//   deleteReaction,
// } from "../../controllers/thoughtController";
const router = Router();
// get all thoughts and create a new thought
router.route("/").get(thoughtController.getThought).post(thoughtController.createThought);
// get a single thought, update a thought, and delete a thought
router
    .route("/:thoughtId")
    .get(thoughtController.getSingleThought)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);
// add a reaction to a thought
router.route("/:thoughtId/reactions").post(thoughtController.addReaction);
// delete a reaction from a thought
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtController.deleteReaction);
export default router;
