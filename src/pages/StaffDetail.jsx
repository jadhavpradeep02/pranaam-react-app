import { Link, useParams } from "react-router-dom";
import { ArrowLeft, UserRound } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import Loading from "../components/Loading";
import { useStaff } from "../services/hooks";
function Tags({ title, values }) {
  return (
    <div className="panel p-5">
      <h2 className="font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {values.length ? (
          values.map((x) => (
            <span className="pill pill-blue" key={x}>
              {x}
            </span>
          ))
        ) : (
          <span className="text-xs muted">None recorded</span>
        )}
      </div>
    </div>
  );
}
export default function StaffDetail() {
  const { staffId } = useParams();
  const q = useStaff();
  if (q.isPending || q.isError) return <Loading error={q.isError} />;
  const staff = q.data.find((x) => String(x.staffId) === staffId);
  if (!staff) return <div className="panel p-8">Staff member not found.</div>;
  return (
    <>
      <Link
        to="/staff"
        className="flex items-center gap-2 text-sm text-blue-700 mb-5"
      >
        <ArrowLeft size={16} />
        Back to GRO / GRL
      </Link>
      <div className="flex gap-3 items-center mb-6 flex-wrap">
        <h1 className="page-title">
          {staff.employeeCode} – {staff.name}
        </h1>
        <StatusBadge status={staff.availability} />
      </div>
      <div className="panel p-6 mb-5 flex gap-5 items-start flex-wrap">
        <div className="bg-blue-100 text-blue-700 p-5 rounded-xl">
          <UserRound size={36} />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{staff.name}</h2>
          <p className="text-sm muted">
            {staff.role} · {staff.employeeCode}
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
            <div>
              <span className="muted">Current terminal:</span> {staff.terminal}
            </div>
            <div>
              <span className="muted">Current location:</span> {staff.location}
            </div>
            <div>
              <span className="muted">Workload snapshot:</span> {staff.workload}{" "}
              active services
            </div>
            <div>
              <span className="muted">Airport authorization:</span>{" "}
              {staff.authorizedAirports.join(", ")}
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        <Tags title="Skills" values={staff.skills} />
        <Tags title="Languages" values={staff.languages} />
        <Tags title="Certifications" values={staff.certifications} />
      </div>
    </>
  );
}
