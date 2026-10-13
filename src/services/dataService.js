import mock from "../data/mock.json";
import { apiClient } from "./apiClient";
const useMock = () => import.meta.env.VITE_DATA_SOURCE !== "api";
const read = async (key, path) => {
  if (useMock()) return structuredClone(mock[key]);
  const { data } = await apiClient.get(path);
  return data;
};
export const dataService = {
  customers: () => read("customers", "/customers"),
  trips: () => read("trips", "/trips"),
  staff: () => read("staff", "/staff"),
  allocations: () => read("allocations", "/allocations"),
};
// Endpoint paths above are integration placeholders. Configure them to match your future backend.
