export type TriageStatus = "pending" | "confirmed" | "rejected";

export interface Detection {
  id: string;
  source_image: string;
  class_id: number;
  class_name: string;
  confidence: number;
  bbox: [number, number, number, number];
  mask_polygon: [number, number][];
  centroid_px: [number, number];
  lat: number;
  lon: number;
  triage_status: TriageStatus;
}