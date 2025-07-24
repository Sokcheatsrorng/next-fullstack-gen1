"use client"

import { sendGAEvent } from "@next/third-parties/google"
import { Button } from "@/components/ui/button"

export function EventButtonToGoogleAnalytics() {
  const handleClick = () => {
    // Send a custom event to Google Analytics
    sendGAEvent("event", "button_clicked", {
      event_category: "engagement",
      event_label: "homepage_cta",
      value: 1,
    })

    alert("Event sent to Google Analytics!")
  }

  return (
    <Button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700">
      Send Custom Event
    </Button>
  )
}
