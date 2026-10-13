import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import Loading from "../components/Loading";
import { useCustomers, useTrips } from "../services/hooks";
import { formatDate } from "../utils/format";
function Info({ title, items }) {
  return (
    <section className="panel p-6">
      <h2 className="font-bold mb-5">{title}</h2>
      <dl className="space-y-4">
        {items.map(([k, v]) => (
          <div className="grid grid-cols-2 gap-4 text-sm" key={k}>
            <dt className="muted">{k}</dt>
            <dd className="font-medium break-words">{v ?? "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
export default function CustomerDetail() {
  const { tripId } = useParams();
  const t = useTrips(),
    c = useCustomers();
  if (t.isPending || c.isPending || t.isError || c.isError)
    return <Loading error={t.isError || c.isError} />;
  const trip = t.data.find((x) => x.tripId === tripId);
  if (!trip)
    return (
      <div className="panel p-8">
        Trip not found.{" "}
        <Link to="/customers" className="text-blue-600">
          Back to list
        </Link>
      </div>
    );
  const customer = c.data.find((x) => x.customerId === trip.customerId);
  return (
    <>
      <Link
        to="/customers"
        className="flex items-center gap-2 text-sm text-blue-700 mb-5"
      >
        <ArrowLeft size={16} />
        Back to Customers & Trips
      </Link>
      <div className="flex gap-3 items-center mb-6 flex-wrap">
        <h1 className="page-title">{trip.tripId}</h1>
        <StatusBadge status={trip.status} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Info
          title="Customer Information"
          items={[
            ["Customer reference", customer?.customerReference],
            ["Customer name", customer?.name],
            ["Preferred language", trip.language],
            ["VIP requested", trip.vip ? "Yes" : "No"],
          ]}
        />
        <Info
          title="Trip Information"
          items={[
            ["Trip ID", trip.tripId],
            ["Service type", trip.serviceType],
            ["Flight number", trip.flightNumber],
            ["Movement", trip.movementType],
            ["Terminal", trip.terminal],
            ["Service start", formatDate(trip.serviceStartAt)],
            ["Service end", formatDate(trip.serviceEndAt)],
            ["Passenger count", trip.passengers],
            ["Status", trip.status],
          ]}
        />
      </div>
      <p className="text-xs muted mt-5">
        This overview displays fields available in the mock dataset; contact
        details are not fabricated.
      </p>
    </>
  );
}
