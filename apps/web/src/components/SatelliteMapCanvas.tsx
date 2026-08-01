import { useEffect, useRef } from "react";
import L from "leaflet";

if (typeof window !== "undefined") {
  (window as any).L = L;
}

export interface SatelliteMapCanvasProps {
  geoPolygon?: any;
  satelliteMode: "SATELLITE" | "CANOPY" | "SAVI" | "NDVI" | "NDWI";
  satelliteData: any;
}

export function SatelliteMapCanvas({ geoPolygon, satelliteMode, satelliteData }: SatelliteMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !geoPolygon?.coordinates?.[0]) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const coords = geoPolygon.coordinates[0];
    if (coords.length < 3) return;

    // ESRI World Imagery Satellite Tile Layer (High Resolution Aerial)
    const satelliteTile = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri",
        maxZoom: 19,
      }
    );

    // Initialize Map centered on field
    const map = L.map(containerRef.current, {
      layers: [satelliteTile],
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      dragging: true,
    });
    mapRef.current = map;

    // 1. Inverted Mask: Mask out EVERYTHING outside field boundaries
    const worldOuterRing: [number, number][] = [
      [-180, -90],
      [180, -90],
      [180, 90],
      [-180, 90],
      [-180, -90],
    ];

    const invertedMaskFeature = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [worldOuterRing, coords],
      },
    };

    L.geoJSON(invertedMaskFeature as any, {
      style: {
        color: "transparent",
        fillColor: "#16212b",
        fillOpacity: 0.94,
      },
    }).addTo(map);

    // 2. Add Polygon Layer for neon border
    const polygonLayer = L.geoJSON(geoPolygon, {
      style: {
        color: "#8D5B4C",
        weight: 3,
        opacity: 0.95,
        fillColor: "transparent",
        fillOpacity: 0,
      },
    }).addTo(map);

    // Get polygon bounds and fit map perfectly
    const bounds = polygonLayer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    // Add pulsing centroid pin
    const center = bounds.getCenter();
    const pulseIcon = L.divIcon({
      className: "custom-pulse-marker",
      html: `<div class="relative flex items-center justify-center">
        <div class="w-6 h-6 rounded-full bg-[#8D5B4C]/40 animate-ping absolute"></div>
        <div class="w-3.5 h-3.5 rounded-full bg-[#8D5B4C] border-2 border-[#16212b] shadow-lg"></div>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    L.marker(center, { icon: pulseIcon }).addTo(map);

    // 3. Render Overlay Image for CANOPY / SAVI / NDVI / NDWI if selected and data is ready
    if (satelliteMode === "CANOPY" && satelliteData?.canopyCover?.overlayDataUrl && bounds.isValid()) {
      L.imageOverlay(satelliteData.canopyCover.overlayDataUrl, bounds, { opacity: 0.82 }).addTo(map);

      // Render Individual Tree Crown (ITC) Vector Circles if trees are detected
      const treeNodes = satelliteData?.treeCrowns?.nodes;
      if (Array.isArray(treeNodes) && treeNodes.length > 0) {
        treeNodes.forEach((node: any) => {
          const radiusMeters = (node.canopyDiameterM || 2.5) / 2.0;
          const statusColor = node.status === "EXCELLENT" ? "#8D5B4C" : (node.status === "GOOD" ? "#A0522D" : "#f59e0b");

          const treeCircle = L.circle([node.lat, node.lng], {
            radius: radiusMeters,
            color: statusColor,
            weight: 1.5,
            fillColor: statusColor,
            fillOpacity: 0.35,
          }).addTo(map);

          treeCircle.bindTooltip(
            `<div class="text-[10px] font-bold p-1 leading-tight">
              <span class="text-[#8D5B4C]">🌳 شجرة زيتون #${node.id}</span><br/>
              <span class="text-slate-200">قطر العرش: ${node.canopyDiameterM}m (${node.canopyAreaM2} m²)</span><br/>
              <span class="text-emerald-400">الصحة: ${node.healthScore}% (${node.status})</span>
            </div>`,
            { direction: "top", opacity: 0.95 }
          );
        });
      }
    } else if (satelliteMode === "SAVI" && satelliteData?.savi?.overlayDataUrl && bounds.isValid()) {
      L.imageOverlay(satelliteData.savi.overlayDataUrl, bounds, { opacity: 0.88 }).addTo(map);
    } else if (satelliteMode === "NDVI" && satelliteData?.ndvi?.overlayDataUrl && bounds.isValid()) {
      L.imageOverlay(satelliteData.ndvi.overlayDataUrl, bounds, { opacity: 0.88 }).addTo(map);
    } else if (satelliteMode === "NDWI" && satelliteData?.ndwi?.overlayDataUrl && bounds.isValid()) {
      L.imageOverlay(satelliteData.ndwi.overlayDataUrl, bounds, { opacity: 0.88 }).addTo(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [geoPolygon, satelliteMode, satelliteData]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={containerRef} className="w-full h-full z-0" />
      {/* Subtle UI gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16212b] via-[#16212b]/20 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#16212b] to-transparent pointer-events-none z-10" />
    </div>
  );
}
