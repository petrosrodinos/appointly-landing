"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "@/components/ui/star-rating";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRatings } from "@/features/ratings/hooks/use-ratings";

interface CustomerReviewsProps {
  provider: {
    uuid: string;
    title: string;
    logo: {
      url: string;
    } | null;
  };
}

const CustomerReviews = ({ provider }: CustomerReviewsProps) => {
  const { data: ratingsData, isLoading } = useGetRatings({
    provider_uuid: provider.uuid,
    limit: 20,
    order_by: "created_at",
    order_direction: "desc",
  });

  const reviews = ratingsData?.data || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName?.charAt(0) || "";
    const lastInitial = lastName?.charAt(0) || "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <ScrollArea className="h-96 w-full">
          <div className="space-y-4 pr-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-16 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-8">
        <div className="text-center text-muted-foreground">No reviews yet</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground">Customer Reviews</h3>
        <p className="text-sm text-muted-foreground">What our customers are saying</p>
      </div>

      <ScrollArea className="h-96 w-full">
        <div className="space-y-4 pr-4">
          {reviews.map((review) => (
            <div key={review.uuid} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-sm font-medium">{getInitials(review.client.first_name, review.client.last_name)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {review.client.first_name} {review.client.last_name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <StarRating rating={review.total} size="sm" />
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(review.created_at)}</p>
                    </div>
                  </div>

                  {review.comment && <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>}

                  {review.response && (
                    <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={provider.logo?.url} alt={provider.title} />
                          <AvatarFallback className="text-xs font-medium bg-primary text-primary-foreground">{provider.title?.charAt(0).toUpperCase() || "P"}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold text-foreground">{provider.title}</span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed ml-8">{review.response}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>Experience: {review.experience}/5</span>
                    <span>•</span>
                    <span>Punctuality: {review.punctuality}/5</span>
                    <span>•</span>
                    <span>Friendliness: {review.friendliness}/5</span>
                    <span>•</span>
                    <span>Professionalism: {review.professionalism}/5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-center text-muted-foreground">
          Showing {reviews.length} of {ratingsData?.pagination?.total || reviews.length} reviews
        </p>
      </div>
    </>
  );
};

export default CustomerReviews;
