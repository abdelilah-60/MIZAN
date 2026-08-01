export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Mizan AgTech Platform REST API (منصة ميزان الفلاحية)",
    version: "1.0.0",
    description: "API Télédétection & Agronomie par IA pour l'oléiculture (استشعار فلاحي وذكاء اصطناعي للزيتون)",
    contact: {
      name: "Mizan Engineering Team",
      url: "https://github.com/abdelilah-60/MIZAN"
    }
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local Development Server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Authentification utilisateur (تسجيل الدخول)",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@mizan.com" },
                  password: { type: "string", example: "password123" }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          "200": { description: "JWT Issued Successfully" },
          "401": { description: "Invalid Credentials" }
        }
      }
    },
    "/api/fields": {
      get: {
        summary: "Liste des parcelles (قائمة الحقول والقطع)",
        tags: ["Fields"],
        responses: {
          "200": { description: "List of fields with agronomic data" }
        }
      },
      post: {
        summary: "Créer une nouvelle parcelle (إضافة حقل جديد)",
        tags: ["Fields"],
        responses: {
          "201": { description: "Field Created" }
        }
      }
    },
    "/api/weather": {
      get: {
        summary: "Données météo en direct (حالة الطقس الفعلي)",
        tags: ["Weather"],
        parameters: [
          { name: "lat", in: "query", required: true, schema: { type: "number" } },
          { name: "lon", in: "query", required: true, schema: { type: "number" } }
        ],
        responses: {
          "200": { description: "Open-Meteo Current Weather" }
        }
      }
    },
    "/api/insights/{fieldId}": {
      get: {
        summary: "Prédiction des risques & maladies AI (تحليل المخاطر والأمراض)",
        tags: ["Insights"],
        parameters: [
          { name: "fieldId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "AI Agronomic Disease & Weather Risk Prediction" }
        }
      }
    },
    "/api/operations": {
      post: {
        summary: "Enregistrer une intervention agricole (تسجيل عملية فلاحية)",
        tags: ["Operations"],
        responses: {
          "201": { description: "Operation Logged Successfully" }
        }
      }
    },
    "/api/satellite/analyze": {
      post: {
        summary: "Analyse spectrale Sentinel-2 (التحليل الطيفي الفضائي)",
        tags: ["Satellite"],
        responses: {
          "200": { description: "Sentinel-2 Spectral Analysis Result" }
        }
      }
    }
  }
};
