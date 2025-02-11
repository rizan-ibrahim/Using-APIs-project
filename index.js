import { topCrypto } from "./constant.js";

let cryptoData = [];
let currentIndex = 0;

const createTable = async () => {
  const userInterface = document.getElementById("user-interface");

  const dataContainer = document.createElement("div");
  dataContainer.classList.add("data-container");

  const errorMessage = document.createElement("div");
  errorMessage.id = "error-message";

  const tbody = document.createElement("tbody");
  tbody.id = "token-body";

  // info section
  const infoSection = document.createElement("div");
  infoSection.classList.add("info-section");
  // search input container
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  // search input
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "type coin name";
  input.id = "search";
  // search button
  const searchBtn = document.createElement("button");
  searchBtn.innerHTML = "Search";
  searchBtn.id = "search-btn";

  const filterDive = document.createElement("div");
  filterDive.classList.add("filter-div");

  const filterBtn = document.createElement("button");
  filterBtn.innerHTML = "more crypto";
  filterBtn.id = "filterBtn";

  // crypto info container
  const cryptoInfo = document.createElement("div");
  cryptoInfo.classList.add("crypto-info");

  const header = document.createElement("div");
  header.classList.add("header");
  header.innerHTML = `
    <div>#name</div>
    <div>Price</div>
    <div>Volume</div>
    <div>Market Cap</div>
    <div>Circulating Supply</div>
    <div>Price Change (24h)</div>
  `;

  userInterface.appendChild(header);
  dataContainer.appendChild(tbody);
  dataContainer.appendChild(errorMessage);
  userInterface.appendChild(dataContainer);
  userInterface.appendChild(infoSection);
  inputContainer.appendChild(input);
  inputContainer.appendChild(searchBtn);
  infoSection.appendChild(inputContainer);
  filterDive.appendChild(filterBtn);
  infoSection.appendChild(filterDive);
  infoSection.appendChild(cryptoInfo);

  filterBtn.addEventListener("click", loadMoreCoins);
  searchBtn.addEventListener("click", infoFunction);
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      infoFunction();
    }
  });

  await fetchCoinsData();
};

const fetchCoinsData = async () => {
  try {
    const response = await fetch(`${topCrypto}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("HTTP error: report this to the service please.");
    }
    cryptoData = data;
    console.log("Data fetched:", cryptoData);

    // Load initial coins (first 30)
    loadMoreCoins();
  } catch (error) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = `Error fetching crypto data: ${error}`;
    console.error("Error fetching crypto data:", error);
  }
};

const loadMoreCoins = () => {
  const tbody = document.getElementById("token-body");

  const coinsToDisplay = cryptoData.slice(currentIndex, currentIndex + 20);

  currentIndex += 20;

  tbody.innerHTML += coinsToDisplay
    .map(
      (coin, num) => `
        <tr>
          <td> ${currentIndex - 20 + num + 1} <img src="${coin.image}" alt="${
        coin.name
      }" width="16px"> ${coin.name} </td>
          <td>$${coin.current_price.toFixed(2)}</td>
          <td>$${coin.total_volume.toLocaleString(1)}</td>
          <td>$${coin.market_cap.toLocaleString(1)}</td>
          <td>${coin.circulating_supply.toLocaleString(1)}</td>
          <td>${
            coin.price_change_percentage_24h
              ? coin.price_change_percentage_24h.toFixed(1) + "%"
              : "N/A"
          }</td>
        </tr>
      `
    )
    .join("");
};

// Search function
const infoFunction = () => {
  const inputSearch = document.getElementById("search");
  const result = document.querySelector(".crypto-info");

  const inputValue = inputSearch.value.trim().toLowerCase();
  console.log("Searching for:", inputValue);

  if (cryptoData.length === 0) {
    result.innerHTML = "<p>Data is still loading... Try again in a moment.</p>";
    console.warn("Crypto data is empty.");
    return;
  }

  const filterData = cryptoData.find(
    (coin) => coin.name.toLowerCase() === inputValue
  );

  if (filterData) {
    result.innerHTML = `
      ${
        filterData.image
          ? `<img src="${filterData.image}" width="80px" alt="${filterData.name}">`
          : ""
      }
      <h2>${filterData.name}</h2>
      <p>Price: $${filterData.current_price.toFixed(4)}</p>
      <p>Volume: $${filterData.total_volume.toLocaleString()}</p>
      <p>Market Cap: $${filterData.market_cap.toLocaleString()}</p>
      <p>Circulating Supply: $${filterData.circulating_supply.toLocaleString()}</p>
      <p>Max Supply: $${filterData.max_supply.toLocaleString()}</p>
    `;
  } else {
    result.innerHTML = "<p>There is no match for this crypto</p>";
  }
};

window.onload = createTable;
