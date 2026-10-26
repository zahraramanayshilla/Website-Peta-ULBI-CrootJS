import { createMap, addGeoJSON, fitMap } from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/map.js";

const mapId = "map";
const layerFiles = {
  roads: "data/jalan.geojson",
  buildings: "data/bangunan.geojson",
  points: "data/lokasi.geojson"
};

const layerStyles = {
  roads: {
    stroke: "#2386d0",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    fill: "#2386d0",
    fillOpacity: 0.85
  },
  buildings: {
    stroke: "#d98c31",
    strokeWidth: 2,
    strokeOpacity: 1,
    fill: "#f6b95d",
    fillOpacity: 0.48
  },
  points: {
    stroke: "#ffffff",
    strokeWidth: 2,
    fill: "#159b86",
    radius: 7,
    fillOpacity: 1
  }
};

const layerData = {};
const removeLayer = {};
const toggles = {
  roads: document.getElementById("toggle-roads"),
  buildings: document.getElementById("toggle-buildings"),
  points: document.getElementById("toggle-points")
};

createMap(mapId, {
  center: [107.5758, -6.8734],
  zoom: 14,
  minZoom: 3,
  maxZoom: 19,
  zoomControl: true,
  scrollZoom: true
});

async function loadLayer(key) {
  const response = await fetch(layerFiles[key]);
  if (!response.ok) {
    throw new Error(`Tidak dapat memuat ${layerFiles[key]} (${response.status})`);
  }
  const geojson = await response.json();
  if (geojson.type !== "FeatureCollection" || !Array.isArray(geojson.features)) {
    throw new Error(`Format GeoJSON ${layerFiles[key]} tidak valid.`);
  }
  layerData[key] = geojson;
  document.getElementById(
    key === "roads" ? "road-count" : key === "buildings" ? "building-count" : "point-count"
  ).textContent = geojson.features.length;
}

function showLayer(key) {
  if (!layerData[key] || removeLayer[key]) return;
  removeLayer[key] = addGeoJSON(mapId, layerData[key], {
    style: layerStyles[key],
    popup: (feature) => {
      const properties = feature.properties || {};
      return Object.entries(properties)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");
    }
  });
}

function hideLayer(key) {
  if (removeLayer[key]) {
    removeLayer[key]();
    delete removeLayer[key];
  }
}

function updateLayer(key) {
  if (toggles[key].checked) showLayer(key);
  else hideLayer(key);
}

async function init() {
  try {
    await Promise.all(Object.keys(layerFiles).map(loadLayer));
    // Urutan layer: polygon lebih dulu, kemudian jalan, titik paling atas.
    ["buildings", "roads", "points"].forEach(updateLayer);
    const allData = {
      type: "FeatureCollection",
      features: Object.values(layerData).flatMap((collection) => collection.features)
    };
    fitMap(mapId, allData, 45);
  } catch (error) {
    console.error(error);
    const notice = document.createElement("div");
    notice.className = "error-notice";
    notice.textContent = `Gagal memuat data peta: ${error.message}. Jalankan melalui GitHub Pages atau server lokal, bukan membuka index.html langsung.`;
    document.querySelector(".map-section").prepend(notice);
  }
}

Object.entries(toggles).forEach(([key, checkbox]) => {
  checkbox.addEventListener("change", () => updateLayer(key));
});

document.getElementById("fit-button").addEventListener("click", () => {
  const visibleFeatures = Object.entries(layerData)
    .filter(([key]) => toggles[key].checked)
    .flatMap(([, collection]) => collection.features);
  if (visibleFeatures.length) {
    fitMap(mapId, { type: "FeatureCollection", features: visibleFeatures }, 45);
  }
});

init();
