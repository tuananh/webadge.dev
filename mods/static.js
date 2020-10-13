import serveBadge from "../helpers/serve-badge";

const errBadge = { label: "static badge", status: "unknown", color: "grey" };
export default function handleStaticBadge(request) {
  const { pathname } = new URL(request.url);
  const parts = pathname.split("/");
  if (parts.length < 4 || parts.length > 5) {
    return serveBadge(errBadge);
  }
  const label = decodeURIComponent(parts[2]);
  const status = decodeURIComponent(parts[3]);
  const color = parts.length > 4 ? decodeURIComponent(parts[4]) : null;

  try {
    return serveBadge({ label, status, color });
  } catch (err) {
    console.log("error serving static badge", err.message);
    return serveBadge(errBadge);
  }
}
