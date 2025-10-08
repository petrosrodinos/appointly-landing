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
import type { Metadata } from "next";

interface ProviderProfilePageProps {
  params: {
    uuid: string;
  };
}

export const generateMetadata = async ({ params }: ProviderProfilePageProps): Promise<Metadata> => {
  try {
    const { uuid } = await params;
    const provider = await getProviderAccount(uuid);

    if (!provider) {
      return {
        title: "Provider Not Found",
        description: "The requested provider could not be found.",
      };
    }

    const providerTitle = `${provider.title} - ${provider.category}`;
    const providerDescription = provider.description || `Book appointments with ${provider.title}, a ${provider.category} based in ${provider.city}, ${provider.country}.`;
    const providerImage = provider.logo?.url || provider.banner?.url;
    const servicesTitles = provider.services?.map((service) => service.name).join(", ") || "";
    const serviceDescriptions = provider.services?.map((service) => service.description).join(", ") || "";

    return {
      title: providerTitle,
      description: providerDescription,
      keywords: `${provider.category}, ${provider.city}, ${provider.country}, appointment booking, ${provider.first_name}, ${provider.last_name}, ${provider.title}, ${provider.slug},${servicesTitles ? `, ${servicesTitles}` : ""},${serviceDescriptions ? `, ${serviceDescriptions}` : ""}`,
      authors: [{ name: provider.title }, { name: provider.first_name }, { name: provider.last_name }],
      openGraph: {
        title: providerTitle,
        description: providerDescription,
        type: "website",
        locale: "en_US",
        siteName: "Appointly",
        images: providerImage
          ? [
              {
                url: providerImage,
                width: 1200,
                height: 630,
                alt: provider.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: providerTitle,
        description: providerDescription,
        images: providerImage ? [providerImage] : [],
      },
      alternates: {
        canonical: `/${uuid}`,
      },
      other: {
        "business:contact_data:street_address": provider.address,
        "business:contact_data:locality": provider.city,
        "business:contact_data:postal_code": provider.zip_code,
        "business:contact_data:country_name": provider.country,
        "business:contact_data:email": provider.email,
        "business:contact_data:phone_number": provider.phone,
      },
    };
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
