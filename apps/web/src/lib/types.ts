import type { Farm, Field } from "./db";

export type { Farm, Field };

export interface User {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  createdAt?: string;
}

export interface HealthStatus {
  status: string;
  db: string;
}

export type ActiveTab = "farms" | "fields" | "knowledge" | "profile" | "create-field" | "analytics";

export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
  };
}

export interface DiseaseForecast {
  level: string;
  score: number;
  advice: string;
}

export interface InsightData {
  humidity: number;
  ai_analysis?: {
    crop?: string;
    condition?: string;
    risks_found?: string[];
    advice?: string;
    consideredRecentActions?: boolean;
    disease_forecast?: Record<string, DiseaseForecast>;
  };
}

export interface OperationData {
  id: string;
  type: string;
  date: string;
  metadata?: {
    volume?: number;
    unit?: string;
    productName?: string;
    quantity?: number;
    technique?: string;
    intensityLevel?: string;
    method?: string;
    yieldEstimate?: number;
    note?: string;
    [key: string]: unknown;
  };
}

export interface IrrigationRecommendation {
  et0: number;
  etc: number;
  precipitation: number;
  litersPerTree: number;
  durationMinutes: number;
}

export interface MonthlyNpkSchedule {
  month: string;
  monthNum: number;
  stage: string;
  n_kg: number;
  p_kg: number;
  k_kg: number;
}

export interface MicronutrientsRec {
  boron_g_per_tree: number;
  zinc_g_per_tree: number;
  iron_chelate_g_per_tree: number;
  magnesium_kg_per_ha: number;
}

export interface FoliarSprayRec {
  target: string;
  timing: string;
  dose: string;
  purpose: string;
}

export interface NpkRecommendation {
  n: number;
  p: number;
  k: number;
  targetYield: number;
  bearingStatus: string;
  soilTestDate?: string;
  monthlySchedule?: MonthlyNpkSchedule[];
  micronutrients?: MicronutrientsRec;
  foliarSprays?: FoliarSprayRec[];
}

export interface AgronomyRecommendation {
  water?: IrrigationRecommendation;
  npk?: NpkRecommendation;
}

export interface IrrigationConfig {
  dripperFlowRate?: number;
  drippersPerTree?: number;
  treeDensity?: number;
  efficiency?: number;
}

export interface SoilAnalysisEntry {
  ph?: number;
  organicMatter?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  analysisDate?: string;
}

export interface YieldConfig {
  targetYield?: number;
  bearingStatus?: string;
}

export interface AgronomyData {
  irrigationConfig?: IrrigationConfig;
  soilAnalysis?: SoilAnalysisEntry[];
  yieldConfig?: YieldConfig;
  recommendations?: AgronomyRecommendation;
}

export interface AgronomyForm {
  fieldArea?: string;
  dripperFlowRate: string;
  drippersPerTree: string;
  treeDensity: string;
  totalTrees?: string;
  efficiency: string;
  ph: string;
  organicMatter: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  analysisDate: string;
  targetYield: string;
  bearingStatus: string;
}

export interface LogForm {
  type: string;
  date: string;
}

export interface DynamicField {
  name: string;
  inputType: string;
  unit?: string;
  options?: string[];
}

export interface FieldRequirement {
  name: string;
  inputType: string;
  options?: string[];
}

export interface SeasonSummary {
  currentStage: string;
  accumulatedGdd: number;
  gddToNextStage?: number;
  accumulatedChilling: number;
  bioFixReached: boolean;
  predictedHarvestDate?: string;
}
