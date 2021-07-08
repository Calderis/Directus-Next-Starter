import { directus } from "/utils/directus";
import axios from "axios";

export default async function handler(req, res) {
  axios.post(`${process.env.API_URL}/auth/password/reset`, {
    password: req.body.password,
    token: req.body.token
  })
    .then(data => res.status(200).json(data))
    .catch(res.status(401).json);
}
