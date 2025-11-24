export interface StoreHours {
  region: string;
  openTime: string; // HH:mm format in local timezone
  closeTime: string; // HH:mm format in local timezone
  timezone: string;
}

export interface RegionStatus {
  region: string;
  code: string;
  flag: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  currentTime: string;
}
