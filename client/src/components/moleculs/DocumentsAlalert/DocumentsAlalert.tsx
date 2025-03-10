import { useDocumentStore } from "@/store";
import { AlertTriangleIcon } from "lucide-react";
import React from "react";

const DocumentsAlalert = () => {
      const {
        getExpiringDocuments,
        getExpiredDocuments,
      } = useDocumentStore();
  return (
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
                    expires on {new Date(doc.expiryDate).toLocaleDateString()}
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
  );
};

export default DocumentsAlalert;
