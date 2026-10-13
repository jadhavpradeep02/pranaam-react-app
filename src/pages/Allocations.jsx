import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Loading from "../components/Loading";
import {
  useAllocations,
  useTrips,
  useCustomers,
  useStaff,
} from "../services/hooks";
import { formatDate } from "../utils/format";
export default function Allocations() {
  const a = useAllocations(),
    t = useTrips(),
    c = useCustomers(),
    s = useStaff();
  const [status, setStatus] = useState("ALL"),
    [terminal, setTerminal] = useState("ALL");
  const rows = useMemo(() => {
    if (!a.data || !t.data || !c.data || !s.data) return [];
    return a.data
      .map((x) => {
        const trip = t.data.find((t) => t.tripId === x.tripId),
          cust = c.data.find((c) => c.customerId === trip?.customerId),
          staff = s.data.find((s) => s.staffId === x.groStaffId);
        return {
          ...x,
          customerName: cust?.name || "—",
          groName: staff?.name || "—",
          groCode: staff?.employeeCode || "—",
          terminal: trip?.terminal || "—",
          serviceStartAt: trip?.serviceStartAt,
        };
      })
      .filter(
        (x) =>
          (status === "ALL" || x.status === status) &&
          (terminal === "ALL" || x.terminal === terminal),
      );
  }, [a.data, t.data, c.data, s.data, status, terminal]);
  if ([a, t, c, s].some((x) => x.isPending || x.isError))
    return <Loading error={[a, t, c, s].some((x) => x.isError)} />;
  const cols = [
    {
      accessorKey: "tripId",
      header: "Trip ID",
      cell: ({ getValue }) => (
        <Link
          className="text-blue-700 font-semibold"
          to={`/customers/${getValue()}`}
        >
          {getValue()}
        </Link>
      ),
    },
    { accessorKey: "customerName", header: "Customer Name" },
    {
      accessorKey: "groName",
      header: "Assigned GRO",
      cell: ({ row }) => (
        <span>
          {row.original.groName}{" "}
          <span className="muted">({row.original.groCode})</span>
        </span>
      ),
    },
    { accessorKey: "terminal", header: "Terminal" },
    {
      accessorKey: "serviceStartAt",
      header: "Service Date & Time",
      cell: ({ getValue }) => formatDate(getValue()),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    },
    {
      accessorKey: "assignedAt",
      header: "Assigned At",
      cell: ({ getValue }) => formatDate(getValue()),
    },
  ];
  return (
    <>
      <PageHeader
        title="Customer to GRO Allocation"
        subtitle="All allocations · read-only assignment records"
      />
      <DataTable
        data={rows}
        columns={cols}
        searchKeys={["tripId", "customerName", "groName", "groCode"]}
        empty="No GRO assignments yet. The database assignment table starts empty."
        filters={
          <>
            <select
              className="field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ALL">All statuses</option>
              {[
                "ASSIGNED",
                "ACCEPTED",
                "RELEASED",
                "CANCELLED",
                "COMPLETED",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
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
          </>
        }
      />
    </>
  );
}
