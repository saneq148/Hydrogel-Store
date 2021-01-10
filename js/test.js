const fetchUsers = (event) => {
    axios.post('https://api.novaposhta.ua/v2.0/json/Address/searchSettlements/', {
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName": event.target.value,
            "Limit": 5
        }
    }).then(response => {
        changeDataList(response.data.data[0].Addresses);
    }).catch(error => {
        console.log(error);
    });
};

const getWarehouses = () => {
    axios.post('https://api.novaposhta.ua/v2.0/json/Address/getWarehouses/', {
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityName": document.getElementById("order-warehouse").dataset.ref
        }
    }).then(response => {
        renderWarehousesOptions(response.data.data);
    }).catch(error => {
        console.log(error);
    });
};

//fetchUsers("льв");

let cityInput = document.querySelector('.city-input');
cityInput.addEventListener('input', fetchUsers);
let warehouseInput = document.querySelector('.warehouse-input');
let regionInput = document.querySelector('#order-region');
regionInput.addEventListener('change', () => { cityInput.disabled = false; });

function changeDataList(array) {
    let dataList = document.getElementById('goroda');
    let region = document.getElementById('order-region');
    dataList.innerHTML = "";
    array.forEach(element => {
        if (element.Area === region.value) {
            let option = document.createElement("option");
            option.value = element.MainDescription;
            dataList.append(option);
        }
    });
    if (cityInput.value === dataList.children[0].value) {
        dataList.innerHTML = "";
        document.getElementById('order-warehouse').disabled = false;
        warehouseInput.dataset.ref = array[0].MainDescription;
        getWarehouses();
    }
}

function renderWarehousesOptions(array) {
    let orderWarehouse = document.getElementById('order-warehouse');
    orderWarehouse.innerHTML = "";
    array.forEach(element => {
        let option = document.createElement("option");
        option.value = element.Description;
        option.innerText = element.Description;
        orderWarehouse.append(option);
    });
}
