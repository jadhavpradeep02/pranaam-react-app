import {
  Users,
  UserRound,
  ClipboardList,
  FileSpreadsheet,
  Download,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";
import {
  useCustomers,
  useTrips,
  useStaff,
  useAllocations,
} from "../services/hooks";
import { exportCsv, exportExcel } from "../utils/export";
function ReportCard({ title, description, Icon, rows, name }) {
  return (
    <div className="panel p-6 text-center flex flex-col items-center">
      <div className="bg-blue-100 text-blue-600 rounded-xl p-4 mb-4">
        <Icon size={26} />
      </div>
      <h2 className="font-bold">{title}</h2>
      <p className="muted text-sm my-3 flex-1">{description}</p>
      <p className="text-xs muted mb-4">{rows.length} records</p>
      <div className="w-full space-y-2">
        <button className="btn w-full" onClick={() => exportCsv(name, rows)}>
          <Download size={15} />
          Download CSV
        </button>
        <button className="btn w-full" onClick={() => exportExcel(name, rows)}>
          <FileSpreadsheet size={15} />
          Download Excel
        </button>
      </div>
    </div>
  );
}
export default function Reports() {
  const c = useCustomers(),
    t = useTrips(),
    s = useStaff(),
    a = useAllocations();
  if ([c, t, s, a].some((x) => x.isPending || x.isError))
    return <Loading error={[c, t, s, a].some((x) => x.isError)} />;
  const customers = t.data.map((trip) => {
    const cust = c.data.find((x) => x.customerId === trip.customerId);
    return {
      trip_id: trip.tripId,
      customer_reference: cust?.customerReference,
      customer_name: cust?.name,
      service_type: trip.serviceType,
      terminal: trip.terminal,
      flight_number: trip.flightNumber,
      service_start_at: trip.serviceStartAt,
      service_end_at: trip.serviceEndAt,
      status: trip.status,
      vip_requested: trip.vip,
    };
  });
  const staff = s.data.map((x) => ({
    staff_id: x.employeeCode,
    name: x.name,
    role: x.role,
    terminal: x.terminal,
    availability: x.availability,
    skills: x.skills.join("; "),
    languages: x.languages.join("; "),
    certifications: x.certifications.join("; "),
    airport_authorizations: x.authorizedAirports.join("; "),
    workload: x.workload,
  }));
  const allocations = a.data.map((x) => {
    const trip = t.data.find((t) => t.tripId === x.tripId),
      cust = c.data.find((c) => c.customerId === trip?.customerId),
      gro = s.data.find((s) => s.staffId === x.groStaffId);
    return {
      trip_id: x.tripId,
      customer_name: cust?.name,
      gro_id: gro?.employeeCode,
      gro_name: gro?.name,
      terminal: trip?.terminal,
      assignment_status: x.status,
      assigned_at: x.assignedAt,
    };
  });
  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Download existing records in CSV or Excel format"
      />
      <div className="grid md:grid-cols-3 gap-5">
        <ReportCard
          title="Customers & Trips"
          description="Export customer and trip information."
          Icon={Users}
          rows={customers}
          name="customers_trips"
        />
        <ReportCard
          title="GRO / GRL"
          description="Export staff profiles, languages, skills and availability."
          Icon={UserRound}
          rows={staff}
          name="gro_grl"
        />
        <ReportCard
          title="Customer to GRO Allocations"
          description="Export recorded customer-to-GRO assignments."
          Icon={ClipboardList}
          rows={allocations}
          name="customer_gro_allocations"
        />
      </div>
      <p className="text-xs muted mt-5">
        Exports reflect the currently loaded mock data. Assignment exports are
        empty until allocation records are supplied.
      </p>
    </>
  );
}
