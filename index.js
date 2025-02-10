
import { topCrypto } from "./constant.js";


const createTable = async () => {
    const userInterface = document.getElementById("user-interface");

   
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data-container");

    const table = document.createElement("table");
    table.id = "coins-body";



//info section
    const infoSection = document.createElement("div");
    infoSection.classList.add("info-section");
//search input container
    const inputContainer = document.createElement("inputcontainer");
    inputContainer.classList.add("input-container");

    
//search input
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "type coin name";
    input.id = "search";
//search button
    const searchBtn = document.createElement("button");
    searchBtn.innerHTML = "Search";
    searchBtn.id="search-btn";
//crypto infoconatiner
    const crptoInfo = document.createElement("div");
    crptoInfo.classList.add("crypto-info");




    const tbody = document.createElement("tbody");
    tbody.id = "token-body";

    const header = document.createElement("header");
    header.classList.add("header");
    header.innerHTML = `
       
        <div>#name</div>
        <div>Price</div>
        <div>Volume</div>
        <div>Market Cap</div>
        <div>Circulating Supply</div>
        <div>Price Change (24h)</div>
    `;

    

    // Append elements
    userInterface.appendChild(header);
    dataContainer.appendChild(table);
    userInterface.appendChild(dataContainer);
    userInterface.appendChild(infoSection);
    inputContainer.appendChild(input);
    inputContainer.appendChild(searchBtn);
    infoSection.appendChild(inputContainer);
    infoSection.appendChild(crptoInfo);


    // Fetch and insert data
    fetchCoinsData();
};

const fetchCoinsData = async () => {
    try {
        const response = await fetch(topCrypto);
        const data = await response.json();
        const tbody = document.getElementById("coins-body");

        tbody.innerHTML = data
            .slice(0, 200) 
            .map((coin,num) => `
                <tr>
                    <td> ${num+1} <img src="${coin.image}" alt="${coin.name}" width="16px"> ${coin.name} </td>
                    <td>$${coin.current_price.toFixed(4)}</td>
                    <td>$${coin.total_volume.toLocaleString(1)}</td>
                    <td>$${coin.market_cap.toLocaleString(1)}</td>
                    <td>${coin.circulating_supply.toLocaleString(1)}</td>
                    <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
                </tr>
            `)
            .join("");
    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
};

window.onload = createTable;
