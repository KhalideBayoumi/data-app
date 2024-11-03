"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@prisma/client";
import DataTableColumnHeader from '@/app/(protected)/_components/datatable/data-table-column-header';
import { ExtendedUser } from "@/next-auth";
import { updateUserRole } from "@/actions/update-role";
import DataTableRowActions, { Action, SubMenuAction } from "../_components/datatable/data-table-row-actions";

export const columns: ColumnDef<ExtendedUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="font-normal">
          {row.getValue("email")}
        </Badge>
      );
    }
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as UserRole;
      return role === UserRole.ADMIN ? (
        <Badge variant="destructive">Admin</Badge>
      ) : (
        <Badge variant="secondary">User</Badge>
      );
    }
  },
  {
    accessorKey: "isTwoFactorEnabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="2FA" />
    ),
    cell: ({ row }) => {
      const is2FAEnabled = row.getValue("isTwoFactorEnabled") as boolean;
      return (
        <Badge variant={is2FAEnabled ? "default" : "secondary"}>
          {is2FAEnabled ? "Enabled" : "Disabled"}
        </Badge>
      );
    }
  },
  {
    accessorKey: "isOAuth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="OAuth" />
    ),
    cell: ({ row }) => {
      const isOAuth = row.getValue("isOAuth") as boolean;
      return (
        <Badge variant={isOAuth ? "default" : "secondary"}>
          {isOAuth ? "Yes" : "No"}
        </Badge>
      );
    }
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("emailVerified") as Date | null;
      return date ? new Date(date).toLocaleString() : 'Not verified';
    }
  },
  {
    accessorKey: "lastSignIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Sign In" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("lastSignIn") as Date | null;
      return date ? new Date(date).toLocaleString() : 'Never';
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      const actions: Action<ExtendedUser>[] = [
        {
          label: "View details",
          onClick: (row) => console.log("View details", row),
        },
        {
          label: "Delete user",
          onClick: (row) => console.log("Delete user", row),
        }
      ];

      const roleSubMenu: SubMenuAction<ExtendedUser> = {
        label: "Change role",
        options: [
          { label: "Admin", value: UserRole.ADMIN },
          { label: "User", value: UserRole.USER }
        ],
        onSelect: async (value, row) => {
          try {
            const result = await updateUserRole(row.id, value as UserRole);
            if (result?.success) {
              console.log(result.success);
              window.location.reload();
            } else {
              console.log(result?.error || "Failed to update role");
            }
          } catch (error) {
            console.error("An error occurred while updating role:", error);
          }
        },
        getCurrentValue: (row) => row.role
      };

      return (
        <DataTableRowActions 
          row={row} 
          actions={actions}
          subMenuAction={roleSubMenu}
        />
      );
    }
  }
];

export const roleFilter = {
  column: "role",
  title: "Role",
  options: [
    {
      label: "Admin",
      value: UserRole.ADMIN,
    },
    {
      label: "User",
      value: UserRole.USER,
    },
  ],
};