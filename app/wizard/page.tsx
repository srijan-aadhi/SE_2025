import { CurrencyComboBox } from "@/components/CurrencyComboBox"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

export default async function Page() {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4 py-8">
      <h1 className="text-center text-3xl">
        Welcome, <span className="ml-2 font-bold">{user.firstName} 👋</span>
      </h1>

      <h2 className="mt-4 text-center text-base text-muted-foreground">
        Let&apos;s get started by setting up your currency
      </h2>

      <h3 className="mt-2 text-center text-sm text-muted-foreground">
        You can change these settings at any time
      </h3>

      <Separator className="my-4" />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your default currency for transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>

      <Separator className="my-4" />

      <Button className="w-full" asChild>
        <Link href="/">I&apos;m done! Take me to the dashboard</Link>
      </Button>

      <div className="mt-8">
        <Logo />
      </div>
    </div>
  )
}
