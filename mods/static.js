import { badgen } from "badgen";

const errBadge = { label: "static badge", status: "unknown", color: "grey" };
export default function handleStaticBadge({ label, status, color }) {
  try {
    return badgen({ label, status, color });
  } catch (err) {
    console.log("error serving static badge", err.message);
    return badgen(errBadge);
  }
}
