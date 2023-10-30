import Image from 'next/image'
import { Inter } from 'next/font/google'
import TeamSwitcher from '@/components/team-switcher'


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Transaction, transactionSchema } from '@/components/transaction-table/schema'
import { z } from 'zod'
import { columns } from '@/components/transaction-table/columns'
import { cardColumns } from '@/components/card-table/columns'
import MainNav from "@/components/main-nav"
//import { Overview } from "@/components/overview"

//import { RecentSales } from "@/components/recent-sales"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { DataTable } from '@/components/transaction-table'
import data from '@/components/transaction-table/data'
import { data as cardData } from '@/components/card-table/data'
import { useState } from 'react'
import { Card as CardType, cardSchema } from '@/components/card-table/schema'
import { CardTable } from '@/components/card-table'
import { AddCardDialog } from '@/components/add-card'

function getTransactions() {
  return z.array(transactionSchema).parse(data)
}

function getCards() {
  return z.array(cardSchema).parse(cardData);
}
const currentDate = "10/27/2023, 5:59:23 PM"

export default function Home() {

  const [transactions, setStransactions] = useState<Transaction[]>(getTransactions())
  const [cards, setCards] = useState<CardType[]>(getCards());


  return (
    < >
      <div className="flex-col md:flex">
        <div className="hidden md:block border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button>Export Data</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Users
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cards registered</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +6% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  API Status
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">OK</div>
                <p className="text-xs text-muted-foreground">
                  checked at {currentDate}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Bill
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$206.81</div>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Transactions</TabsTrigger>
              <TabsTrigger value="cards">
                Cards
              </TabsTrigger>
              <TabsTrigger value="webhooks" disabled >
                Webhooks
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <DataTable data={transactions} columns={columns} />
            </TabsContent>
            <TabsContent value="cards">
          <div className="flex items-center justify-between space-y-2 my-2">
            <h2 className="text-3xl font-bold tracking-tight">Registered Cards</h2>
            <div className="flex items-center space-x-2">
              <AddCardDialog cards={cards} setCards={setCards}/>
            </div>
          </div>
              <CardTable data={cards} columns={cardColumns} />
            </TabsContent>
            <TabsContent value="webhooks">
              Users and Businesses have the ability to set Webhooks to their server endpoints.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
