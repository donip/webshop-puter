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
  /**
   * Jelszómódosítás
   * Megváltoztatja a felhasználó jelszavát.
   * Feltétele, hogy a felhasználó be legyen jelentkezve, és helyesen adja meg a régi jelszót.
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @returns {Object} - sikeres jelszóváltoztatás esetén success tulajdonságú objektumot ad vissza, hiba esetén err tulajdonságú objektumot küld
   */
  changePass: (req, res) => {
    if (req.user) {
      if (req.user['_id'] == req.params.id) {
        User.findById(req.params.id).then((user) => {
          user.changePassword(req.body.password, req.body.newPassword, (passwordErr) => {
            if (passwordErr) {
              res.status(401).json({ err: 'Rossz jelszó' });
            } else {
              user.save();
              res.status(200).json({ success: 'Jelszó sikeresen megváltozott' });
            }
          });
        });
      } else { res.status(403).json({ err: 'Tiltott művelet' }); }
    } else { res.status(401).json({ err: 'Nincs bejelentkezve' }); }
  },
};
