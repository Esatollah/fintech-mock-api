import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { cardSchema } from "./schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = cardSchema.parse(row.original)

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <SheetTrigger className="w-full">
            <DropdownMenuItem>
              Show raw data
            </DropdownMenuItem> </SheetTrigger>
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent className="md:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Transaction Data</SheetTitle>
        </SheetHeader>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
          <code>
            {JSON.stringify(task, null, 2)}
          </code>
        </pre>
      </SheetContent>
    </Sheet>
  )
}
