import { directus } from "/utils/directus";

export default async function handler(req, res) {
  directus.users.createOne(req.body)
    .then(data => res.status(200).json(data))
    .catch(res.status(401).json);
}
