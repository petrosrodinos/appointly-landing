import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const StarRating = ({ rating, maxStars = 5, size = "md", showValue = false, className = "" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starNumber = index + 1;
    const isFilled = starNumber <= rating;
    const isHalfFilled = starNumber === Math.ceil(rating) && rating % 1 !== 0;

    return <Star key={index} className={`${sizeClasses[size]} ${isFilled || isHalfFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"} ${className}`} />;
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showValue && <span className="ml-2 text-sm font-medium text-muted-foreground">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
