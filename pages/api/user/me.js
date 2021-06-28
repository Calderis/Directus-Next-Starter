import { directus } from "/utils/directus";

export default async function handler(req, res) {
  await directus.auth.refresh();
  directus.users.me.update(req.body)
    .then(res.status(200).json)
    .catch(res.status(401).json);
}
