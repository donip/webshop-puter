/*
const nodemailer = require('nodemailer');

module.exports = {
  sendClientMsg: (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pjutoersmitt@gmail.com',
        pass: 'kiafaszagyerek',
      },
    });
    const mailOptions = {
      from: 'youremail@gmail.com', // X-Google-Original-From:
      to: 'pjutoersmitt@gmail.com',
      subject: `Ügyfél észrevétel From: ${req.body.email}`,
      text: req.body.coreMsg,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        res.json({ success: `Email sent: ${info.response}` });
      }
    });
  },
};
*/
