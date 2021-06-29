import { directus } from "/utils/directus";

export default async function handler(req, res) {
  switch (req.method) {
    default:
      directus.users.me.read()
        .then(data => res.status(200).json(data))
        .catch(res.status(404).json);
      break;
    case "POST":
      directus.users.me.update(req.body)
        .then(data => res.status(200).json(data))
        .catch(res.status(401).json);
      break;
  }
}
