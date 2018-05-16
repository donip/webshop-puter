const User = require('../models/user');

/** @module UserAdmin */

module.exports = {
  /**
   * Kilistázza a usereket
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Array} - visszaküld egy tömböt amiben benne vannak a userek tulajdonságai objektumként
   */
  listUsers: (req, res) => {
    User.find({})
      .then(user => res.json(user))
      .catch(err => res.send(err));
  },
  /**
   * Módosít egy usert mongo _id alapján.
   * Leellenőrzi, hogy van a usernek isAdmin==='true' tulajdonsága csak akkor engedi a módosítást
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - visszaküldi a módosított user régi adatait
   */
  editUser: (req, res) => {
    if (req.user.isAdmin === 'true') {
      User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => res.send(err));
    }
  },
  /**
   * Töröl egy usert Mongo _id alapján.
   * Leellenőrzi, hogy van a usernek isAdmin==='true' tulajdonsága csak akkor engedi a törlést
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - visszaküldi a törölt user adatait
   */
  removeUser: (req, res) => {
    if (req.user.isAdmin === 'true') {
      User.findByIdAndRemove(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.send(err));
    }
  },

};
