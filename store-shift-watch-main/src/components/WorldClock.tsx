import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Card } from "./ui/card";

interface TimeZone {
  code: string;
  name: string;
  timezone: string;
  flag: string;
}

const timezones: TimeZone[] = [
  { code: "IST", name: "India", timezone: "Asia/Kolkata", flag: "🇮🇳" },
  { code: "CET", name: "EMEA", timezone: "Europe/Paris", flag: "🇪🇺" },
  { code: "EST", name: "North America", timezone: "America/New_York", flag: "🇺🇸" },
  { code: "JST", name: "Japan", timezone: "Asia/Tokyo", flag: "🇯🇵" },
];

const WorldClock = () => {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      timezones.forEach((tz) => {
        const time = new Date().toLocaleTimeString("en-US", {
          timeZone: tz.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        newTimes[tz.code] = time;
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {timezones.map((tz) => (
        <Card key={tz.code} className="p-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{tz.flag}</span>
            <div>
              <div className="text-sm text-muted-foreground">{tz.name}</div>
              <div className="text-xs font-medium text-primary">{tz.code}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-2xl font-mono font-bold tabular-nums text-foreground">
              {times[tz.code] || "00:00:00"}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WorldClock;
