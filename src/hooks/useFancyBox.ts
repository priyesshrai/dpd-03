'use client';

import { useState, useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// ✅ Custom config type that matches Fancybox real-world usage
export type FancyboxConfig = {
  animated?: boolean;
  dragToClose?: boolean;
  groupAll?: boolean;
  showClass?: string;
  hideClass?: string;
  Carousel?: {
    infinite?: boolean;
    transition?: "slide" | "fade";
  };
  Thumbs?: {
    autoStart?: boolean;
  };
  Toolbar?: {
    display?: string[];
  };
  Image?: {
    zoom?: boolean;
    click?: "close" | "toggleZoom";
    wheel?: "zoom" | "slide";
  };
};

export default function useFancybox(options: Partial<FancyboxConfig> = {}) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (root) {
      Fancybox.bind(root, "[data-fancybox]", options as unknown as Record<string, unknown>);
      return () => {
        Fancybox.unbind(root);
      };
    }
  }, [root, options]);

  return [setRoot] as const;
}
