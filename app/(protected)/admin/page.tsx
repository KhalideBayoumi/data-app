import {
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { getAllUsers } from "@/data/user";
import { UserRole } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { RegisterForm } from "@/components/auth/register-form";

const AdminPage = async () => {
    const dbUsers = await getAllUsers();
    
    return (
        <div className="hidden p-10 pb-16 px-40 md:block">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Administration</h2>
            <p className="text-muted-foreground">
            Manage your users and their informations
            </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0">
            <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Users</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create an account</DialogTitle>
                            <DialogDescription>
                                Add user information. Click create when finished.
                            </DialogDescription>
                        </DialogHeader>
                        <RegisterForm />
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardContent className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Verified at</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dbUsers && dbUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.email}</Badge>
                                </TableCell>
                                <TableCell>
                                    {user.role === UserRole.ADMIN ? (
                                        <Badge variant="destructive">Admin</Badge>
                                    ) : (
                                        <Badge variant="secondary">User</Badge>
                                    )}
                                </TableCell>
                                <TableCell>{user.emailVerified ? new Date(user.emailVerified).toLocaleString('fr-FR') : 'Not verified'}</TableCell>
                                <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="shadow-lg">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                                        <DropdownMenuItem>Delete user</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
    )
}

export default AdminPage;