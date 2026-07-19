import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-draw";
import { area } from "@turf/area";
import { polygon as turfPolygon } from "@turf/helpers";

// Fix Leaflet default marker icons (broken by bundlers)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

interface FieldMapProps {
  onMapDraw?: (geoJson: GeoJSON.Polygon, areaHa: number) => void;
  geoPolygon?: any;
}

export default function FieldMap({ onMapDraw, geoPolygon }: FieldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const onMapDrawRef = useRef(onMapDraw);

  useEffect(() => {
    onMapDrawRef.current = onMapDraw;
  }, [onMapDraw]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // 1. Define Base Layers
    const streetMap = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    const satelliteMap = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      }
    );

    // 2. Initialize map with Satellite as default
    const map = L.map(containerRef.current, {
      center: [33.89, -5.55],
      zoom: 13,
      layers: [satelliteMap], // Default layer
    });
    mapRef.current = map;

    // 3. Add Layer Control
    const baseMaps = {
      "Satellite": satelliteMap,
      "Street Map": streetMap,
    };
    L.control.layers(baseMaps).addTo(map);

    // 4. Drawing layer
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // If an existing polygon is provided, display it
    if (geoPolygon) {
      const geojsonLayer = L.geoJSON(geoPolygon, {
        style: {
          color: "#4ade80", // Bright green
          fillColor: "#4ade80",
          fillOpacity: 0.25,
          weight: 3,
        },
      });
      geojsonLayer.addTo(drawnItems);
      try {
        const bounds = geojsonLayer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [30, 30] });
        }
      } catch (e) {
        console.error("Failed to fit map bounds to geoPolygon:", e);
      }
    }

    // 5. Draw controls (only if draw callback is provided)
    if (onMapDraw) {
      const drawControl = new L.Control.Draw({
        position: "topright",
        draw: {
          polygon: {
            shapeOptions: {
              color: "#4ade80", // Bright green
              fillColor: "#4ade80",
              fillOpacity: 0.3,
              weight: 3,
            },
          },
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polyline: false,
        },
        edit: {
          featureGroup: drawnItems,
        },
      });
      map.addControl(drawControl);

      // Handle draw:created
      map.on(L.Draw.Event.CREATED, (e: any) => {
        drawnItems.clearLayers();
        drawnItems.addLayer(e.layer);

        const latlngs = (e.layer as L.Polygon).getLatLngs()[0] as L.LatLng[];
        const coords = latlngs.map((ll) => [ll.lng, ll.lat]);
        coords.push(coords[0]); // close ring

        const geoJsonPolygon: GeoJSON.Polygon = {
          type: "Polygon",
          coordinates: [coords],
        };

        const turfPoly = turfPolygon([coords]);
        const areaM2 = area(turfPoly);
        const areaHa = parseFloat((areaM2 / 10000).toFixed(2));

        if (onMapDrawRef.current) {
          onMapDrawRef.current(geoJsonPolygon, areaHa);
        }
      });
    }

    // Fix map sizing after mount
    setTimeout(() => map.invalidateSize(), 200);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [geoPolygon]);

  return (
    <div
      ref={containerRef}
      className="rounded-xl overflow-hidden border border-white/10 h-full min-h-[250px] z-0 shadow-2xl"
    />
  );
}
