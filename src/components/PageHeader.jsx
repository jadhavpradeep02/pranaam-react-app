export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="page-title">{title}</h1>
      <p className="muted text-sm mt-1">{subtitle}</p>
    </div>
  );
}
