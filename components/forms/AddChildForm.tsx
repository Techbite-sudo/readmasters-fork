"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { addChild } from "@/lib/actions/children";

const addChildSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.number().min(1, "Age must be at least 1").max(18, "Age must be at most 18"),
    grade: z.string().min(1, "Grade is required"),
    school: z.string().min(1, "School is required"),
});

type AddChildInput = z.infer<typeof addChildSchema>;

export function AddChildForm() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AddChildInput>({
        resolver: zodResolver(addChildSchema),
        defaultValues: {
            name: "",
            age: undefined,
            grade: "",
            school: "",
        },
    });

    async function onSubmit(data: AddChildInput) {
        setIsLoading(true);
        const result = await addChild(data);
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
                description: "Child added successfully",
            });
            form.reset();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Grade</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>School</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Child"}
                </Button>
            </form>
        </Form>
    );
}