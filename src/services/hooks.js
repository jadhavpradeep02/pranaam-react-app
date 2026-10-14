import { useQuery } from "@tanstack/react-query";
import { dataService } from "./dataService";
export const useCustomers = () =>
  useQuery({ queryKey: ["customers"], queryFn: dataService.customers });
export const useCustomerTrips = () =>
  useQuery({
    queryKey: ["customer-trips"],
    queryFn: dataService.customerTrips,
  });
export const useTrips = () =>
  useQuery({ queryKey: ["trips"], queryFn: dataService.trips });
export const useStaff = () =>
  useQuery({ queryKey: ["staff"], queryFn: dataService.staff });
export const useAllocations = () =>
  useQuery({ queryKey: ["allocations"], queryFn: dataService.allocations });
