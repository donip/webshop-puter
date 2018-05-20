const User = require('../models/user');
/** @module User */
module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  /**
   * Új user regisztráció
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - visszaküld egy objektumot aminek van success tulajdonsága
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
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - sikeres belépés esetén visszaküld egy success tulajdonságú objektumot
   */
  login: (req, res) => res.json({
    success: 'Sikeres belépés',
  }),

  /**
   * Kilépés
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - sikeres kilépés esetén visszaküld egy success tulajdonságú objektumot
   */
  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },
};
