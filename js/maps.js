/*function initMap() {
    const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 15,
        center: { lat: 50.783026010700000, lng: 25.364062786100000 },
    });
}*/

function setMapCoords(wareHouses) {
    const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 8,
        center: { lat: parseFloat(wareHouses[0].Latitude), lng: parseFloat(wareHouses[0].Longitude) },
        disableDefaultUI: true,
    });
    const image = {
        url:
            "https://gidrogel.store/assets/icons/marker.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(44, 40),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 40),
    };
    for (let i = 0; i < wareHouses.length; i++) {
        const warehouse = wareHouses[i];
        if (warehouse.CategoryOfWarehouse !== "Postomat") {
            let marker = new google.maps.Marker({
                position: { lat: parseFloat(warehouse.Latitude), lng: parseFloat(warehouse.Longitude) },
                map: map,
                labelContent: "markerLabel",
                title: warehouse.Description,
                //icon: image,
                label: {
                    text: "#" + warehouse.Number,
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: "bold"
                },
                zIndex: parseInt(warehouse.Number),
            });
            marker.addListener("click", logg)
        }
    }
}

function logg() {
    console.log(event.target.title);
}