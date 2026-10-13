import { Users, Plane, UserRound, ClipboardList } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";
import {
  useCustomers,
  useTrips,
  useStaff,
  useAllocations,
} from "../services/hooks";
const COLORS = ["#16a36c", "#3979f5", "#f59e0b", "#ef4444"];
function Stat({ icon: Icon, label, value, tone }) {
  return (
    <div className="panel p-5 flex gap-4 items-center">
      <div className={`rounded-xl p-3 ${tone}`}>
        <Icon size={21} />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs muted">{label}</p>
      </div>
    </div>
  );
}
function Donut({ title, data, total }) {
  return (
    <div className="panel p-5">
      <h2 className="font-bold text-sm">{title}</h2>
      <div className="h-56 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={83}
              paddingAngle={2}
            >
              {data.map((d, i) => (
                <Cell key={d.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <b className="text-2xl">{total}</b>
          <span className="text-xs muted">Total</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {data.map((d, i) => (
          <span key={d.name} className="text-xs muted">
            <span
              className="inline-block rounded-full w-2 h-2 mr-1"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            {d.name}: {d.value}
          </span>
        ))}
      </div>
    </div>
  );
}
export default function Dashboard() {
  const c = useCustomers(),
    t = useTrips(),
    s = useStaff(),
    a = useAllocations();
  if ([c, t, s, a].some((q) => q.isPending || q.isError))
    return <Loading error={[c, t, s, a].some((q) => q.isError)} />;
  const trips = t.data,
    staff = s.data;
  const tripStats = [
    "CONFIRMED",
    "PENDING_VALIDATION",
    "WAITLISTED",
    "CANCELLED",
  ].map((x) => ({
    name: x.replace("_", " "),
    value: trips.filter((t) => t.status === x).length,
  }));
  const gro = staff.filter((x) => x.role === "GRO");
  const groStats = ["AVAILABLE", "ON_SERVICE", "ON_LEAVE"].map((x) => ({
    name: x.replace("_", " "),
    value: gro.filter((g) => g.availability === x).length,
  }));
  const terminals = ["T1", "T2"].map((x) => ({
    name: x,
    trips: trips.filter((t) => t.terminal === x).length,
  }));
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of customers, trips, resources and allocations"
      />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <Stat
          icon={Users}
          label="Total Customers"
          value={c.data.length}
          tone="bg-blue-100 text-blue-600"
        />
        <Stat
          icon={Plane}
          label="Total Trips"
          value={trips.length}
          tone="bg-emerald-100 text-emerald-600"
        />
        <Stat
          icon={UserRound}
          label="GROs"
          value={gro.length}
          tone="bg-violet-100 text-violet-600"
        />
        <Stat
          icon={ClipboardList}
          label="GRLs"
          value={staff.filter((x) => x.role === "GRL").length}
          tone="bg-amber-100 text-amber-600"
        />
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <Donut title="Trip Status" data={tripStats} total={trips.length} />
        <Donut title="GRO Availability" data={groStats} total={gro.length} />
        <div className="panel p-5">
          <h2 className="font-bold text-sm mb-4">Trips by Terminal</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={terminals}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="trips" fill="#377df6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs muted mt-3">
            {a.data.length} recorded GRO assignments
          </p>
        </div>
      </div>
    </>
  );
}
