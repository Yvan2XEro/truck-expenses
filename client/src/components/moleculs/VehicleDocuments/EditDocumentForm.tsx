import apiClient from "@/api/request";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
    Form,
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
import { Document } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const typesFrechText: Record<Document["documentType"], string> = {
  ACF: "ACF",
  BLUE_CARD: "Carte bleue",
  INSURANCE: "Assurance",
  LICENSE: "Permis",
  TECHNICAL_VISIT: "Visite technique",
};

const docSchema = z.object({
  //   issueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  //     message: "La date d'obtention doit être au format YYYY-MM-DD",
  //   }),
  expiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La date d'expiration doit être au format YYYY-MM-DD",
  }),
  vehicleId: z.string(),
  documentType: z.enum([
    "ACF",
    "BLUE_CARD",
    "INSURANCE",
    "LICENSE",
    "TECHNICAL_VISIT",
  ]),
  status: z.enum(["VALID", "INVALID"]).default("VALID"),
});

interface IProps {
  data: Partial<Document> & {
    documentType: Document["documentType"];
    vehicleId: string;
  };
}
export const EditDocumentForm = ({ data }: IProps) => {
  const form = useForm<z.infer<typeof docSchema>>({
    defaultValues: {
      ...data,
      //   issueDate: data.issueDate ? data.issueDate.split("T")[0] : "",
      expiryDate: data.expiryDate ? data.expiryDate.split("T")[0] : "",
      status: data.status || "VALID",
    },
    resolver: zodResolver(docSchema),
  });
  console.log(form.formState.errors);
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: z.infer<typeof docSchema>) => {
      if (!data.id) {
        return apiClient.post<Document>("/documents", payload);
      }
      return apiClient.patch<Document>(`/documents/${data.id}`, payload);
    },
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["vehicles"] });
      toast.success(data.id ? "Document modifié" : "Document créé");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return apiClient.delete(`/documents/${data.id}`);
    },
    onSuccess: () => {
      client.refetchQueries({ queryKey: ["vehicles"] });
      toast.success("Document supprimé");
    },
  });
  return (
    <Card className="p-3">
      <CardTitle className="uppercase">
        {typesFrechText[data.documentType]}
      </CardTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          {/* <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date d'obtension</FormLabel>
                <Input type="date" {...field} />
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date d'expiration</FormLabel>
                <Input type="date" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue className="min-w-full" placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VALID">Valide</SelectItem>
                    <SelectItem value="INVALID">Invalide</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-3">
            {data.id && (
              <Button
                disabled={deleteMutation.isPending}
                variant="destructive"
                type="button"
                onClick={() => deleteMutation.mutate()}
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
              </Button>
            )}
            <Button disabled={mutation.isPending} type="submit">
              {mutation.isPending ? "En cours..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
