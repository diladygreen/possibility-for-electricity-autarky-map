const COLOR_LIKELY_POSSIBLE = 'hsla(89, 47%, 40%, 0.4)';
const COLOR_MAYBE_POSSIBLE = 'hsla(89, 47%, 40%, 0.2)';
const COLOR_LIKELY_IMPOSSIBLE = 'hsla(2, 78%, 35%, 0.2)';
const COLOR_IMPOSSIBLE = 'hsla(2, 78%, 35%, 0.4)';
const COLOR_HOVER = 'white';

const CONDITIONAL_COLORING = [
    "step",
    ["get", "normed_potential"],
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
    2,
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
    map.addSource("europe", {
        "type": "vector",
        "url": "mapbox://timtroendle.91r5pfch"
    });
    map.addSource("country", {
        "type": "vector",
        "url": "mapbox://timtroendle.b2se99fd"
    });
    map.addSource("region", {
        "type": "vector",
        "url": "mapbox://timtroendle.0dly3483"
    });
    map.addSource("municipality", {
        "type": "vector",
        "url": "mapbox://timtroendle.8lu7xodw"
    });

    map.addLayer({
        "id": "europe",
        "type": "fill",
        "source": 'europe',
        "source-layer": "merged-results-5c45qb",
        "maxzoom": 3.5,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "europe-borders",
        "type": "line",
        "source": 'europe',
        "source-layer": "merged-results-5c45qb",
        "maxzoom": 3.5,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "country",
        "type": "fill",
        "source": 'country',
        "source-layer": "merged-results-33ke27",
        "minzoom": 3.5,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-opacity": 1,
            "fill-outline-color": "hsl(0, 1%, 100%)"
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "country-borders",
        "type": "line",
        "source": 'country',
        "source-layer": "merged-results-33ke27",
        "minzoom": 3.5,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "region",
        "type": "fill",
        "source": 'region',
        "source-layer": "merged-results-2jcgj1",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "fill-outline-color": [
            "step",
            ["get", "normed_potential"],
            "#A01914",
            1,
            "hsl(89, 47%, 40%)",
            13321.236786164578,
            "#679436"
            ],
            "fill-color": CONDITIONAL_COLORING
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "region-borders",
        "type": "line",
        "source": 'region',
        "source-layer": "merged-results-2jcgj1",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipality",
        "type": "fill",
        "source": 'municipality',
        "source-layer": "merged-results-4xkc2x",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-outline-color": [
                "step",
                ["get", "normed_potential"],
                "#a01914",
                1,
                "hsl(89, 47%, 40%)",
                10802090.043295115,
                "#679436"
            ]
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipality-borders",
        "type": "line",
        "source": 'municipality',
        "source-layer": "merged-results-4xkc2x",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);

    map.setLayoutProperty('admin-2-boundaries', 'visibility', 'none');
    map.setLayoutProperty('admin-2-boundaries-dispute', 'visibility', 'none');
    map.setLayoutProperty('admin-2-boundaries-bg', 'visibility', 'none');
    map.setLayoutProperty('admin-3-4-boundaries', 'visibility', 'none');
    map.setLayoutProperty('admin-3-4-boundaries-bg', 'visibility', 'none');
    map.setLayoutProperty('admin-3-4-boundaries', 'visibility', 'none');
    map.setLayoutProperty('admin-3-4-boundaries-bg', 'visibility', 'none');
    map.setLayoutProperty('admin-country', 'visibility', 'none');
    map.setLayoutProperty('admin-country-disputed', 'visibility', 'none');
    map.setLayoutProperty('admin-state-province', 'visibility', 'none');
}
