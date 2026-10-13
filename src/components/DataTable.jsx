import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ArrowUpDown, Search } from "lucide-react";
export default function DataTable({
  data = [],
  columns = [],
  searchKeys = [],
  filters = null,
  empty = "No records found",
}) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const filtered = useMemo(
    () =>
      data.filter(
        (row) =>
          !search ||
          searchKeys.some((k) =>
            String(row[k] ?? "")
              .toLowerCase()
              .includes(search.toLowerCase()),
          ),
      ),
    [data, search, searchKeys],
  );
  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });
  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap gap-3 p-4 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-3 text-slate-400" />
          <input
            className="field w-full pl-9"
            placeholder="Search records..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              table.setPageIndex(0);
            }}
          />
        </div>
        {filters}
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            {table.getHeaderGroups().map((g) => (
              <tr key={g.id}>
                {g.headers.map((h) => (
                  <th key={h.id}>
                    <button
                      className="flex items-center gap-1"
                      onClick={h.column.getToggleSortingHandler()}
                      disabled={!h.column.getCanSort()}
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {h.column.getCanSort() && <ArrowUpDown size={12} />}
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((r) => (
                <tr key={r.id}>
                  {r.getVisibleCells().map((c) => (
                    <td key={c.id}>
                      {flexRender(c.column.columnDef.cell, c.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 muted"
                >
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3 text-xs muted flex-wrap">
        <span>
          Showing{" "}
          {filtered.length
            ? table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              1
            : 0}
          –
          {Math.min(
            filtered.length,
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
          )}{" "}
          of {filtered.length}
        </span>
        <div className="flex items-center gap-2">
          <select
            className="field py-1"
            value={pageSize}
            onChange={(e) => {
              const n = Number(e.target.value);
              setPageSize(n);
              table.setPageSize(n);
            }}
          >
            <option value="8">8 / page</option>
            <option value="15">15 / page</option>
            <option value="30">30 / page</option>
          </select>
          <button
            className="btn p-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={14} />
          </button>
          <span>
            {table.getState().pagination.pageIndex + 1} /{" "}
            {table.getPageCount() || 1}
          </span>
          <button
            className="btn p-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
