import { directus } from "/utils/directus";
import { send } from "/utils/server/mail";

export default async function handler(req, res) {
  // Get first user (that should be admin)
  send({
    from: req.body.email,
    to: process.env.CONTACT_EMAIL,
    subject: `Contact form: ${req.body.firstName} ${req.body.lastName}`,
    text: req.body.message
  })
    .then(() => res.status(200).json())
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    })
}
