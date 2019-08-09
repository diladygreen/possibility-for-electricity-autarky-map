const COLOR_LIKELY_POSSIBLE = 'hsla(89, 47%, 40%, 0.6)';
const COLOR_MAYBE_POSSIBLE = 'hsla(89, 47%, 40%, 0.4)';
const COLOR_LIKELY_IMPOSSIBLE = 'hsla(2, 78%, 35%, 0.3)';
const COLOR_IMPOSSIBLE = 'hsla(2, 78%, 35%, 0.5)'
const COLOR_MISSING = 'hsla(0, 0%, 0%, 0)'
const COLOR_OUTLINE = 'hsla(0, 0%, 100%, 1)'
const COLOR_HOVER = 'white';

const CONDITIONAL_COLORING = [
    "step",
    ["coalesce", ["get", "normed_potential"], -1], // catch NaNs
    COLOR_MISSING,
    0,
    COLOR_IMPOSSIBLE,
    1,
    COLOR_LIKELY_IMPOSSIBLE,
    2,
    COLOR_MAYBE_POSSIBLE,
    10,
    COLOR_LIKELY_POSSIBLE
]
const CONDITIONAL_BORDER = ["case",
    ["boolean", ["feature-state", "hover"], false],
    3,
    0.0
]

function styleMap(map) {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map.addSource("continental", {
        "type": "vector",
        "url": "mapbox://timtroendle.4dejrjjc"
    });
    map.addSource("national", {
        "type": "vector",
        "url": "mapbox://timtroendle.30lyyg8u"
    });
    map.addSource("regional", {
        "type": "vector",
        "url": "mapbox://timtroendle.40wfky8r"
    });
    map.addSource("municipal", {
        "type": "vector",
        "url": "mapbox://timtroendle.2b0t5e5j"
    });

    map.addLayer({
        "id": "continental",
        "type": "fill",
        "source": "continental",
        "source-layer": "continentaltechnicalpotential",
        "maxzoom": 3.5,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-outline-color": COLOR_OUTLINE
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "continental-borders",
        "type": "line",
        "source": 'continental',
        "source-layer": "continentaltechnicalpotential",
        "maxzoom": 3.5,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "national",
        "type": "fill",
        "source": "national",
        "source-layer": "nationaltechnicalpotential",
        "minzoom": 3.5,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-opacity": 1,
            "fill-outline-color": COLOR_OUTLINE
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "national-borders",
        "type": "line",
        "source": 'national',
        "source-layer": "nationaltechnicalpotential",
        "minzoom": 3.5,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "regional",
        "type": "fill",
        "source": "regional",
        "source-layer": "regionaltechnicalpotential",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "fill-outline-color": COLOR_OUTLINE,
            "fill-color": CONDITIONAL_COLORING
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "regional-borders",
        "type": "line",
        "source": 'regional',
        "source-layer": "regionaltechnicalpotential",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipal",
        "type": "fill",
        "source": "municipal",
        "source-layer": "municipaltechnicalpotential",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-outline-color": COLOR_OUTLINE
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipal-borders",
        "type": "line",
        "source": 'municipal',
        "source-layer": "municipaltechnicalpotential",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-country",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.0u8aumaa'
        },
        "source-layer": "national-boundaries-national--5fk3kj",
        "minzoom": 4,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-regional",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.djc7n2y2'
        },
        "source-layer": "national-boundaries-regional--0omid4",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-municipal",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.b0f7q184'
        },
        "source-layer": "national-boundaries-municipal-5xb816",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
}
