import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const LicenseForm = () => {
  const form = useForm({
    defaultValues: {
      subscriptionType: "Trial",
      geographyCoverage: "World",
      dailyCompanyView: "Unlimited",
      dailyDataDownload: "Unlimited"
    }
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField 
          control={form.control}
          name="subscriptionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of subscription</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  disabled={true}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="geographyCoverage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Geography Coverage</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  disabled={true}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="dailyCompanyView"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Company View</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  disabled={true}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="dailyDataDownload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Data Download</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  disabled={true}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default LicenseForm;