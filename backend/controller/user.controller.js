const User = require('../models/user');

module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  /**
   * Új user regisztráció
   * @param {object} req - c
   * @param {object} res - c
   */
  register: (req, res) => {
    User.register(new User({
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    }), req.body.password)
      .then(() => res.json({
        success: 'Sikeres regisztráció',
      }))
      .catch(err => res.send(err));
  },

  /**
   * Belépés
   */
  login: (req, res) => res.json({
    success: 'Sikeres belépés',
  }),

  /**
   * Kilépés
   */
  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },
};
