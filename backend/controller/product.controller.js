const Product = require('../models/product');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

/**
 * nevet átkonvertál használható formátúmuvá, úgy hogy a space-et kicseréli kötőjelre
 * a szöveget pedig átírja ékezet nélkülire
 * @param: namestr {string} konvertálandó név
 * @return: {string} konvertált string
 */
function nameConverter(namestr) {
  let name = namestr.toLocaleLowerCase();

  // cseretömb
  const hunChars = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    ö: 'o',
    ő: 'o',
    ü: 'u',
    ű: 'u',
  };
  //  ékezetes karaktert cserél
  name = name.replace(/[áéíúóöőüű]/g, c => hunChars[c]);
  // ami nem normál karakter az kidobja
  name = name.replace(/[^a-z0-9 -]/g, '');
  //  bármennyi space-t és kötőjelet egy kötőjellre cserél
  name = name.replace(/[ -]+/g, '-');
  return name;
}

module.exports = {
  /**
   * kilistáz minden terméket
   */
  list: (req, res) => {
    Product.find({})
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
  * id alapján megkeres egy terméket
  */
  find: (req, res) => {
    Product.findById(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
   * url sor alapján megkeres egy terméket
   */
  findByUrl: (req, res) => {
    Product.findOne({ producturl: req.params.producturl })
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
  /**
   * generál egy productot, a producturl-t és a imgurl generálja a productname-ből
   * csak admin jogosultsággal
   */
  create: (req, res) => {
    req.user = JSON.stringify(req.user);
    req.user = JSON.parse(req.user);
    if (req.user.isAdmin === 'true') {
      req.body.producturl = nameConverter(req.body.productname);
      req.body.imgurl = `img/${nameConverter(req.body.productname)}.jpg`;
      Product.create(req.body)
        .then(product => res.send(product))
        .catch(err => res.send(err));
    } else {
      res.send({ err: 'You are not an admin!' });
      // res.send({ err: 'You are not an admin!', data: req.user.isAdmin });
    }
  },
  /**
   * update-el egy productot az id alapján
   * csak admin jogosultsággal
   */
  update: (req, res) => {
    req.user = JSON.stringify(req.user);
    req.user = JSON.parse(req.user);
    if (req.user.isAdmin === 'true') {
      Product.findByIdAndUpdate(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(err => res.send(err));
    } else {
      res.send({ err: 'You are not an admin!' });
    }
  },
  /**
  * eltávolít egy productot az id alapján
  csak admin jogosultsággal
  */
  remove: (req, res) => {
    req.user = JSON.stringify(req.user);
    req.user = JSON.parse(req.user);
    if (req.user.isAdmin === 'true') {
      Product.findByIdAndRemove(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.send(err));
    } else {
      res.send({ err: 'You are not an admin!' });
    }
  },
};
