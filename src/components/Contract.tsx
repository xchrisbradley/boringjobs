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
import { useState } from "react";

const formSchema = z.object({
  greeting: z.string().min(2).max(50),
})

type ContractProps = {
  name: string;
  value: any;
  action: any
}

export function ContractReadOnly({ name, value }: ContractProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{value}</p>
    </div>
  )
}

export function Contract({ name, value, action }: ContractProps) {
  const [tx, setTx] = useState(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      greeting: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const txHash = await greeterContract.write.setGreeting([values[name]])
    // console.log(txHash)
    // setTx(txHash)
    console.log(values)
  }



  // lazy load account
  // const wallet = smartAccountClient

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
                <Input placeholder={value} {...field} />
              </FormControl>
              {tx && <FormDescription>Transaction: {tx}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    // <pre>
    //   {JSON.stringify(result, null, 2)}
    // </pre>
  );
}