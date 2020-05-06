'use strict';
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  pool: true,
  service: 'gmail',
  auth: {
    user: 'siteguilhermepintto@gmail.com',
    pass: 't5y^u7i*'
  }
});

exports.emailSender = functions.https.onRequest((req, res) => {

  cors(req, res, () => {
    let email = {
      from: req.body['from'],
      to: req.body['to'],
      subject: req.body['subject'],
      html: req.body['html']
    };

    transporter.sendMail(email, (error, info) => {
        if (error) {
          return console.error('Error.', error);
        }
        transporter.close();
        return console.info('Success!', info.messageId, info.response );
    });
  });
});
