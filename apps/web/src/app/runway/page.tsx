import type { Metadata } from "next";
import { RunwayView } from "./runway-view";

export const metadata: Metadata = { title: "Runway & Sinking Engine" };

export default function RunwayPage() {
  return <RunwayView />;
}
