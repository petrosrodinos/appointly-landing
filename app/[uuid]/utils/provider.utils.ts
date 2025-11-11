import { DateTime } from "luxon";
import { LocationTypes, PaymentTypes } from "@/features/services/interfaces/services.interfaces";
import { ClosurePeriod } from "@/features/closure-periods/interfaces/closure-periods.interfaces";

export const formatTime = (time: string) => {
    const normalized = time.length > 5 ? time : `${time}:00`;
    const dateTime = DateTime.fromFormat(normalized, "HH:mm:ss");
    return dateTime.isValid ? dateTime.toFormat("h:mm a") : time;
};

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};

export const formatDuration = (minutes: number) => {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const getDayName = (day: string) => {
    const days = {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
    };
    return days[day.toLowerCase() as keyof typeof days] || day;
};

export const getLocationTypeLabel = (locationType: LocationTypes) => {
    const labels = {
        [LocationTypes.ONLINE]: "Online",
        [LocationTypes.OFFICE]: "Office",
        [LocationTypes.HOME]: "Home Visit",
    };
    return labels[locationType] || locationType;
};

export const getLocationTypeDescription = (locationType: LocationTypes) => {
    const descriptions = {
        [LocationTypes.ONLINE]: "Service provided remotely via video call or online platform",
        [LocationTypes.OFFICE]: "Service provided at our office location",
        [LocationTypes.HOME]: "Service provided at your home or preferred location",
    };
    return descriptions[locationType] || "Location type information";
};

export const getPaymentTypeLabel = (paymentType: PaymentTypes) => {
    const labels = {
        [PaymentTypes.CASH]: "Cash",
        [PaymentTypes.CARD]: "Card",
        [PaymentTypes.ONLINE_PAYMENT]: "Online Payment",
    };
    return labels[paymentType] || paymentType;
};

export const getPaymentTypeDescription = (paymentType: PaymentTypes) => {
    const descriptions = {
        [PaymentTypes.CASH]: "Pay in cash directly at the time of your appointment.",
        [PaymentTypes.CARD]: "Securely pay using any major credit or debit card at the time of your appointment.",
        [PaymentTypes.ONLINE_PAYMENT]: "Complete your payment online before the appointment.",
    };
    return descriptions[paymentType] || "Payment method information";
};

export const isDateInClosurePeriod = (date: Date, closurePeriod: ClosurePeriod): boolean => {
    if (!closurePeriod.enabled) return false;

    const periodStart = new Date(closurePeriod.date_from);
    const periodEnd = closurePeriod.date_to ? new Date(closurePeriod.date_to) : periodStart;

    return date >= periodStart && date <= periodEnd;
};

export const getClosurePeriodMessage = (closurePeriods: ClosurePeriod[]): string | null => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayClosure = closurePeriods.find(period => isDateInClosurePeriod(today, period));
    const tomorrowClosure = closurePeriods.find(period => isDateInClosurePeriod(tomorrow, period));

    if (todayClosure) {
        return `We're currently closed due to: ${todayClosure.description || 'Scheduled closure'}`;
    }

    if (tomorrowClosure) {
        return `We'll be closed tomorrow due to: ${tomorrowClosure.description || 'Scheduled closure'}`;
    }

    return null;
};
