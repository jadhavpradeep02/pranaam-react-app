import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Loading from "../components/Loading";
import { useStaff } from "../services/hooks";
export default function Staff() {
  const q = useStaff();
  const [role, setRole] = useState("ALL"),
    [terminal, setTerminal] = useState("ALL"),
    [status, setStatus] = useState("ALL");
  if (q.isPending || q.isError) return <Loading error={q.isError} />;
  const rows = q.data.filter(
    (x) =>
      (role === "ALL" || x.role === role) &&
      (terminal === "ALL" || x.terminal === terminal) &&
      (status === "ALL" || x.availability === status),
  );
  const cols = [
    {
      accessorKey: "employeeCode",
      header: "Staff ID",
      cell: ({ row }) => (
        <Link
          to={`/staff/${row.original.staffId}`}
          className="font-semibold text-blue-700"
        >
          {row.original.employeeCode}
        </Link>
      ),
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "terminal", header: "Terminal" },
    {
      id: "languages",
      header: "Languages",
      cell: ({ row }) => row.original.languages.join(", "),
    },
    {
      id: "skills",
      header: "Key Skills",
      cell: ({ row }) => row.original.skills.join(", "),
    },
    {
      accessorKey: "availability",
      header: "Status",
      cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    },
    {
      id: "action",
      header: "Actions",
      cell: ({ row }) => (
        <Link
          to={`/staff/${row.original.staffId}`}
          className="text-blue-700 font-semibold"
        >
          View
        </Link>
      ),
    },
  ];
  return (
    <>
      <PageHeader
        title="GRO / GRL"
        subtitle="View ground resource profiles, qualifications and availability"
      />
      <DataTable
        data={rows}
        columns={cols}
        searchKeys={["employeeCode", "name", "role"]}
        filters={
          <>
            <select
              className="field"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="ALL">All roles</option>
              <option>GRO</option>
              <option>GRL</option>
            </select>
            <select
              className="field"
              value={terminal}
              onChange={(e) => setTerminal(e.target.value)}
            >
              <option value="ALL">All terminals</option>
              <option>T1</option>
              <option>T2</option>
            </select>
            <select
              className="field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ALL">All statuses</option>
              <option value="AVAILABLE">Available</option>
              <option value="ON_SERVICE">On service</option>
              <option value="ON_LEAVE">On leave</option>
            </select>
          </>
        }
      />
    </>
  );
}
