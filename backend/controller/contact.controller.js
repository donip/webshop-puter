const Contact = require('../models/contact');
/** @module Contact */
module.exports = {
  /**
   * Új contact regisztráció
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @return {Object} - visszaküld egy objektumot aminek van success tulajdonsága
   */
  register: (req, res) => {
    console.log(req.body);
    Contact.register(new Contact({
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    }), req.body.password)
      .then(() => res.json({
        success: 'Sikeres regisztráció',
      }))
      .catch(err => res.send(err));
  },
/*
  app.post('/send', (req, res) => {
    const output = `
    <p>incoming message from a client</p>
    <p>Email: ${req.body.email}</p>
    <p>Email: ${req.body.message}</p>
    `;
    console.log(req.body);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pjutoersmitt@gmail.com',
        pass: 'kiafaszagyerek'
      }
    });
    
    var mailOptions = {
      from: 'youremail@gmail.com',// X-Google-Original-From:
      to: 'pjutoersmitt@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was not easy!',
      html: output
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.render('contact', {msg: 'Email has been sent'});
      }
    }); 
});
*/
};
