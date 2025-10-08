import React from "react";
import { getAccountSeo, getProviderAccount } from "@/features/account/services/account.services";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { notFound } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProviderHeader from "./components/provider-header";
import ProviderProfile from "./components/provider-profile";
import ProviderServices from "./components/provider-services";
import ProviderRatings from "./components/provider-ratings";
import BookingSidebar from "./components/booking-sidebar";
import AccountImageGallery from "./components/account-image-gallery";
import type { Metadata } from "next";
import { OpeningHour } from "@/features/opening-hours/interfaces/opening-hours.interfaces";
import { getBusinessType } from "@/features/account/utils/account.utils";

interface ProviderProfilePageProps {
  params: {
    uuid: string;
  };
}

export const generateMetadata = async ({ params }: ProviderProfilePageProps): Promise<Metadata> => {
  try {
    const { uuid } = await params;
    const accountSeo = await getAccountSeo(uuid);

    if (!accountSeo) {
      return {
        title: "Provider Not Found",
        description: "The requested provider could not be found.",
      };
    }

    return accountSeo.metatags;
  } catch (error) {
    return {
      title: "Provider Not Found",
      description: "The requested provider could not be found.",
    };
  }
};

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

  const accountSeo = await getAccountSeo(provider.slug);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(accountSeo) }} />
    </TooltipProvider>
  );
};

export default ProviderProfilePage;
