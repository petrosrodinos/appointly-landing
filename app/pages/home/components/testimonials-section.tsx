import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Businesses Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">See what our customers have to say about their experience with Appointly</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"Appointly transformed our booking process completely. Our customers love the seamless experience, and we've seen a 40% increase in bookings since switching."</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sarah Martinez</p>
                  <p className="text-sm text-muted-foreground">Beauty Salon Owner</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"The automated messaging feature is a game-changer. We never miss a follow-up, and our customer satisfaction has improved dramatically."</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>DJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">David Johnson</p>
                  <p className="text-sm text-muted-foreground">Fitness Trainer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"The analytics dashboard gives us incredible insights into our business. We can now make data-driven decisions that actually impact our bottom line."</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>LC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Lisa Chen</p>
                  <p className="text-sm text-muted-foreground">Medical Practice Manager</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
