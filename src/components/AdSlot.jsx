import React, { useEffect, useRef } from "react";

/**
 * AdSlot - Replace `placeholder` prop with false and fill in your real
 * AdSense client + slot IDs once approved. The component handles both modes.
 *
 * Usage:
 *   <AdSlot size="728x90" client="ca-pub-XXXXXXXX" slot="1234567890" />
 *   <AdSlot size="300x250" placeholder />
 */
export default function AdSlot({ size = "728x90", client, slot, placeholder = true, className = "" }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (!placeholder && client && slot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, [placeholder, client, slot]);

  const sizeMap = {
    "728x90": { width: "728px", height: "90px", label: "728×90 Leaderboard" },
    "300x250": { width: "300px", height: "250px", label: "300×250 Medium Rectangle" },
    "320x50":  { width: "320px", height: "50px",  label: "320×50 Mobile Banner" },
    "160x600": { width: "160px", height: "600px", label: "160×600 Wide Skyscraper" },
    "responsive": { width: "100%", height: "90px", label: "Responsive Ad" },
  };

  const dim = sizeMap[size] || sizeMap["responsive"];

  if (placeholder) {
    return (
      <div className={`ad-wrapper ${className}`}>
        <div className="ad-label">Advertisement</div>
        <div
          className="ad-slot"
          style={{ width: dim.width, maxWidth: "100%", height: dim.height, margin: "0 auto" }}
        >
          {dim.label} — AdSense
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-wrapper ${className}`}>
      <div className="ad-label">Advertisement</div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: dim.width, height: dim.height }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={size === "responsive" ? "auto" : undefined}
        data-full-width-responsive={size === "responsive" ? "true" : undefined}
      />
    </div>
  );
}
