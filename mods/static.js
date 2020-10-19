import badgen from "../helpers/badge";

const errBadge = { label: "static badge", status: "unknown", color: "grey" };
export default function handleStaticBadge({ label, status, color }, options) {
  try {
    return badgen(
      {
        label: decodeURIComponent(label),
        status: decodeURIComponent(status),
        color: decodeURIComponent(color),
      },
      options
    );
  } catch (err) {
    console.log("error serving static badge", err.message);
    return badgen(errBadge);
  }
}
