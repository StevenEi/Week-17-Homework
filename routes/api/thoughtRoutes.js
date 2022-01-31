const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    updateThought,
    addThought,
    deleteThought,
    makeReaction,
    deleteReaction   
} = require("../../controllers/thoughtController")

router.route("/").get(getThoughts).post(addThought);

router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought)

router.route("/:thoughtId/reactions").post(makeReaction)

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)

module.exports = router;