import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Cleave from 'cleave.js/react';

import { cn } from "@/lib/utils"
import { Checkbox } from "./ui/checkbox"
import { Card, cardSchema } from "@/components/card-table/schema"
import { z } from "zod"
import { useToast } from "./ui/use-toast"

type AddCardDialogProps = {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};


export function AddCardDialog({ cards, setCards }: AddCardDialogProps) {

  const {toast} = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (formData.get('terms') !== 'on') {
      toast({
          title: "Terms not accepted",
          description: "You must accept the terms and conditions.",
        })
      return;
    }

    const cardNumber = formData.get('cardNumber') as string;
    const firstNumbers = cardNumber.slice(0, 6); 
    const lastNumbers = cardNumber.slice(-4);   

    const expiryDate = formData.get('expiryDate') as string;
    const [expMonth, expYear] = expiryDate.split('/').map(Number);

    const currentTime = new Date().toISOString();

    const newCard = {
      accountId: "mock-account-id",
      countryCode: String(formData.get('countryOfIssue')) || "UNK",
      created: currentTime,
      expDate: `20${expYear}-${String(expMonth).padStart(2, '0')}-28T23:59:59.999Z`,
      expMonth,
      expYear,
      firstNumbers,
      id: (cards.length + 1).toString(),
      lastNumbers,
      live: false,
      scheme: "visa",
      type: "visa", 
      updated: currentTime,
      verificationMethod: "MICROCHARGE",
      verificationStatus: "unverified"
    };

    const result = cardSchema.safeParse(newCard);

    if (!result.success) {
      toast({
          title: "Invalid Card Data",
          description: "Use Sensible Mock Data.",
        })
      return
    }


    setCards([...cards, newCard]);
    toast({
        title: "Card Added",
        description: "Successfully added mock card.",
      })
    e.currentTarget.reset();
  };



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Card</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Card</DialogTitle>
            <DialogDescription>
              Mock Card subscription process for manual additions.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-600">
              Card Number
            </Label>
            <Cleave
              name="cardNumber"
              id="cardNumber"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              placeholder="Enter your card number"
              min={16}
              options={{ creditCard: true }}
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-600">
                  Expiry Date
                </Label>
                <Cleave
                  name="expiryDate"
                  id="expiry"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="MM/YY"
                  options={{ date: true, datePattern: ['m', 'y'] }}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-600">
                  Country of Issue
                </Label>
                <Select defaultValue={"GBR"} name="countryOfIssue">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SA">Saudi Arabia</SelectItem>
                    <SelectItem value="AE">United Arab Emirates</SelectItem>
                    <SelectItem value="BH">Bahrain</SelectItem>
                    <SelectItem value="KW">Kuwait</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="GBR">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <Checkbox name="terms" id="terms" />
            <h6 className="text-xs text-gray-600">By entering your card details and confirming, you grant our platform the right to analyze and relay transaction specifics (such as purchase amount, vendor, and timestamp) to our Payment Data Provider. This aids in optimizing expense tracking. Some transaction data might be disclosed to relevant partners in accordance with our User Agreement and Privacy Policy. All actions adhere to stringent privacy guidelines to ensure your data&apos;s safety. Remember, you can disable this tracking feature anytime via your profile settings</h6>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="submit">Add Mock Card</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


