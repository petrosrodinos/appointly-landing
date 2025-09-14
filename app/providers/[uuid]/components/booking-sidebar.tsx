import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Clock3 } from "lucide-react";
import type { Account } from "@/features/account/interfaces/account.interfaces";
import { formatTime, getDayName } from "../utils/provider.utils";

interface BookingSidebarProps {
  provider: Account;
}

const BookingSidebar = ({ provider }: BookingSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-xl border border-border">
        <CardHeader className="pb-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Book Appointment
          </h2>
          <p className="text-muted-foreground">Schedule your appointment</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Clock3 className="w-5 h-5 text-green-600 dark:text-green-400" />
              Opening Hours
            </h3>
            {provider.oppening_hours ? (
              <div className="space-y-3">
                {(() => {
                  const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

                  return dayOrder.map((day) => {
                    const hours = provider.oppening_hours?.[day as keyof typeof provider.oppening_hours];

                    if (!hours || hours.length === 0) {
                      return (
                        <div key={day} className="flex justify-between items-center py-2 px-3 bg-muted rounded-lg">
                          <span className="font-medium text-foreground">{getDayName(day)}</span>
                          <span className="text-muted-foreground">Closed</span>
                        </div>
                      );
                    }

                    return (
                      <div key={day} className="space-y-1">
                        <div className="flex justify-between items-center py-2 px-3 bg-muted rounded-lg">
                          <span className="font-medium text-foreground">{getDayName(day)}</span>
                          <div className="flex flex-col items-end space-y-1">
                            {hours.map((hour, index) => (
                              <span key={`${day}-${index}`} className="text-muted-foreground text-sm">
                                {formatTime(hour.open_time)} - {formatTime(hour.close_time)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No opening hours available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSidebar;
