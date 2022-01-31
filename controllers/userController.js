const { User, Thought } = require("../models/index");

module.exports = {
    // works
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .populate("thoughts")
            .populate("friends") 
            .then((users) => res.json(users))
            .catch((err) => {
                console.log('ERr!!!!!!! get all!!', err)
                res.status(500).json(err)
            });
    },
    // works
    getOneUser(req, res) {
        console.log('singleuser', req.params)
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate("thoughts")
            .populate("friends")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log('ERr!!!!!!! SINGLE  user all!!', err)
                res.status(500).json(err)
            });
    },
    // works
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // works
    addUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // works
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // works
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet:{ friends: req.params.friendId}}, {new: true})
            .then((updatedUser) =>
                !updatedUser
                    ? res.status(404).json({ message: 'No user(s) with that ID' })
                    : res.json(updatedUser)
            )
            .then(() => console.log("Friend added"))
            .catch((err) => res.status(500).json(err));
    },
    // works
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId}}, {new: true})
            .then((updatedUser) =>
                !updatedUser
                    ? res.status(404).json({ message: 'No user(s) with that ID' })
                    : res.json(updatedUser)
            )
            .then(() => console.log("Friend deleted"))
            .catch((err) => res.status(500).json(err));
    }
}