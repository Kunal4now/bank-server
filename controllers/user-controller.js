const User = require('../models/User');

exports.getAll = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id).select('-password');

        if (!user) {
            res.status(400).json('User not found')
        }

        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json(err);
    }
}