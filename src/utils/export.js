import * as XLSX from "xlsx";
const filename = (name, ext) =>
  `${name}_${new Date().toISOString().slice(0, 10)}.${ext}`;
export function exportExcel(name, rows) {
  const sheet = XLSX.utils.json_to_sheet(rows);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Data");
  XLSX.writeFile(book, filename(name, "xlsx"));
}
export function exportCsv(name, rows) {
  const sheet = XLSX.utils.json_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(sheet);
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename(name, "csv");
  link.click();
  URL.revokeObjectURL(url);
}
