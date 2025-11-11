import { AutocompleteAddress, Coordinates } from "@/features/google-maps/interfaces/address.interface";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getGoogleMapsUrl = (coordinates: Coordinates): string | null => {
  if (coordinates?.lat && coordinates?.lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  }

  // if (address?.formatted_address) {
  //   const encoded = encodeURIComponent(address.formatted_address);
  //   return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
  // }

  return null;
};
