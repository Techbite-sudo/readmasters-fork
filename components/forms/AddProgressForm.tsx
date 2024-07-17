"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { addProgress } from "@/lib/actions/progress";

const addProgressSchema = z.object({
    bookId: z.string().min(1, "Book is required"),
    pagesRead: z.number().min(1, "Pages read must be at least 1"),
});

type AddProgressInput = z.infer<typeof addProgressSchema>;

export function AddProgressForm({ childId }: { childId: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AddProgressInput>({
        resolver: zodResolver(addProgressSchema),
        defaultValues: {
            bookId: "",
            pagesRead: undefined,
        },
    });

    async function onSubmit(data: AddProgressInput) {
        setIsLoading(true);
        const result = await addProgress({ ...data, childId });
        setIsLoading(false);

        if (result.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        } else {
            toast({
                title: "Success",
                description: "Progress added successfully",
            });
            form.reset();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="bookId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Book</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pagesRead"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pages Read</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Progress"}
                </Button>
            </form>
        </Form>
    );
}