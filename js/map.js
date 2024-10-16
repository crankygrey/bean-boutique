window.onload = function() {
    const { Map, View } = ol;
    const { OSM, Vector: VectorSource } = ol.source;
    const { Tile: TileLayer, Vector: VectorLayer } = ol.layer;
    const { Point } = ol.geom;
    const { Feature } = ol;
    const { Icon, Style } = ol.style;
    const { fromLonLat } = ol.proj;

    // Create the map
    const map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM(),
                className: 'ol_bw'
            })
        ],
        view: new View({
            center: fromLonLat([-118.237183, 34.059647]), // Philippe The Original coordinates
            zoom: 16,
        }),
    });

    // Create a marker feature
    const marker = new Feature({
        geometry: new Point(fromLonLat([-118.237183, 34.059647])), // Coordinates of the marker
    });

    // Define marker style (optional)
    marker.setStyle(new Style({
        image: new Icon({
            src: 'images/location-dot.png', // Marker icon URL
            scale: 0.09, // Adjust the size of the marker
        }),
    }));

    // Create a vector source and layer to hold the marker
    const vectorSource = new VectorSource({
        features: [marker],
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    // Add the marker layer to the map
    map.addLayer(vectorLayer);
};
