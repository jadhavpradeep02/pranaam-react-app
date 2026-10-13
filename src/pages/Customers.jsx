import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Loading from "../components/Loading";
import { useCustomers, useTrips } from "../services/hooks";
import { formatDate } from "../utils/format";
export default function Customers() {
  const c = useCustomers(),
    t = useTrips();
  const [status, setStatus] = useState("ALL"),
    [terminal, setTerminal] = useState("ALL");
  const rows = useMemo(() => {
    if (!c.data || !t.data) return [];
    return t.data
      .map((x) => ({
        ...x,
        customerName:
          c.data.find((y) => y.customerId === x.customerId)?.name || "—",
      }))
      .filter(
        (x) =>
          (status === "ALL" || x.status === status) &&
          (terminal === "ALL" || x.terminal === terminal),
      );
  }, [c.data, t.data, status, terminal]);
  if (c.isPending || t.isPending || c.isError || t.isError)
    return <Loading error={c.isError || t.isError} />;
  const cols = [
    {
      accessorKey: "tripId",
      header: "Trip ID",
      cell: ({ row }) => (
        <Link
          className="text-blue-700 font-semibold"
          to={`/customers/${row.original.tripId}`}
        >
          {row.original.tripId}
        </Link>
      ),
    },
    { accessorKey: "customerName", header: "Customer Name" },
    { accessorKey: "serviceType", header: "Service Type" },
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
      id: "action",
      header: "Actions",
      cell: ({ row }) => (
        <Link
          className="text-blue-700 font-semibold"
          to={`/customers/${row.original.tripId}`}
        >
          View
        </Link>
      ),
    },
  ];
  return (
    <>
      <PageHeader
        title="Customers & Trips"
        subtitle="View customer trip records (read-only)"
      />
      <DataTable
        data={rows}
        columns={cols}
        searchKeys={["tripId", "customerName", "flightNumber"]}
        filters={
          <>
            <select
              className="field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ALL">All statuses</option>
              {[
                "CONFIRMED",
                "PENDING_VALIDATION",
                "WAITLISTED",
                "CANCELLED",
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
