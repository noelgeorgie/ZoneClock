import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { PictureInPicture, X } from "lucide-react";
import { toast } from "sonner";

const PipToggle = () => {
  const [isPipSupported, setIsPipSupported] = useState(false);
  const [isPipActive, setIsPipActive] = useState(false);

  useEffect(() => {
    setIsPipSupported("documentPictureInPicture" in window);
  }, []);

  const togglePip = async () => {
    if (!isPipSupported) {
      toast.error("Picture-in-Picture not supported", {
        description: "Your browser doesn't support this feature.",
      });
      return;
    }

    try {
      if (isPipActive) {
        if ((window as any).pipWindow) {
          (window as any).pipWindow.close();
          setIsPipActive(false);
        }
      } else {
        // Open PiP window
        const pipWindow = await (window as any).documentPictureInPicture.requestWindow({
          width: 600,
          height: 400,
        });

        // Copy styles
        [...document.styleSheets].forEach((styleSheet) => {
          try {
            const cssRules = [...styleSheet.cssRules]
              .map((rule) => rule.cssText)
              .join("");
            const style = document.createElement("style");
            style.textContent = cssRules;
            pipWindow.document.head.appendChild(style);
          } catch (e) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = styleSheet.type;
            link.media = styleSheet.media.toString();
            link.href = styleSheet.href || "";
            pipWindow.document.head.appendChild(link);
          }
        });

        // Clone and append content
        const container = document.getElementById("pip-content");
        if (container) {
          const clone = container.cloneNode(true) as HTMLElement;
          pipWindow.document.body.appendChild(clone);
        }

        (window as any).pipWindow = pipWindow;
        setIsPipActive(true);

        pipWindow.addEventListener("pagehide", () => {
          setIsPipActive(false);
          (window as any).pipWindow = null;
        });

        toast.success("Picture-in-Picture activated", {
          description: "Dashboard is now floating!",
        });
      }
    } catch (error) {
      console.error("PiP error:", error);
      toast.error("Failed to toggle Picture-in-Picture");
    }
  };

  if (!isPipSupported) return null;

  return (
    <Button
      onClick={togglePip}
      variant={isPipActive ? "destructive" : "default"}
      size="lg"
      className="gap-2"
    >
      {isPipActive ? (
        <>
          <X className="h-5 w-5" />
          Close PiP
        </>
      ) : (
        <>
          <PictureInPicture className="h-5 w-5" />
          Float Dashboard
        </>
      )}
    </Button>
  );
};

export default PipToggle;
