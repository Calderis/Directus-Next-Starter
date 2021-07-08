import { directus } from "/utils/directus";
import axios from "axios";

export default async function handler(req, res) {
  axios.post(`${process.env.API_URL}/auth/password/request`, {
    email: req.body.email,
    reset_url: `${process.env.NEXTAUTH_URL}/login/password-reset`
  })
    .then(data => res.status(200).json(data))
    .catch(res.status(401).json);
}
