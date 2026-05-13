"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalHotkeys() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      const isShift = event.shiftKey;

      // Navigation Shortcuts
      if (isShift) {
        switch (key) {
          case "n": // Shift + N -> New Voyage
            router.push("/create-new-trip");
            break;
          case "m": // Shift + M -> My Manifest
            router.push("/my-trips");
            break;
          case "h": // Shift + H -> Home
            router.push("/");
            break;
          case "s": // Shift + S -> Support
            router.push("/contact-us");
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null; // This component doesn't render anything
}
