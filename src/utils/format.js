export const formatDate = (s) =>
  s
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date(s))
    : "—";
export const badgeClass = (s) =>
  ["AVAILABLE", "CONFIRMED", "ASSIGNED", "ACCEPTED"].includes(s)
    ? "pill-green"
    : ["ON_LEAVE", "CANCELLED", "RELEASED"].includes(s)
      ? "pill-red"
      : ["ON_SERVICE", "PENDING_VALIDATION", "WAITLISTED"].includes(s)
        ? "pill-amber"
        : "pill-blue";
