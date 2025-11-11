import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { getCategoryLabel } from "@/features/account/utils/account.utils";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import Image from "next/image";

interface ProviderProfileProps {
  provider: Account;
}

const ProviderProfile = ({ provider }: ProviderProfileProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card shadow-xl border border-border">
      {provider.banner && (
        <div className="relative h-64 md:h-80">
          <Image src={provider.banner.url || "/placeholder-banner.jpg"} alt={`${provider.title} banner`} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      <div className="p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className={`relative ${provider.banner ? "-mt-16" : ""}`}>
            <Avatar className="w-32 h-32 border-4 border-card shadow-2xl">
              <AvatarImage src={provider.logo?.url} alt={provider.title} />
              <AvatarFallback className="text-2xl font-bold">
                {provider.first_name[0]}
                {provider.last_name[0]}
              </AvatarFallback>
            </Avatar>
            {provider.verified && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{provider.title}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="default" className="text-sm px-3 py-1">
                  {getCategoryLabel(provider.category)}
                </Badge>
                {provider.verified && (
                  <Badge variant="outline" className="text-sm px-3 py-1 border-green-200 text-green-700 dark:text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Professional
                  </Badge>
                )}
              </div>
            </div>

            {provider.description && <p className="text-muted-foreground leading-relaxed text-lg">{provider.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
