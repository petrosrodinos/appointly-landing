"use client";

import { useState } from "react";
import { MessageCircle, Send, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateMessageLanding } from "@/features/chat/hooks/use-chat";
import { contactFormSchema, type ContactFormType } from "@/features/chat/validation-schemas/contact-form.schema";
import { toast } from "@/hooks/use-toast";
import { Account } from "@/features/account/interfaces/account.interfaces";

interface ChatBubbleProps {
  provider: Account;
}

export const ChatBubble = ({ provider }: ChatBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const { mutate: sendMessage, isPending } = useCreateMessageLanding();

  const { uuid, title } = provider;

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      content: "",
    },
  });

  const onSubmit = (data: ContactFormType) => {
    sendMessage(
      { ...data, provider_uuid: uuid },
      {
        onSuccess: () => {
          toast({
            title: "Message sent",
            description: "Your message has been sent successfully",
          });
          setMessageSent(true);
          form.reset();
        },
      }
    );
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setMessageSent(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Send us a message</SheetTitle>
          <SheetDescription>Fill out the form below and we'll get back to you as soon as possible.</SheetDescription>
        </SheetHeader>
        {messageSent && (
          <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Please check your email inbox to continue the discussion with <span className="font-semibold text-foreground">{title}</span> in a private chat when they reply.
            </p>
          </div>
        )}
        {!messageSent && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us how we can help you..." className="min-h-[120px] resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
};
