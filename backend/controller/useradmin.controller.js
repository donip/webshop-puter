const User = require('../models/user');

module.exports = {
    listUsers: (req, res) => {
        User.find({})
      .then(user => res.json(user))
      .catch(err => res.send(err));
    },

    editUser: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => res.send(err));
    }
}