import { directus } from "/utils/directus";

export default async function handler(req, res) {
  // Get first user (that should be admin)
  directus.users.readMany({ limit: 1 })
    .then(({ data }) => res.status(200).json({
      email: data[0].email
    }))
    .catch(res.status(404).json);
}
