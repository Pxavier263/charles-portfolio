import type { Project } from "@/lib/types";
import { NetworkViz } from "../viz/NetworkViz";
import { Pipeline } from "../viz/Pipeline";
import { PilotRoadmap } from "../viz/PilotRoadmap";
import { ToolkitCharts } from "../viz/ToolkitCharts";
import { WorkshopAgenda } from "../viz/WorkshopAgenda";

/** Picks the evidence visual for a case study. */
export function Visual({ kind }: { kind?: Project["visual"] }) {
  switch (kind) {
    case "pipeline": return <Pipeline />;
    case "toolkit-charts": return <ToolkitCharts />;
    case "network": return <NetworkViz />;
    case "pilot-roadmap": return <PilotRoadmap />;
    case "workshop-agenda": return <WorkshopAgenda />;
    default: return null;
  }
}
