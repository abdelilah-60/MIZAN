export interface VarietyConfig {
  name: string;
  chillingRequired: number; // Chilling hours required (< 7°C) to break dormancy
  gddFlower: number;        // GDD at which flowering (Floraison) occurs
  gddTotal: number;         // Total GDD required for harvest maturity
  origin: string;
}

export const VARIETIES: Record<string, VarietyConfig> = {
  "Picholine Marocaine": {
    name: "Picholine Marocaine",
    chillingRequired: 400,
    gddFlower: 450,
    gddTotal: 1700,
    origin: "Morocco"
  },
  "Haouzia": {
    name: "Haouzia",
    chillingRequired: 350,
    gddFlower: 420,
    gddTotal: 1600,
    origin: "Morocco (INRA)"
  },
  "Menara": {
    name: "Menara",
    chillingRequired: 350,
    gddFlower: 430,
    gddTotal: 1650,
    origin: "Morocco (INRA)"
  },
  "Dahbia": {
    name: "Dahbia",
    chillingRequired: 300,
    gddFlower: 390,
    gddTotal: 1500,
    origin: "Morocco"
  },
  "Meslala": {
    name: "Meslala",
    chillingRequired: 500,
    gddFlower: 480,
    gddTotal: 1800,
    origin: "Morocco"
  },
  "Arbequina": {
    name: "Arbequina",
    chillingRequired: 250,
    gddFlower: 320,
    gddTotal: 1400,
    origin: "Spain"
  }
};

export function getStageForGdd(variety: string, gdd: number, isBioFixReached: boolean): { stage: string; nextStageGdd: number | null } {
  const config = VARIETIES[variety] || VARIETIES["Picholine Marocaine"];
  
  if (!isBioFixReached) {
    return { stage: "DORMANCE", nextStageGdd: 0 };
  }

  const flowerStart = config.gddFlower * 0.4;
  const nouaisonStart = config.gddFlower * 1.2;
  const croissanceStart = config.gddFlower * 1.6;
  const veraisonStart = config.gddTotal * 0.75;
  const recolteStart = config.gddTotal;

  if (gdd < flowerStart) {
    return { stage: "DEBOURREMENT", nextStageGdd: flowerStart };
  } else if (gdd < nouaisonStart) {
    return { stage: "FLORAISON", nextStageGdd: nouaisonStart };
  } else if (gdd < croissanceStart) {
    return { stage: "NOUAISON", nextStageGdd: croissanceStart };
  } else if (gdd < veraisonStart) {
    return { stage: "CROISSANCE", nextStageGdd: veraisonStart };
  } else if (gdd < recolteStart) {
    return { stage: "VERAISON", nextStageGdd: recolteStart };
  } else {
    return { stage: "RECOLTE", nextStageGdd: null };
  }
}
