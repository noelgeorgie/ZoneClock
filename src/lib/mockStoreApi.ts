import { StoreHours } from "@/types/store";

// Mock API data for store hours
export const mockStoreHours: StoreHours[] = [
  {
    region: "NA",
    openTime: "09:00",
    closeTime: "21:00",
    timezone: "America/New_York",
  },
  {
    region: "EMEA",
    openTime: "09:00",
    closeTime: "20:00",
    timezone: "Europe/Paris",
  },
  {
    region: "JP",
    openTime: "10:00",
    closeTime: "20:00",
    timezone: "Asia/Tokyo",
  },
];

// Simulate API call
export const fetchStoreHours = async (): Promise<StoreHours[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStoreHours);
    }, 500);
  });
};

// Check if store is currently open
export const isStoreOpen = (
  openTime: string,
  closeTime: string,
  timezone: string
): boolean => {
  const now = new Date();
  const currentTime = now.toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const [currentHour, currentMinute] = currentTime.split(":").map(Number);
  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);

  const currentMinutes = currentHour * 60 + currentMinute;
  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
};
