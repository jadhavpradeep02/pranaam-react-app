import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import Loading from "../components/Loading";
import { useCustomerTrips } from "../services/hooks";
import { formatDate } from "../utils/format";

export default function Customers() {
  const trips = useCustomerTrips();
  const [terminal, setTerminal] = useState("ALL");

  const rows = useMemo(() => {
    const data = trips.data?.data ?? [];
    return data.filter(
      (trip) => terminal === "ALL" || String(trip.terminal) === terminal,
    );
  }, [trips.data, terminal]);

  if (trips.isPending || trips.isError) {
    return <Loading error={trips.isError} />;
  }

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
    {
      accessorKey: "terminal",
      header: "Terminal",
      cell: ({ getValue }) => `T${String(getValue()).replace(/^T/, "")}`,
    },
    {
      accessorKey: "serviceDateTime",
      header: "Service Date & Time",
      cell: ({ getValue }) => formatDate(getValue()),
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
        searchKeys={["tripId", "customerName", "serviceType"]}
        filters={
          <select
            className="field"
            value={terminal}
            onChange={(e) => setTerminal(e.target.value)}
          >
            <option value="ALL">All terminals</option>
            <option value="1">T1</option>
            <option value="2">T2</option>
          </select>
        }
      />
    </>
  );
}
