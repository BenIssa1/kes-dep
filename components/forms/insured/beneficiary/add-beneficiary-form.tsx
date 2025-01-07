"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Beneficiary } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  createdAt: z.date({
    required_error: "La date de naissance est requise",
  }).optional(),
  percentage: z
    .number()
    .min(1, "La part doit être supérieure à 0")
    .max(100, "La part ne peut pas dépasser 100%"),
  cni: z.string().min(2, "Le CNI doit contenir au moins 2 caractères"),
  birthday: z.date({
    required_error: "La date de naissance est requise",
  }),
});

type AddBeneficiaryFormProps = {
  onSuccess: (beneficiary: Beneficiary) => void;
};

export function AddBeneficiaryForm({ onSuccess }: AddBeneficiaryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      percentage: 100,
    },
  });

  function handleSubmit() {
    const values = form.getValues();
    values.createdAt = new Date()
    if (
      values.cni &&
      values.birthday &&
      values.fullName &&
      values.percentage
    ) {
      onSuccess(values);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="col-span-full flex gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex-[2]">
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Date de naissance</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>JJ/MM/AAAA</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-full flex gap-4">
          <FormField
            control={form.control}
            name="percentage"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Part (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cni"
            render={({ field }) => (
              <FormItem className="flex-[2]">
                <FormLabel>CNI</FormLabel>
                <FormControl>
                  <Input placeholder="EX: CI003558164" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="button" className="mt-8 col-span-full" onClick={handleSubmit}>
          Ajouter
        </Button>
      </div>
    </Form>
  );
}
