const nodemailer = require("nodemailer");

// See : https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

module.exports = {
  send: ({ from, to, subject, text }) =>
    new Promise((resolve, reject) => {
      transporter.sendMail({ from, to, subject, text }, function(err, data) {
        if (err) {
          console.error(err);
          reject(Error("Error while sending email."));
        } else resolve(true);
      });
    })
}
