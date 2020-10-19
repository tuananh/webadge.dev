import { badgen } from "badgen";
import icons from "simple-icons";

async function serveBadge(params, options) {
  Object.keys(options).forEach((key) => {
    switch (key) {
      case "list":
        params.status = params.status.replaceAll(
          ",",
          ` ${options.list || "|"} `
        );
        break;
      case "icon":
        const icon = icons.get(options.icon || params.subject);
        if (icon) {
          options.icon = `data:image/svg+xml;base64,${Buffer.from(
            icon.svg
          ).toString("base64")}`;
          options.iconWidth = parseInt(options.iconWidth || 13);
        } else {
          delete options.icon;
        }
        break;
      case "label":
        options.label = decodeURIComponent(options.label);
      default:
        if (!options[key]) delete options[key];
        break;
    }
  });

  return badgen({ ...params, ...options });
}

export default serveBadge;
