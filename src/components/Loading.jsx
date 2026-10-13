export default function Loading({ error }) {
  return (
    <div className="panel p-8 text-center muted">
      {error
        ? "Unable to load data. Check the configured data source."
        : "Loading data..."}
    </div>
  );
}
