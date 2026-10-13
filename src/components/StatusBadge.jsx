import { badgeClass } from "../utils/format";
export default function StatusBadge({ status }) {
  return (
    <span className={`pill ${badgeClass(status)}`}>
      {(status || "UNKNOWN").replaceAll("_", " ")}
    </span>
  );
}
