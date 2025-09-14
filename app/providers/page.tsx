import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Star } from "lucide-react";
import ServerProviderCard from "@/app/providers/components/server-provider-card";
import ProvidersSearch from "@/app/providers/components/providers-search";
import { getProviders } from "@/features/account/services/account.services";
import type { Account } from "@/features/account/interfaces/account.interfaces";

interface ProvidersPageProps {
  searchParams: {
    search?: string;
    category?: string;
  };
}

const ProvidersPage = async ({ searchParams }: ProvidersPageProps) => {
  let providers: Account[] = [];
  let error: string | null = null;

  try {
    providers = await getProviders();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch providers";
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Providers</h1>
            <p className="text-muted-foreground mb-8">Connect with verified professionals</p>

            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const filteredProviders = providers.filter((provider) => {
    const searchQuery = searchParams.search?.toLowerCase() || "";
    const selectedCategory = searchParams.category || "";

    const matchesSearch = !searchQuery || provider.first_name.toLowerCase().includes(searchQuery) || provider.last_name.toLowerCase().includes(searchQuery) || provider.title?.toLowerCase().includes(searchQuery) || provider.category.toLowerCase().includes(searchQuery) || provider.city.toLowerCase().includes(searchQuery);

    const matchesCategory = !selectedCategory || provider.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(providers.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Providers</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Connect with verified professionals who are ready to help you. Browse our network of skilled providers and book appointments that fit your schedule.</p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{providers.length} Providers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Multiple Locations</span>
            </div>
          </div>
        </div>

        <ProvidersSearch categories={categories} providerCount={providers.length} filteredCount={filteredProviders.length} />

        {filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No providers found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ServerProviderCard key={provider.uuid} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvidersPage;
