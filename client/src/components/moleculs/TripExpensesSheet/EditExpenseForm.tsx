import apiClient from "@/api/request";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const expenseSchema = z.object({
  amount: z.coerce.number().min(1),
  description: z.string().optional(),
  tripId: z.string().uuid(),
  category: z.enum(["FUEL", "TOLL", "MAINTENANCE", "MISC"]).default("FUEL"),
});

const expenseCategories = ["FUEL", "TOLL", "MAINTENANCE", "MISC"] as const;
const expenseCategoriesFrText = {
  FUEL: "Carburant",
  TOLL: "Peages",
  MAINTENANCE: "Entretien ou Reparation",
  MISC: "Divers",
};

const updateExpenseSchema = expenseSchema.partial();
export type ExpensePayload = z.infer<typeof updateExpenseSchema>;

interface IProps {
  payload?: ExpensePayload & { id?: string };
}
export const EditExpenseForm = ({ payload }: IProps) => {
  const id = payload?.id;
  const form = useForm({
    resolver: zodResolver(!!id ? updateExpenseSchema : expenseSchema),
    defaultValues: {
      amount: payload?.amount,
      description: payload?.description||undefined,
      tripId: payload?.tripId,
      category: payload?.category,
    },
    values: {
      amount: payload?.amount,
      description: payload?.description||undefined,
      tripId: payload?.tripId,
      category: payload?.category,
    }
  });
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ExpensePayload) => {
      if (!!id) return apiClient.patch(`/expenses/${id}`, data);
      return apiClient.post("/expenses", data);
    },
    onSuccess: async() => {
      form.reset();
      await client.invalidateQueries({ queryKey: ["expenses"] });
      await client.invalidateQueries({ queryKey: ["trips"] });
    },
  });
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selectionner un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {expenseCategoriesFrText[category]}
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
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
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
    </div>
  );
};
