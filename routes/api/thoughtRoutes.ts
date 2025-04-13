import { Router } from "express";
import {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} from "../../controllers/thoughtController";

const router: Router = Router();

// get all thoughts and create a new thought
router.route("/").get(getThought).post(createThought);

// get a single thought, update a thought, and delete a thought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// add a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

// delete a reaction from a thought
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

export default router;
