"use-strict";

import getData from "./api.js";

let searchForm = document.querySelector("#searchForm");
let dateInput = document.querySelector("#date");
let today = document.querySelector("#today");
let tomorrow = document.querySelector("#tomorrow");
let fromWhereSelect = document.querySelector("#from-where");
let toWhereSelect = document.querySelector("#to-where");
let locationChangeButton = document.querySelector("#location-change");
let locations = [];

const setDate = (date) => {
  dateInput.value =
    date === "today"
      ? moment().format("yyyy-MM-DD")
      : moment().add(1, "days").format("yyyy-MM-DD");
};

const getLocations = async () => {
  const { data } = await getData("/location/getbuslocations");
  const filterData = data.slice(0, 10);
  let option = "";
  filterData.forEach((location) => {
    option += `<option value="${location.id}"> ${location.name} </option>`;
  });
  locations = filterData;
  fromWhereSelect.innerHTML = option;
  toWhereSelect.innerHTML = option;
};

const handleForm = (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());

  if (fromWhereSelect.value !== toWhereSelect.value) {
    localStorage.setItem("location", JSON.stringify(formData));
    window.location.href = "/ticket.html";
  } else {
    Toastify({
      text: "Lütfen Farklı Şehirler Seçiniz..",
      duration: 3000,
      newWindow: false,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #d23b38, #d23b38)",
      },
    }).showToast();
  }
};

const locationChange = () => {
  const newOrigin = locations.find(
    (location) => location.id == fromWhereSelect.value
  );
  const newDestination = locations.find(
    (location) => location.id == toWhereSelect.value
  );
  fromWhereSelect.value = newDestination.id;
  toWhereSelect.value = newOrigin.id;
};

searchForm.addEventListener("submit", handleForm);

today.addEventListener("click", () => {
  tomorrow.classList.remove("active");
  today.classList.add("active");

  setDate("today");
});

tomorrow.addEventListener("click", () => {
  today.classList.remove("active");
  tomorrow.classList.add("active");

  setDate("tomorrow");
});

locationChangeButton.addEventListener("click", locationChange);

window.addEventListener("load", () => {
  getLocations();
  setDate("tomorrow");
});
