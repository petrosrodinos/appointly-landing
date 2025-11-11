import { DateTime } from "luxon";
import type { OpeningHour, OpeningHoursResponse } from "@/features/opening-hours/interfaces/opening-hours.interfaces";
import { formatTime, getDayName } from "./provider.utils";

export const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const weekdayMap: Record<number, string> = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    7: "sunday",
};

const defaultStatus = (currentDayKey: string): TodayStatus => ({
    current_day_key: currentDayKey,
    is_open: false,
    closing_time: null,
    next_open_day_key: null,
    next_open_time: null,
    today_hours: [],
});

const sortHours = (hours: OpeningHour[]) => [...hours].sort((a, b) => a.open_time.localeCompare(b.open_time));

const getMinutes = (time: string) => {
    const timeString = time.length > 5 ? time : `${time}:00`;
    const dateTime = DateTime.fromFormat(timeString, "HH:mm:ss");
    return dateTime.hour * 60 + dateTime.minute;
};

const getOpeningHoursByDay = (openingHours: OpeningHoursResponse | undefined, day: string): OpeningHour[] => {
    if (!openingHours) {
        return [];
    }
    return sortHours(openingHours[day as keyof OpeningHoursResponse] || []);
};

export interface TodayStatus {
    current_day_key: string;
    is_open: boolean;
    closing_time: string | null;
    next_open_day_key: string | null;
    next_open_time: string | null;
    today_hours: OpeningHour[];
}

export const getProviderDateTime = (timezone?: string) => {
    if (!timezone) {
        return DateTime.now();
    }
    const zoned = DateTime.now().setZone(timezone);
    return zoned.isValid ? zoned : DateTime.now();
};

export const getTodayStatus = (openingHours: OpeningHoursResponse | undefined, dateTime: DateTime): TodayStatus => {
    const currentDayKey = weekdayMap[dateTime.weekday] || "monday";
    const currentDayIndex = dayOrder.indexOf(currentDayKey);
    if (!openingHours || currentDayIndex < 0) {
        return defaultStatus(currentDayKey);
    }

    const currentMinutes = dateTime.hour * 60 + dateTime.minute;
    const todayHours = getOpeningHoursByDay(openingHours, currentDayKey);

    let isOpen = false;
    let closingTime: string | null = null;
    let nextOpenDayKey: string | null = null;
    let nextOpenTime: string | null = null;

    todayHours.forEach((slot) => {
        const openMinutes = getMinutes(slot.open_time);
        const closeMinutes = getMinutes(slot.close_time);
        if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
            isOpen = true;
            closingTime = slot.close_time;
        } else if (currentMinutes < openMinutes) {
            if (!nextOpenTime || getMinutes(slot.open_time) < getMinutes(nextOpenTime)) {
                nextOpenDayKey = currentDayKey;
                nextOpenTime = slot.open_time;
            }
        }
    });

    if (!isOpen && !nextOpenTime) {
        for (let offset = 1; offset <= dayOrder.length; offset += 1) {
            const lookupIndex = (currentDayIndex + offset) % dayOrder.length;
            const lookupDayKey = dayOrder[lookupIndex];
            const dayHours = getOpeningHoursByDay(openingHours, lookupDayKey);
            if (!dayHours.length) {
                continue;
            }
            nextOpenDayKey = lookupDayKey;
            nextOpenTime = dayHours[0].open_time;
            break;
        }
    }

    return {
        current_day_key: currentDayKey,
        is_open: isOpen,
        closing_time: closingTime,
        next_open_day_key: nextOpenDayKey,
        next_open_time: nextOpenTime,
        today_hours: todayHours,
    };
};

export const getStatusLabel = (status: TodayStatus, hasOpeningHours: boolean) => {
    if (!hasOpeningHours) {
        return "Hours unavailable";
    }
    if (status.is_open) {
        if (status.closing_time) {
            return `Open • Closes at ${formatTime(status.closing_time)}`;
        }
        return "Open";
    }
    if (status.next_open_time) {
        if (status.next_open_day_key === status.current_day_key) {
            return `Closed • Opens at ${formatTime(status.next_open_time)}`;
        }
        if (status.next_open_day_key) {
            return `Closed • Opens ${getDayName(status.next_open_day_key)} at ${formatTime(status.next_open_time)}`;
        }
    }
    return "Closed";
};

export const getWeeklyHours = (openingHours: OpeningHoursResponse | undefined, currentDayKey: string) => {
    return dayOrder.map((day) => ({
        day,
        hours: getOpeningHoursByDay(openingHours, day),
        is_current_day: day === currentDayKey,
    }));
};

