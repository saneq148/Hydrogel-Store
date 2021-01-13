function initMap() {
    const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 15,
        center: { lat: 50.783026010700000, lng: 25.364062786100000 },
    });
    const beachMarker = new google.maps.Marker({
        position: { lat: 50.783026010700000, lng: 25.364062786100000 },
        map,
    });
}

function setMapCoords(wareHouses) {
    const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 10,
        center: { lat: 50.783026010700000, lng: 25.364062786100000 },
    });
    const image = {
        url:
            "https://novaposhta.ua/uploads/misc/img/ico/punkt_priema.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
    };
    for (let i = 0; i < wareHouses.length; i++) {
        const warehouse = wareHouses[i];
        let marker = new google.maps.Marker({
            position: { lat: parseFloat(warehouse.Latitude), lng: parseFloat(warehouse.Longitude) },
            map: map,
            labelContent: "markerLabel",
            title: warehouse.Description,
            icon: image,
            label: {
                text: warehouse.Number,
                color: "#000000",
                fontSize: "16px",
                fontWeight: "bold"
            },
            zIndex: parseInt(warehouse.Number),
        });

    }
}