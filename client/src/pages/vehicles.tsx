import apiClient from "@/api/request";
import { EditVehicle } from "@/components/moleculs/EditVehicle";
import { VehicleDocuments } from "@/components/moleculs/VehicleDocuments";
import { VehicleSkeleton } from "@/components/moleculs/VehicleSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDocumentStore } from "@/store";
import { Vehicle, VehicleStatus } from "@/types";
import { PaginatedResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangleIcon,
  ArrowLeft,
  ArrowRight,
  CarIcon,
  PlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const typeToFreeText = {
  LOG_TRUCK: "Camion à grumes",
  FLATBED: "Camion plat",
};
export function VehiclesPage() {
  const {
    fetchDocuments,
    getExpiringDocuments,
    getExpiredDocuments,
  } = useDocumentStore();

  const [page, setPage] = useState(1);

  const fetchPage = (page: number) => {
    return apiClient.get<PaginatedResponse<Vehicle>>(
      `/vehicles?page=${page}&limit=10`
    );
  };
  const vehiclesQuery = useQuery({
    queryKey: ["vehicles", page],
    queryFn: () => fetchPage(page),
  });

  const totalPages = Math.ceil((vehiclesQuery.data?.meta.total ?? 0) / 10);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "ON_TRIP":
        return "bg-blue-100 text-blue-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      case "OUT_OF_SERVICE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const hasDocumentIssues = (vehicle: Vehicle) => {
    return vehicle.documents.some(
      (doc) =>
        doc.status === "INVALID" ||
        (doc.expiryDate && new Date(doc.expiryDate) < new Date())
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Véhicules</h1>
          <p className="text-muted-foreground">
            Gérez votre flotte de véhicules
          </p>
        </div>
        <EditVehicle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border bg-card shadow-sm col-span-2">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Aperçu de la flotte</h2>
          </div>
          <div className="divide-y">
            {vehiclesQuery.isLoading && (
              <div className="">
                {Array.from({ length: 10 }).map((_, i) => (
                  <VehicleSkeleton key={i} />
                ))}
              </div>
            )}
            {vehiclesQuery.data?.data?.map((vehicle) => (
              <div key={vehicle.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{vehicle.licensePlate}</h3>
                        {hasDocumentIssues(vehicle) && (
                          <AlertTriangleIcon className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.model} | {vehicle.brand}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                            vehicle.status
                          )}`}
                        >
                          {vehicle.status}
                        </span>
                        <Badge
                          variant={
                            vehicle.type === "FLATBED" ? "outline" : "default"
                          }
                        >
                          {typeToFreeText[vehicle.type]}
                        </Badge>
                        <span className="text-xs">
                          {vehicle.documents.length} pièce(s)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <VehicleDocuments vehicle={vehicle} />
                    <EditVehicle payload={vehicle} />
                  </div>
                </div>
              </div>
            ))}

            {vehiclesQuery.data?.data.length === 0 && (
              <div className="p-8 text-center">
                <CarIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-2 text-lg font-medium">
                  Aucun véhicule trouvé
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ajoutez un nouveau véhicule à votre flotte.
                </p>
                <Button className="mt-4">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Ajouter un véhicule
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-3 py-3 items-center pt-4">
            <span>{vehiclesQuery.data?.meta.total} véhicules</span>
            <Button
              disabled={page === 1}
              size="icon"
              variant="outline"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              <ArrowLeft />
            </Button>
            <span>
              Page {page} sur {totalPages}
            </span>
            <Button
              size="icon"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-4 flex items-center">
            <AlertTriangleIcon className="mr-2 h-5 w-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Document Alerts</h2>
          </div>

          <div className="space-y-3">
            {getExpiredDocuments().length > 0 && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <p className="font-medium">
                  {getExpiredDocuments().length} document(s) expired
                </p>
                <ul className="mt-1 list-inside list-disc">
                  {getExpiredDocuments()
                    .slice(0, 3)
                    .map((doc) => (
                      <li key={doc.id}>
                        {doc.documentType?.replace("_", " ")} for vehicle{" "}
                        {
                          vehiclesQuery.data?.data.find(
                            (v) => v.id === doc.vehicleId
                          )?.licensePlate
                        }
                      </li>
                    ))}
                  {getExpiredDocuments().length > 3 && (
                    <li>And {getExpiredDocuments().length - 3} more...</li>
                  )}
                </ul>
              </div>
            )}

            {getExpiringDocuments(30).length > 0 && (
              <div className="rounded-md bg-yellow-500/10 p-3 text-sm text-yellow-700">
                <p className="font-medium">
                  {getExpiringDocuments(30).length} document(s) expiring soon
                </p>
                <ul className="mt-1 list-inside list-disc">
                  {getExpiringDocuments(30)
                    .slice(0, 3)
                    .map((doc) => (
                      <li key={doc.id}>
                        {doc.documentType?.replace("_", " ")} for vehicle{" "}
                        {
                          vehiclesQuery.data?.data.find(
                            (v) => v.id === doc.vehicleId
                          )?.licensePlate
                        }{" "}
                        expires on{" "}
                        {new Date(doc.expiryDate).toLocaleDateString()}
                      </li>
                    ))}
                  {getExpiringDocuments(30).length > 3 && (
                    <li>And {getExpiringDocuments(30).length - 3} more...</li>
                  )}
                </ul>
              </div>
            )}

            {getExpiredDocuments().length === 0 &&
              getExpiringDocuments(30).length === 0 && (
                <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                  <p>No document alerts at the moment.</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
