import { directus } from "/utils/directus";

const colors = {
  gray: "#6B7280",
  red: "#EF4444",
  yellow: "#F59E0B",
  green: "#10B981",
  blue: "#3B82F6",
  indigo: "#6366F1",
  purple: "#8B5CF6",
  pink: "#EC4899"
};

export default async function handler(req, res) {
  const nearestHumanColor = require("nearest-human-color").from(colors);

  directus.settings.readMany()
    .then(({ data }) => {
      const themeColor = nearestHumanColor(data.project_color).name;

      res.status(200).json({
        name: data.project_name || "Project",
        logo: data.project_logo ? `${process.env.API_URL}/assets/${data.project_logo}` : `https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg`,
        color: data.project_color,
        themeColor,
        customCSS: data.custom_css,
        url: data.project_url
      });
    })
    .catch(res.status(404).json);
}
