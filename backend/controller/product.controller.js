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
   */
  create: (req, res) => {
    req.body.producturl = nameConverter(req.body.productname);
    req.body.imgurl = `img/${nameConverter(req.body.productname)}.jpg`;
    Product.create(req.body)
      .then(product => res.send(product))
      .catch(err => res.send(err));
  },
  /**
   * update-el egy productot az id alapján
   */
  update: (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
/**
 * eltávolít egy productot az id alapján
 */
  remove: (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then(product => res.json(product))
      .catch(err => res.send(err));
  },
};
