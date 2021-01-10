const fetchUsers = (event) => {
    axios.post('https://api.novaposhta.ua/v2.0/json/Address/searchSettlements/', {
        "apiKey": "889910e37deb2da4113a7b0e2236333c",
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName": event.target.value,
            "Area": "Волинська",
            "Limit": 5
        }
    }).then(response => {
        changeDataList(response.data.data[0].Addresses);
    }).catch(error => {
        console.log(error);
    });
};

//fetchUsers("льв");

const cityInput = document.querySelector('.city-input');
cityInput.addEventListener('input', fetchUsers);

function changeDataList(array) {
    let dataList = document.getElementById('goroda');
    dataList.innerHTML = "";
    array.forEach(element => {
        let option = document.createElement("option");
        option.value = element.MainDescription;
        dataList.append(option);
        console.log(element);
    });
    console.log(dataList.children[0].value)
    console.log(dataList.childNodes.length)
    if (dataList.childNodes.length === 1 && cityInput.value === dataList.children[0].value) {
        dataList.innerHTML = "";
    }
}