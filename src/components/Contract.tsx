"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons"
import Link from "next/link";

const formSchema = z.object({
  owner: z.string().min(2).max(50),
})

type ContractProps = {
  name: string;
  value: any;
  address: string;
  abi: any;
  func: any;
  action: any
}

export function Contract({ name, value, action, address, abi, func }: ContractProps) {
  const [tx, setTx] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const tx = await action(
      address,
      abi,
      func,
      values[name as keyof typeof values]
    );
    setTx(tx)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={name as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{name}</FormLabel>
              <FormControl>
                <Input placeholder={value} {...field} disabled={isLoading} />
              </FormControl>
              {tx && (
                <FormDescription>
                  <Link href={`https://sepolia.basescan.org/tx/${tx}`} target="_blank">View transaction</Link>
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (<Button type="submit">Submit</Button>)}
      </form>
    </Form>
  );
}