import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarRating from "@/components/ui/star-rating";
import CustomerReviews from "./customer-reviews";
import { Heart, Clock, Users, Award } from "lucide-react";

interface ProviderRatingsProps {
  provider: {
    uuid: string;
    title: string;
  };
}

interface RatingIndicator {
  id: string;
  label: string;
  icon: React.ReactNode;
  rating: number;
  description: string;
}

const ProviderRatings = ({ provider }: ProviderRatingsProps) => {
  const ratingIndicators: RatingIndicator[] = [
    {
      id: "service_quality",
      label: "Service Quality",
      icon: <Heart className="w-5 h-5 text-red-500" />,
      rating: 4.8,
      description: "Quality of services provided",
    },
    {
      id: "punctuality",
      label: "Punctuality",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      rating: 4.6,
      description: "Timeliness and reliability",
    },
    {
      id: "customer_service",
      label: "Customer Service",
      icon: <Users className="w-5 h-5 text-green-500" />,
      rating: 4.9,
      description: "Communication and support",
    },
    {
      id: "professionalism",
      label: "Professionalism",
      icon: <Award className="w-5 h-5 text-purple-500" />,
      rating: 4.7,
      description: "Expertise and professionalism",
    },
  ];

  const overallRating = ratingIndicators.reduce((sum, indicator) => sum + indicator.rating, 0) / ratingIndicators.length;

  return (
    <div className="space-y-8">
      <Card className="shadow-xl border border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Customer Ratings</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating rating={overallRating} size="lg" showValue />
              <span className="text-sm text-muted-foreground">Based on customer reviews</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ratingIndicators.map((indicator) => (
              <div key={indicator.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background shadow-sm">{indicator.icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground">{indicator.label}</h3>
                    <p className="text-sm text-muted-foreground">{indicator.description}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <StarRating rating={indicator.rating} size="sm" />
                  <span className="text-sm font-medium text-muted-foreground">{indicator.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Overall Experience</h4>
                <p className="text-sm text-muted-foreground">Average rating across all categories</p>
              </div>
              <div className="text-right">
                <StarRating rating={overallRating} size="lg" showValue />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CustomerReviews provider={provider} />
    </div>
  );
};

export default ProviderRatings;
