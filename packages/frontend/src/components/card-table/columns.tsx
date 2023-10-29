import { ColumnDef } from "@tanstack/react-table"

//import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"

import { Card } from "./schema"
import { DataTableColumnHeader } from "./cards-table-column-header"
import { DataTableRowActions } from "./cards-table-row-actions"

export const cardColumns: ColumnDef<Card>[] = [
  {
    accessorKey: "lastNumbers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Card" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("lastNumbers")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "scheme",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scheme" />
    ),
    cell: ({ row }) => <span>{row.getValue("scheme")}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Card ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "expDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiry date" />
    ),
    cell: ({ row }) => <span>{new Date(row.getValue("expDate")).toISOString().split("T")[0].replace(/-/g, "/").slice(0,7)}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Added" />
    ),
        cell: ({ row }) => {
      let date:String = row.getValue("created")
      date = date.split("T")[0].replace(/-/g, "/");

      return (
        <span>{date}</span>
      )
    },

    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];



