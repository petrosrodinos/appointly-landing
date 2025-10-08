import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "@/components/ui/star-rating";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CustomerReview {
  id: string;
  customer_name: string;
  customer_avatar?: string;
  rating: number;
  comment: string;
  date: string;
  service_used: string;
}

interface CustomerReviewsProps {
  provider: {
    uuid: string;
    title: string;
  };
}

const CustomerReviews = ({ provider }: CustomerReviewsProps) => {
  const reviews: CustomerReview[] = [
    {
      id: "1",
      customer_name: "Sarah Johnson",
      customer_avatar: "/placeholder-avatar.jpg",
      rating: 5.0,
      comment: "Exceptional service! The team was professional, punctual, and delivered exactly what was promised. Highly recommend to anyone looking for quality work.",
      date: "2024-01-15",
      service_used: "Consultation Service",
    },
    {
      id: "2",
      customer_name: "Michael Chen",
      customer_avatar: "/placeholder-avatar.jpg",
      rating: 4.8,
      comment: "Great experience overall. Very knowledgeable and helpful. The only minor issue was a slight delay in response time, but the quality made up for it.",
      date: "2024-01-12",
      service_used: "Technical Support",
    },
    {
      id: "3",
      customer_name: "Emily Rodriguez",
      customer_avatar: "/placeholder-avatar.jpg",
      rating: 5.0,
      comment: "Outstanding professionalism and attention to detail. They went above and beyond to ensure I was completely satisfied. Will definitely use again!",
      date: "2024-01-10",
      service_used: "Project Management",
    },
    {
      id: "4",
      customer_name: "David Thompson",
      customer_avatar: "/placeholder-avatar.jpg",
      rating: 4.6,
      comment: "Good service with room for improvement in communication. The work quality was solid, but I would have appreciated more frequent updates.",
      date: "2024-01-08",
      service_used: "Design Consultation",
    },
    {
      id: "5",
      customer_name: "Lisa Wang",
      customer_avatar: "/placeholder-avatar.jpg",
      rating: 4.9,
      comment: "Excellent customer service and very responsive. The team understood my needs perfectly and delivered a solution that exceeded expectations.",
      date: "2024-01-05",
      service_used: "Strategic Planning",
    },
    {
      id: "6",
      customer_name: "James Wilson",
      customer_avatar: "/placeholder-avatar.jpg",
      rating: 4.7,
      comment: "Professional and reliable service. The team was knowledgeable and provided valuable insights. Would recommend to others.",
      date: "2024-01-03",
      service_used: "Business Analysis",
    },
    {
      id: "7",
      customer_name: "Maria Garcia",
      customer_avatar: "/placeholder-avatar.jpg",
      rating: 5.0,
      comment: "Perfect experience from start to finish. Clear communication, timely delivery, and exceptional results. Thank you for the outstanding work!",
      date: "2024-01-01",
      service_used: "Implementation Support",
    },
    {
      id: "8",
      customer_name: "Robert Brown",
      customer_avatar: "/placeholder-avatar.jpg",
      rating: 4.5,
      comment: "Good overall experience with some minor hiccups. The team was professional and the final deliverable met our requirements.",
      date: "2023-12-28",
      service_used: "Quality Assurance",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="shadow-xl border border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Customer Reviews</CardTitle>
        <p className="text-sm text-muted-foreground">What our customers are saying</p>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96 w-full">
          <div className="space-y-4 pr-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.customer_avatar} alt={review.customer_name} />
                    <AvatarFallback className="text-sm font-medium">
                      {review.customer_name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{review.customer_name}</h4>
                        <p className="text-sm text-muted-foreground">{review.service_used}</p>
                      </div>
                      <div className="text-right">
                        <StarRating rating={review.rating} size="sm" />
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(review.date)}</p>
                      </div>
                    </div>

                    <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            Showing {reviews.length} of {reviews.length} reviews
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerReviews;
