import { useEffect, useState } from "react";
import { RegionStatus } from "@/types/store";
import { fetchStoreHours, isStoreOpen } from "@/lib/mockStoreApi";
import RegionCard from "./RegionCard";
import { toast } from "sonner";

const regionData = [
  { region: "North America", code: "NA", flag: "🇺🇸", timezone: "America/New_York" },
  { region: "EMEA", code: "EMEA", flag: "🇪🇺", timezone: "Europe/Paris" },
  { region: "Japan", code: "JP", flag: "🇯🇵", timezone: "Asia/Tokyo" },
];

const RegionMonitor = () => {
  const [regions, setRegions] = useState<RegionStatus[]>([]);
  const [previousStatus, setPreviousStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updateRegions = async () => {
      const storeHours = await fetchStoreHours();
      const newRegions: RegionStatus[] = [];
      const newStatus: Record<string, boolean> = {};

      for (const data of regionData) {
        const hours = storeHours.find((h) => h.region === data.code);
        if (!hours) continue;

        const open = isStoreOpen(hours.openTime, hours.closeTime, data.timezone);
        const currentTime = new Date().toLocaleTimeString("en-US", {
          timeZone: data.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        newRegions.push({
          region: data.region,
          code: data.code,
          flag: data.flag,
          isOpen: open,
          openTime: hours.openTime,
          closeTime: hours.closeTime,
          currentTime,
        });

        newStatus[data.code] = open;

        // Check for status changes and show notifications
        if (previousStatus[data.code] !== undefined && previousStatus[data.code] !== open) {
          if (open) {
            toast.success(`${data.code} Stores Now Active`, {
              description: "Monitor ServiceNow Tickets & Datadog!",
            });
          } else {
            toast.info(`${data.code} Region Closed`, {
              description: "Reduced monitoring required.",
            });
          }
        }
      }

      setRegions(newRegions);
      setPreviousStatus(newStatus);
    };

    updateRegions();
    const interval = setInterval(updateRegions, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [previousStatus]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {regions.map((region) => (
        <RegionCard key={region.code} region={region} />
      ))}
    </div>
  );
};

export default RegionMonitor;
