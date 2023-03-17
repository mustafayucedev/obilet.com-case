"use-strict";

import getData from "./api.js";

let searchForm = document.querySelector("#searchForm");
let dateInput = document.querySelector("#date");
let today = document.querySelector("#today");
let tomorrow = document.querySelector("#tomorrow");
let fromWhereSelect = document.querySelector("#from-where");
let toWhereSelect = document.querySelector("#to-where");

const locationChange = () => {
  alert("ok!");
};

// const dateToday = () => {
//   let date = new Date();
//   let day = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();

//   let today;

//   if (month <= 9) {
//     today = `${year}-${"0" + month}-${day}`;
//   } else {
//     today = `${year}-${month}-${day}`;
//   }

//   dateInput.value = today;
// };

// const dateTomorrow = () => {
//   let date = new Date();
//   let day = date.getDate() + 1;
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();

//   let tomorrow;

//   if (month <= 9) {
//     tomorrow = `${year}-${"0" + month}-${day}`;
//   } else {
//     tomorrow = `${year}-${month}-${day}`;
//   }

//   dateInput.value = tomorrow;
// };

getData("/journey/getbusjourneys", {
  "origin-id": 349,
  "destination-id": 356,
  "departure-date": "2023-03-17",
});

const getLocations = async () => {
  const { data } = await getData("/location/getbuslocations");
  const filterData = data.slice(0, 10);
  let option = "";
  filterData.forEach((location) => {
    option += `<option value="${location.id}"> ${location.name} </option>`;
  });
  fromWhereSelect.innerHTML = option;
  toWhereSelect.innerHTML = option;
};

const handleForm = (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());
  //   const { data } = await getData("/journey/getbusjourneys", formData);

  localStorage.setItem("location", JSON.stringify(formData));
};

today.addEventListener("click", () => {
  tomorrow.classList.remove("active");
  today.classList.add("active");
});

tomorrow.addEventListener("click", () => {
  today.classList.remove("active");
  tomorrow.classList.add("active");
});

window.addEventListener("load", () => {
  //   dateTomorrow();
  getLocations();
});

searchForm.addEventListener("submit", handleForm);
