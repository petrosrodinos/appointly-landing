"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Mail, Loader2, Bot } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateMessageLanding, useGetMessagesLanding } from "@/features/chat/hooks/use-chat";
import { contactFormSchema, type ContactFormType } from "@/features/chat/validation-schemas/contact-form.schema";
import { Account } from "@/features/account/interfaces/account.interfaces";
import { ChatMessage, ChatMessageTypes, ConfirmationMessageChannels, ConfirmationMessageChannel } from "@/features/chat/interfaces/chat.interfaces";
import { useClientStore } from "@/stores";

interface ChatBubbleProps {
  provider: Account;
}

export const ChatBubble = ({ provider }: ChatBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showSpeakToProviderPrompt, setShowSpeakToProviderPrompt] = useState(false);
  const [showChannelSelection, setShowChannelSelection] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>(ConfirmationMessageChannels.EMAIL);
  const [newMessage, setNewMessage] = useState("");
  const [selectedSpeakToProvider, setSelectedSpeakToProvider] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending } = useCreateMessageLanding();
  const client = useClientStore((state) => state.client);
  const setClient = useClientStore((state) => state.setClient);

  const { uuid } = provider;

  const {
    data: messagesData,
    refetch: refetchMessages,
    isLoading: isLoadingMessages,
  } = useGetMessagesLanding({
    provider_uuid: uuid,
    client_uuid: client?.uuid || "",
    include_messages: true,
    enabled: isOpen,
  });

  const messages = messagesData?.messages ? [...messagesData.messages].reverse() : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && !showSpeakToProviderPrompt && !showChannelSelection && !messageSent) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.type === ChatMessageTypes.AUTO_RESPONSE) {
        setShowSpeakToProviderPrompt(true);
      }
    }
  }, [messages]);

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: client?.first_name || "",
      last_name: client?.last_name || "",
      email: client?.email || "",
      phone: client?.phone || "",
      content: "",
      confirmation_message_channel: ConfirmationMessageChannels.EMAIL,
    },
  });

  const onSubmit = (data: ContactFormType) => {
    const payload: any = {
      provider_uuid: uuid,
      content: data.content,
      human_chat: false,
    };

    if (client?.uuid) {
      payload.client_uuid = client.uuid;
    } else {
      payload.first_name = data.first_name;
      payload.last_name = data.last_name;
      payload.email = data.email;
      payload.phone = data.phone;
    }

    sendMessage(payload, {
      onSuccess: (response) => {
        setClient(response.client);
        form.reset({
          first_name: response.client?.first_name || "",
          last_name: response.client?.last_name || "",
          email: response.client?.email || "",
          phone: response.client?.phone || "",
          content: "",
          confirmation_message_channel: ConfirmationMessageChannels.EMAIL,
        });
      },
    });
  };

  const handleContactProvider = () => {
    const payload: any = {
      provider_uuid: uuid,
      client_uuid: client?.uuid,
      content: "I would like to speak to the provider directly.",
      human_chat: true,
      confirmation_message_channel: selectedChannel,
    };

    sendMessage(payload, {
      onSuccess: () => {
        setMessageSent(true);
        setShowChannelSelection(false);
        refetchMessages();
      },
    });
  };

  const handleSendNewMessage = () => {
    if (!newMessage.trim() || !client?.uuid) return;

    const payload: any = {
      provider_uuid: uuid,
      client_uuid: client.uuid,
      content: newMessage,
      human_chat: false,
    };

    sendMessage(payload, {
      onSuccess: () => {
        setNewMessage("");
        refetchMessages();
      },
    });
  };

  const handleSpeakToProvider = (value: boolean) => {
    setSelectedSpeakToProvider(value);
    if (value) {
      setShowChannelSelection(true);
    } else {
      setShowChannelSelection(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setMessageSent(false);
      setShowSpeakToProviderPrompt(false);
      setShowChannelSelection(false);
      setNewMessage("");
      setSelectedSpeakToProvider(null);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle>{hasMessages ? "Chat" : "Send us a message"}</SheetTitle>
          <SheetDescription>{hasMessages ? "Continue our conversation" : "Fill out the form below and we'll get back to you as soon as possible."}</SheetDescription>
        </SheetHeader>

        {isLoadingMessages && client?.uuid && (
          <div className="flex-1 overflow-y-auto space-y-4 py-4 px-6">
            <div className="flex justify-start">
              <Skeleton className="h-12 w-48" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-12 w-48 bg-primary/20" />
            </div>
            <div className="flex justify-start">
              <Skeleton className="h-12 w-64" />
            </div>
          </div>
        )}

        {hasMessages && !messageSent && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto space-y-4 px-6 py-4 min-h-0">
              {messages.map((message: ChatMessage) => {
                const isClientMessage = message.sender_uuid === client?.uuid;
                const isProviderMessage = message.sender_uuid === provider.uuid;
                return (
                  <div key={message.uuid} className={`flex ${isClientMessage ? "justify-end" : "justify-start"} items-end gap-2`}>
                    {isProviderMessage && (
                      <div className="flex-shrink-0">
                        {message.type === ChatMessageTypes.AUTO_RESPONSE ? (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-primary" />
                          </div>
                        ) : (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.sender?.logo?.url} alt={provider.title} />
                            <AvatarFallback className="text-xs">
                              {provider.first_name[0]}
                              {provider.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-lg p-3 ${isClientMessage ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                );
              })}
              {showSpeakToProviderPrompt && (
                <div className="border-t pt-4 space-y-3">
                  <p className="text-sm font-medium">Do you want to speak to {provider.title} directly?</p>
                  <div className="flex gap-2">
                    <Button onClick={() => handleSpeakToProvider(true)} size="sm" variant={selectedSpeakToProvider === true ? "default" : "outline"}>
                      Yes
                    </Button>
                    <Button onClick={() => handleSpeakToProvider(false)} size="sm" variant={selectedSpeakToProvider === false ? "default" : "outline"}>
                      No
                    </Button>
                  </div>
                </div>
              )}
              {showChannelSelection && (
                <div className="border-t pt-4 space-y-3">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Select where you want to receive a confirmation message to continue our discussion in a private chat.</Label>
                    <RadioGroup onValueChange={setSelectedChannel} defaultValue={selectedChannel} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={ConfirmationMessageChannels.EMAIL} id="email" />
                        <Label htmlFor="email" className="font-normal cursor-pointer">
                          Send me an email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={ConfirmationMessageChannels.SMS} id="sms" />
                        <Label htmlFor="sms" className="font-normal cursor-pointer">
                          Send me an SMS
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button onClick={handleContactProvider} disabled={isPending} className="w-full">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Contact Provider"
                    )}
                  </Button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {client?.uuid && (
              <div className="border-t px-6 py-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendNewMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendNewMessage} disabled={isPending || !newMessage.trim()} size="icon">
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {messageSent && (
          <div className="px-6 py-4 space-y-4">
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Please check your
                <span className="font-semibold text-foreground">{selectedChannel === ConfirmationMessageChannels.EMAIL ? " email " : " SMS "}</span>
                inbox to continue our discussion in a private chat.
              </p>
            </div>
            <Button onClick={() => setMessageSent(false)} className="w-full" variant="outline">
              <Send className="mr-2 h-4 w-4" />
              Send Another Message
            </Button>
          </div>
        )}
        {!hasMessages && !messageSent && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 py-4 overflow-y-auto">
              {!client?.uuid && (
                <>
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
                </>
              )}
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
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
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
