import { ColumnDef } from "@tanstack/react-table"

//import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"

import { Transaction } from "./schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date" />
      )
    },
    cell: ({ row }) => {
      let date:String = row.getValue("date")
      date = date.split("T")[0].replace(/-/g, "/");

      return (
        <span>{date}</span>
      )
    },
    enableHiding: false
  },
  {
    accessorKey: "scheme",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scheme" />
    ),
    cell: ({ row }) => <span>{row.getValue("scheme")}</span>,
  },
  {
    accessorKey: "card",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Card" />
    ),
    cell: ({ row }) => <span>{row.getValue("card")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <span>{row.getValue("status")}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <span>{row.getValue("amount")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

