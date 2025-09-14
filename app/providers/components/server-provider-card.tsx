import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Calendar, CheckCircle } from "lucide-react";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import Link from "next/link";

interface ServerProviderCardProps {
  provider: Account;
}

const ServerProviderCard: React.FC<ServerProviderCardProps> = ({ provider }) => {
  const fullName = `${provider.first_name} ${provider.last_name}`;

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{fullName}</h3>
            {provider.title && <p className="text-sm text-muted-foreground mt-1">{provider.title}</p>}
          </div>
          <div className="flex flex-col gap-2">
            {provider.verified && (
              <Badge variant="default" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {provider.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {provider.description && <p className="text-sm text-muted-foreground line-clamp-3">{provider.description.length > 150 ? `${provider.description.substring(0, 150)}...` : provider.description}</p>}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{provider.address}</span>
          </div>

          {provider.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{provider.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{provider.email}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button asChild size="sm" disabled={!provider.active} className="text-xs">
            <Link href={`/providers/${provider.uuid}`}>
              <Calendar className="w-3 h-3 mr-1" />
              View Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerProviderCard;
