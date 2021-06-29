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
  contact: ({ firstName, lastName, adminEmail, email, content }) => {
    //
  }
}
