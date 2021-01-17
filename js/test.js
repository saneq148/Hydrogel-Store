const fetchCities = (event) => {
    axios.post('https://api.novaposhta.ua/v2.0/json/Address/searchSettlements/', {
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName": event.target.value,
            "Limit": 5
        }
    }).then(response => {
        if (response.data.data[0].length !== 0) {
            changeDataList(response.data.data[0].Addresses);
        }
    }).catch();
};

const fetchWarehouses = () => {
    axios.post('https://api.novaposhta.ua/v2.0/json/Address/fetchWarehouses/', {
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityName": document.getElementById("cityNP").value
        }
    }).then(response => {
        renderWarehousesOptions(response.data.data);
        warehouseInput.disabled = false;

    }).catch(error => {
        console.log(error);
    });
};

let cityInput = document.querySelector('.city-input');
cityInput.addEventListener('input', fetchCities);
let warehouseInput = document.querySelector('.warehouse-input');
let regionInput = document.querySelector('#order-region');
regionInput.addEventListener('change', () => { cityInput.disabled = false; cityInput.value = ""; warehouseInput.disabled = true; warehouseInput.innerHTML = "<option value=''>Виберіть відділення</option>"; });

function changeDataList(array) {
    let dropDownItems = document.querySelector('.cities-list');
    let region = document.getElementById('order-region');
    dropDownItems.innerHTML = "";
    array.forEach(element => {
        if (element.Area === region.value) {
            let item = document.createElement("li");
            item.innerHTML = element.MainDescription;
            item.addEventListener('click', setCityInputFromDropdown);
            dropDownItems.append(item);
        }
    });
    if (dropDownItems.innerHTML !== "") {
        if (cityInput.value.toLowerCase() === dropDownItems.children[0].innerHTML.toLowerCase()) {
            dropDownItems.innerHTML = "";
            warehouseInput.disabled = false;
            warehouseInput.innerHTML = "<option value='' selected disabled hidden>Пошук...</option>"
            warehouseInput.dataset.ref = array[0].MainDescription;
            fetchWarehouses();
        }
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

const dropDownMenu = document.getElementsByClassName('city-input__list')[0];
cityInput.onfocus = () => { dropDownMenu.style.visibility = 'visible'; dropDownMenu.style.opacity = '1'; }
cityInput.onblur = () => { setTimeout(() => dropDownMenu.style.visibility = 'hidden', 200) };

const setCityInputFromDropdown = (event) => {
    cityInput.value = event.target.innerHTML;
    dropDownMenu.style.opacity = '0';
    fetchWarehouses();
}

const citiesListItem = document.getElementsByClassName('cities-list__item');

for (let i = 0; i < citiesListItem.length; i++) {
    let item = citiesListItem[i];
    item.addEventListener('click', setCityInputFromDropdown);
}