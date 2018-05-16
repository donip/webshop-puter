const User = require('../models/user');

module.exports = {

  listUsers: (req, res) => {
    if (req.user) {
      if (req.user.isAdmin === 'true') {
        User.find({})
          .then(user => res.json(user))
          .catch(err => res.send(err));
      } else { res.json({ err: 'Művelet megtagadva' }); }
    } else { res.json({ err: 'Nincs bejelentkezve!' }); }
  },

  editUser: (req, res) => {
    if (req.user) {
      if (req.user.isAdmin === 'true') {
        User.findByIdAndUpdate(req.params.id, req.body)
          .then(user => res.json(user))
          .catch(err => res.send(err));
      } else { res.json({ err: 'Művelet megtagadva' }); }
    } else { res.json({ err: 'Nincs bejelentkezve!' }); }
  },

  removeUser: (req, res) => {
    if (req.user) {
      if (req.user.isAdmin === 'true') {
        User.findByIdAndRemove(req.params.id)
          .then(user => res.json(user))
          .catch(err => res.send(err));
      } else { res.json({ err: 'Művelet megtagadva' }); }
    } else { res.json({ err: 'Nincs bejelentkezve!' }); }
  },

};
