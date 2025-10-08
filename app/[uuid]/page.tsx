import React from "react";
import { getProviderAccount } from "@/features/account/services/account.services";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { notFound } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProviderHeader from "./components/provider-header";
import ProviderProfile from "./components/provider-profile";
import ProviderServices from "./components/provider-services";
import ProviderRatings from "./components/provider-ratings";
import BookingSidebar from "./components/booking-sidebar";
import AccountImageGallery from "./components/account-image-gallery";

interface ProviderProfilePageProps {
  params: {
    uuid: string;
  };
}

const ProviderProfilePage = async ({ params }: ProviderProfilePageProps) => {
  let provider: Account | null = null;
  let error: string | null = null;

  try {
    const { uuid } = await params;
    provider = await getProviderAccount(uuid);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch provider";
  }

  if (error || !provider) {
    notFound();
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <div className="relative">
          <div className="relative">
            <ProviderHeader provider={provider} />

            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                  <ProviderProfile provider={provider} />
                  <AccountImageGallery images={provider.images} providerTitle={provider.title} />
                  <ProviderServices provider={provider} />
                  <ProviderRatings provider={provider} />
                </div>

                <BookingSidebar provider={provider} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ProviderProfilePage;
