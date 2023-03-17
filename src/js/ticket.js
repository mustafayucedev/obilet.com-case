import getData from "./api.js";
import { dateFormatter } from "./index.js";

const ticketWrapper = document.querySelector("#ticket");
const ticketHeader = document.querySelector("#ticket-header");

const getTickets = async () => {
  const query = JSON.parse(localStorage.getItem("location"));
  const { data } = await getData("/journey/getbusjourneys", query);
  ticketBindUI(data);
  ticketBindHeaderUI(data[0]);
};

const ticketBindUI = (data) => {
  let ticket = "";
  if (data) {
    data.forEach((item) => {
      const {
        journey: { currency, arrival, departure, destination, origin },
      } = item;
      ticket += `
          <div class="ticket-item">
              <div class="ticket-header">
                  <div class="ticket-hour">
                  <div class="ticket-hour-item">
                      <span>KALKIŞ</span>
                      <strong> ${dateFormatter(departure, "LT")} </strong>
                  </div>
                  <div class="ticket-hour-item">
                      <span>VARIŞ</span>
                      <strong> ${dateFormatter(arrival, "LT")} </strong>
                  </div>
                  </div>
                  <div class="ticket-price"> ${
                    item.journey["internet-price"]
                  } ${currency} </div>
              </div>
              <div class="ticket-station">
                  ${origin} - ${destination}
              </div>
          </div>
        `;
    });
    ticketWrapper.innerHTML = ticket;
  }
};

const ticketBindHeaderUI = ({
  journey: { origin, destination, departure },
}) => {
  ticketHeader.innerHTML = `
    <h1> ${origin} - ${destination} </h1>
    <div> ${dateFormatter(departure, "LL")} </div>
  `;
};

getTickets();
