import {
  useDocumentStore,
  useDriverStore,
  useExpenseStore,
  useInvoiceStore,
  useTransactionStore,
  useTripStore,
  useVehicleStore,
} from "@/store";
import {
  AlertTriangleIcon,
  BarChart3Icon,
  CarIcon,
  ClipboardListIcon,
  CreditCardIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";
import { useEffect } from "react";

export function DashboardPage() {
  // Initialize stores
  const { fetchVehicles, vehicles } = useVehicleStore();
  const { fetchDrivers, drivers } = useDriverStore();
  const { fetchTrips, trips, getActiveTrips, getPlannedTrips } = useTripStore();
  const { fetchExpenses, getTotalExpensesByCategory } = useExpenseStore();
  const { fetchTransactions, getTotalPendingAmount } = useTransactionStore();
  const { fetchInvoices, invoices, getTotalUnpaidAmount } = useInvoiceStore();
  const { fetchDocuments, getExpiringDocuments, getExpiredDocuments } =
    useDocumentStore();

  // Fetch data on component mount
  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
    fetchTrips();
    fetchExpenses();
    fetchTransactions();
    fetchInvoices();
    fetchDocuments();
  }, [
    fetchVehicles,
    fetchDrivers,
    fetchTrips,
    fetchExpenses,
    fetchTransactions,
    fetchInvoices,
    fetchDocuments,
  ]);

  // Calculate statistics
  const activeTrips = getActiveTrips();
  const plannedTrips = getPlannedTrips();
  const availableVehicles = vehicles.filter((v) => v.status === "available");
  const totalFuelExpenses = getTotalExpensesByCategory("fuel");
  const pendingTransactions = getTotalPendingAmount();
  const unpaidInvoices = getTotalUnpaidAmount();
  const expiringDocuments = getExpiringDocuments(30);
  const expiredDocuments = getExpiredDocuments();

  // Dashboard cards data
  const cards = [
    {
      title: "Véhicules",
      value: vehicles.length,
      subValue: `${availableVehicles.length} Disponibles`,
      icon: <CarIcon className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Chauffeurs",
      value: drivers.length,
      subValue: "Nombre total de chauffeurs",
      icon: <UserIcon className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Voyages actifs",
      value: activeTrips.length,
      subValue: `${plannedTrips.length} Planifiés`,
      icon: <ClipboardListIcon className="h-5 w-5" />,
      color: "bg-purple-500",
    },
    {
      title: "Dépenses de carburant",
      value: `${totalFuelExpenses.toLocaleString()} XAF`,
      subValue: "Total des dépenses de carburant",
      icon: <CreditCardIcon className="h-5 w-5" />,
      color: "bg-yellow-500",
    },
    {
      title: "Bonus en attente",
      value: `${pendingTransactions.toLocaleString()} XAF`,
      subValue: "Bonus des chauffeurs",
      icon: <BarChart3Icon className="h-5 w-5" />,
      color: "bg-indigo-500",
    },
    {
      title: "Factures impayées",
      value: `${unpaidInvoices.toLocaleString()} XAF`,
      subValue: `${
        invoices.filter((i) => i.status !== "paid").length
      } Factures`,
      icon: <FileTextIcon className="h-5 w-5" />,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble des opérations de transport
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.subValue}</p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${card.color} text-white`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="mb-4 flex items-center">
          <AlertTriangleIcon className="mr-2 h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">Alertes & Notifications</h2>
        </div>

        <div className="space-y-3">
          {expiredDocuments.length > 0 && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <p className="font-medium">
                {expiredDocuments.length} document(s) expiré(s)
              </p>
              <ul className="mt-1 list-inside list-disc">
                {expiredDocuments.slice(0, 3).map((doc) => (
                  <li key={doc.id}>
                    {doc.type.replace("_", " ")} pour le véhicule{" "}
                    {vehicles.find((v) => v.id === doc.vehicleId)?.licensePlate}
                  </li>
                ))}
                {expiredDocuments.length > 3 && (
                  <li>Et {expiredDocuments.length - 3} de plus...</li>
                )}
              </ul>
            </div>
          )}

          {expiringDocuments.length > 0 && (
            <div className="rounded-md bg-yellow-500/10 p-3 text-sm text-yellow-700">
              <p className="font-medium">
                {expiringDocuments.length} document(s) expirant bientôt
              </p>
              <ul className="mt-1 list-inside list-disc">
                {expiringDocuments.slice(0, 3).map((doc) => (
                  <li key={doc.id}>
                    {doc.type.replace("_", " ")} pour le véhicule{" "}
                    {vehicles.find((v) => v.id === doc.vehicleId)?.licensePlate}{" "}
                    expire le {new Date(doc.expiryDate).toLocaleDateString()}
                  </li>
                ))}
                {expiringDocuments.length > 3 && (
                  <li>Et {expiringDocuments.length - 3} de plus...</li>
                )}
              </ul>
            </div>
          )}

          {activeTrips.length > 0 && (
            <div className="rounded-md bg-blue-500/10 p-3 text-sm text-blue-700">
              <p className="font-medium">
                {activeTrips.length} trajet(s) en cours
              </p>
              <ul className="mt-1 list-inside list-disc">
                {activeTrips.slice(0, 3).map((trip) => (
                  <li key={trip.id}>
                    {trip.departureLocation} vers {trip.destinationLocation}{" "}
                    avec le véhicule{" "}
                    {
                      vehicles.find((v) => v.id === trip.vehicleId)
                        ?.licensePlate
                    }
                  </li>
                ))}
                {activeTrips.length > 3 && (
                  <li>Et {activeTrips.length - 3} de plus...</li>
                )}
              </ul>
            </div>
          )}

          {plannedTrips.length > 0 && (
            <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-700">
              <p className="font-medium">
                {plannedTrips.length} trajet(s) prévu(s)
              </p>
              <ul className="mt-1 list-inside list-disc">
                {plannedTrips.slice(0, 3).map((trip) => (
                  <li key={trip.id}>
                    {trip.departureLocation} vers {trip.destinationLocation} le{" "}
                    {new Date(trip.departureDate).toLocaleDateString()}
                  </li>
                ))}
                {plannedTrips.length > 3 && (
                  <li>Et {plannedTrips.length - 3} de plus...</li>
                )}
              </ul>
            </div>
          )}

          {expiredDocuments.length === 0 &&
            expiringDocuments.length === 0 &&
            activeTrips.length === 0 &&
            plannedTrips.length === 0 && (
              <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                <p>Aucune alerte pour le moment.</p>
              </div>
            )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Activité récente</h2>

        <div className="space-y-4">
          {trips.slice(0, 5).map((trip) => {
            const vehicle = vehicles.find((v) => v.id === trip.vehicleId);
            const driver = drivers.find((d) => d.id === trip.driverId);

            return (
              <div
                key={trip.id}
                className="flex items-start gap-3 rounded-md border p-3"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    trip.status === "completed"
                      ? "bg-green-500"
                      : trip.status === "in_progress"
                      ? "bg-blue-500"
                      : trip.status === "planned"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  } text-white`}
                >
                  <ClipboardListIcon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {trip.departureLocation} vers {trip.destinationLocation}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {vehicle?.licensePlate} •{" "}
                    {driver?.userId
                      ? "Chauffeur : " +
                        drivers.find((d) => d.id === trip.driverId)?.id
                      : "Aucun chauffeur assigné"}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <span
                      className={`rounded-full px-2 py-0.5 ${
                        trip.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : trip.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : trip.status === "planned"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {trip.status.replace("_", " ")}
                    </span>
                    <span>
                      {new Date(trip.departureDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {trips.length === 0 && (
            <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
              <p>Aucune activité récente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
