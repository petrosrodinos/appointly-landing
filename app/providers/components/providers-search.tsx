"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

interface ProvidersSearchProps {
  categories: string[];
  providerCount: number;
  filteredCount: number;
}

const ProvidersSearch: React.FC<ProvidersSearchProps> = ({ categories, providerCount, filteredCount }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/providers?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push("/providers", { scroll: false });
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search providers, services, or locations..." value={searchQuery} onChange={(e) => updateSearchParams("search", e.target.value)} className="pl-10" />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            <Button variant={selectedCategory === "" ? "default" : "outline"} size="sm" onClick={() => updateSearchParams("category", "")} className="whitespace-nowrap">
              All Categories
            </Button>
            {categories.map((category) => (
              <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => updateSearchParams("category", category)} className="whitespace-nowrap">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {(searchQuery || selectedCategory) && (
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Showing {filteredCount} of {providerCount} providers
          </p>
          <Button variant="outline" onClick={clearFilters} className="group">
            Clear Filters
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ProvidersSearch;
