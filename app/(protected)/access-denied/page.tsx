import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AccessDenied() {
  return (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle>Access Denied</CardTitle>
        <CardDescription>You do not have permission to access this page.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Please contact an administrator if you think this is an error.</p>
      </CardContent>
    </Card>
  );
}