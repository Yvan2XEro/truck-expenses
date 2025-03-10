import apiTrip from "@/api/request";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Client, Trip, User, Vehicle } from "@/types";
import { PaginatedResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { EditClient } from "../EditClient";

const createTripSchema = z.object({
  vehicleId: z.string().min(3, "Veuillez selectionner un vehicule"),
  driverId: z.string().min(3, "Veuillez selectionner un chauffeur"),
  clientId: z.string().min(3, "Veuillez selectionner un client"),
  departure: z.string().transform((v) => v.toUpperCase()),
  arrival: z.string().transform((v) => v.toUpperCase()),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
  tripType: z.enum(["LONG_DISTANCE", "SHUTTLE"]).default("LONG_DISTANCE"),
});

export const tripTypeFrText = {
  LONG_DISTANCE: "Longue distance",
  SHUTTLE: "Navette",
};
const updateTripSchema = createTripSchema.partial();

interface EditTripProps {
  payload?: Partial<Trip>;
}
export const EditTrip = ({ payload }: EditTripProps) => {
  const id = payload?.id;

  const form = useForm<z.infer<typeof updateTripSchema>>({
    resolver: zodResolver(!!id ? updateTripSchema : createTripSchema),
    defaultValues: {
      vehicleId: payload?.vehicleId,
      driverId: payload?.driverId,
      clientId: payload?.clientId,
      departure: payload?.departure,
      arrival: payload?.arrival,
      startTime: payload?.startTime,
      endTime: payload?.endTime,
      tripType: payload?.tripType,
    },
  });
  console.log(form.formState.errors);
  const [open, setOpen] = useState(false);

  const vehiclesQuery = useQuery({
    queryKey: ["vehicles", "all"],
    enabled: open,
    queryFn: () =>
      apiTrip
        .get<PaginatedResponse<Vehicle>>(`/vehicles?limit=-1`)
        .then((res) => res.data),
  });
  const clientsQuery = useQuery({
    queryKey: ["clients", "all"],
    enabled: open,
    queryFn: () =>
      apiTrip
        .get<PaginatedResponse<Client>>(`/clients?limit=-1`)
        .then((res) => res.data),
  });
  const dirversQuery = useQuery({
    queryKey: ["users", "drivers"],
    enabled: open,
    queryFn: () =>
      apiTrip
        .get<PaginatedResponse<User>>(`/users?limit=-1&role=DRIVER`)
        .then((res) => res.data),
  });

  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof updateTripSchema>) => {
      if (!!id) {
        return apiTrip.patch(`/trips/${id}`, data);
      }
      return apiTrip.post(`/trips`, data);
    },
    onSuccess: () => {
      toast.success("Operation reussie");
      form.reset();
      client.invalidateQueries({
        queryKey: ["trips"],
        enabled: open,
      });
      setOpen(false);
    },
    onError: (error: any) => {
      if (error.status === 422) {
        toast.error(error.errors.message);
        return;
      }
      toast.error("Une erreur est survenue");
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          {!!id ? "Modifier" : "Créer une course"}
        </Button>
      </SheetTrigger>
            <SheetContent className="px-3 h-[100vh] overflow-y-auto pb-8">
        <SheetHeader>
          <SheetTitle>
            {!!id ? "Modifier une course" : "Créer une course"}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              name="tripType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de deplacement</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectionner un vehicule" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LONG_DISTANCE">
                        {tripTypeFrText.LONG_DISTANCE}
                      </SelectItem>
                      <SelectItem value="SHUTTLE">
                        {tripTypeFrText.SHUTTLE}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depart</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arrival"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="driverId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chauffer</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectionner un chauffeur" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dirversQuery.data?.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="clientId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectionner un chauffeur" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clientsQuery.data?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <EditClient />
            <FormField
              name="vehicleId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicule</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectionner un vehicule" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehiclesQuery.data?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.model} | {item.brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de depart</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de depart</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "En cours..." : "Enregistrer"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
