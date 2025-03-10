import apiClient from "@/api/request";
import { EditTrip, tripTypeFrText } from "@/components/moleculs/EditTrip";
import { TripExpensesSheet } from "@/components/moleculs/TripExpensesSheet";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trip } from "@/types";
import { PaginatedResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export function TripsPage() {
  const [page, setPage] = useState(1);

  const fetchPage = (page: number) => {
    return apiClient.get<PaginatedResponse<Trip>>(
      `/trips?page=${page}&limit=10`
    );
  };
  const tripsQuery = useQuery({
    queryKey: ["trips", page],
    queryFn: () => fetchPage(page),
  });

  const totalPages = Math.ceil((tripsQuery.data?.meta.total ?? 0) / 10);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Liste des courses</h1>
        <EditTrip />
      </div>
      <Table>
        <TableHeader>
          <TableHead>Itineraire</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Chauffeur</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Total depenses(XAF)</TableHead>
          <TableHead>Date Depart</TableHead>
          <TableHead>Date Arrivee</TableHead>
          <TableHead>Depenses</TableHead>
          <TableHead>Editer</TableHead>
        </TableHeader>
        <TableBody>
          {tripsQuery.data?.data.map((trip) => {
            const totalExpenses = trip.expenses.reduce(
              (acc, expense) => acc + Number(expense.amount),
              0
            );
            return (
              <TableRow key={trip.id}>
                <TableCell>
                  <span className="font-bold text-xs">{trip.departure}</span>{" "}
                  vers <span className="font-bold text-xs">{trip.arrival}</span>
                </TableCell>
                <TableCell>
                  <small>{tripTypeFrText[trip.tripType]}</small>
                </TableCell>
                <TableCell>{trip.driver?.name}</TableCell>
                <TableCell>{trip.client?.name}</TableCell>
                <TableCell className="font-bold">
                  {totalExpenses.toLocaleString("fr-Fr")} FCFA
                </TableCell>
                <TableCell>
                  {trip.startTime
                    ? format(trip.startTime, "dd/MM/yyyy hh:mm")
                    : undefined}
                </TableCell>
                <TableCell>
                  {trip.endTime
                    ? format(trip.endTime, "dd/MM/yyyy hh:mm")
                    : undefined}
                </TableCell>
                <TableCell>
                  <TripExpensesSheet trip={trip} />
                </TableCell>
                <TableCell>
                  <EditTrip payload={trip} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-3 py-3 items-center pt-4">
        <span>{tripsQuery.data?.meta.total} courses</span>
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
  );
}
