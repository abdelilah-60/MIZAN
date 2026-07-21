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
    gddFlower: 650,
    gddTotal: 3400,
    origin: "Morocco"
  },
  "Haouzia": {
    name: "Haouzia",
    chillingRequired: 300,
    gddFlower: 620,
    gddTotal: 3200,
    origin: "Morocco (INRA)"
  },
  "Menara": {
    name: "Menara",
    chillingRequired: 300,
    gddFlower: 630,
    gddTotal: 3200,
    origin: "Morocco (INRA)"
  },
  "Dahbia": {
    name: "Dahbia",
    chillingRequired: 250,
    gddFlower: 580,
    gddTotal: 2800,
    origin: "Morocco"
  },
  "Meslala": {
    name: "Meslala",
    chillingRequired: 350,
    gddFlower: 560,
    gddTotal: 2600,
    origin: "Morocco"
  },
  "Arbequina": {
    name: "Arbequina",
    chillingRequired: 250,
    gddFlower: 550,
    gddTotal: 3000,
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
