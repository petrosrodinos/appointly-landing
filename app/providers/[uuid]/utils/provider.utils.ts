import { LocationTypes, PaymentTypes } from "@/features/services/interfaces/services.interfaces";

export const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
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
        [LocationTypes.OFFICE]: "Service provided at the provider's office location",
        [LocationTypes.HOME]: "Service provided at the client's home or preferred location",
    };
    return descriptions[locationType] || "Location type information";
};

export const getPaymentTypeLabel = (paymentType: PaymentTypes) => {
    const labels = {
        [PaymentTypes.CASH]: "Cash",
        [PaymentTypes.CARD]: "Card",
    };
    return labels[paymentType] || paymentType;
};

export const getPaymentTypeDescription = (paymentType: PaymentTypes) => {
    const descriptions = {
        [PaymentTypes.CASH]: "Payment accepted in cash",
        [PaymentTypes.CARD]: "Payment accepted via credit/debit card",
    };
    return descriptions[paymentType] || "Payment method information";
};
