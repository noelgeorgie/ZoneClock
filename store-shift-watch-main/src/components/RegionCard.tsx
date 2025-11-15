import { Card } from "./ui/card";
import { RegionStatus } from "@/types/store";
import { Store, Clock } from "lucide-react";

interface RegionCardProps {
  region: RegionStatus;
}

const RegionCard = ({ region }: RegionCardProps) => {
  return (
    <Card
      className={`p-6 border-2 transition-all duration-300 ${
        region.isOpen
          ? "border-status-open bg-status-open/5"
          : "border-status-closed bg-status-closed/5"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{region.flag}</span>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              {region.region}
            </h3>
            <p className="text-sm text-muted-foreground">{region.code}</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-sm ${
            region.isOpen
              ? "bg-status-open text-success-foreground"
              : "bg-status-closed text-destructive-foreground"
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full ${
              region.isOpen ? "bg-success-foreground animate-pulse" : "bg-destructive-foreground"
            }`}
          />
          {region.isOpen ? "OPEN" : "CLOSED"}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="font-mono">{region.currentTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Store className="h-4 w-4" />
          <span>
            {region.openTime} - {region.closeTime}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default RegionCard;
