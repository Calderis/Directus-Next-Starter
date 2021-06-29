import { directus } from "/utils/directus";

export default async function handler(req, res) {
  directus.settings.readMany()
    .then(({ data }) => {
      res.status(200).json({
        name: data.project_name || "Project",
        logo: data.project_logo ? `${process.env.API_URL}/assets/${data.project_logo}` : "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",
        color: data.project_color,
        customCSS: data.custom_css,
        url: data.project_url
      });
    })
    .catch(res.status(404).json);
}
