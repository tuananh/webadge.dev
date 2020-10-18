import { badgen } from "badgen";

async function serveBadge(badge, options) {
  Object.keys(options).forEach((key) => {
    switch (key) {
      case "label":
        options.label = decodeURIComponent(options.label);
      default:
        if (!options[key]) delete options[key];
        break;
    }
  });

  return badgen({ ...badge, ...options });
}

export default serveBadge;
