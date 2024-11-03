import DataTable from '@/app/(protected)/_components/datatable/data-table';
import { columns, roleFilter } from './columns';
import {
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllUsers } from "@/data/user";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
                    <DataTable
                        columns={columns}
                        data={dbUsers || []}
                        filterColumn="name"
                        facetedFilters={[roleFilter]}
                        filterPlaceholder="Filter by name..."
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        defaultSorting={[{ id: "name", desc: false }]}
                    />
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
    );
}
  
export default AdminPage;