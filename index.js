
import { topCrypto } from "./constant.js";

let cryptoData=[];

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
    const inputContainer = document.createElement("div");
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
    const cryptoInfo = document.createElement("div");
    cryptoInfo.classList.add("crypto-info");




    const tbody = document.createElement("tbody");
    tbody.id = "token-body";

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

    

    // Append elements
    userInterface.appendChild(header);
    dataContainer.appendChild(table);
    userInterface.appendChild(dataContainer);
    userInterface.appendChild(infoSection);
    inputContainer.appendChild(input);
    inputContainer.appendChild(searchBtn);
    infoSection.appendChild(inputContainer);
    infoSection.appendChild(cryptoInfo);


    searchBtn.addEventListener("click", infoFunction);

    input.addEventListener('keypress', (event)=>{
        if (event.key==="Enter"){
            infoFunction();
        }

    });


    await fetchCoinsData();
};

const fetchCoinsData = async () => {
    try {

        const response = await fetch(topCrypto);
        const data = await response.json();
        cryptoData=data;
        console.log("Data fetched:", cryptoData);

        const tbody = document.getElementById("coins-body");

        tbody.innerHTML = data
            .slice(0, 200) 
            .map((coin,num) => `
                <tr>
                    <td> ${num+1} <img src="${coin.image}" alt="${coin.name}" width="16px"> ${coin.name} </td>
                    <td>$${coin.current_price.toFixed(2)}</td>
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


//search function.
 const infoFunction= ()=>{

    
const inputSearch=document.getElementById('search')
const resualt=document.querySelector('.crypto-info')

const inputValue= inputSearch.value.trim().toLowerCase();
console.log("Searching for:", inputValue);
//
if (cryptoData.length === 0) {
    resualt.innerHTML = '<p>Data is still loading... Try again in a moment.</p>';
    console.warn("Crypto data is empty.");

    return;
}
//

const filterData=cryptoData.find(coin=>coin.name.toLowerCase()===inputValue);

if(filterData){
    resualt.innerHTML=`
        ${filterData.image ? `<img src="${filterData.image}" width="80px" alt="${filterData.name}">` : ''}
    <h2>${filterData.name}</h2>
    <p>Price: $${filterData.current_price.toFixed(4)}</p>
    <p>Volume: $${filterData.total_volume.toLocaleString()}</p>
    <p>Market Cap: $${filterData.market_cap.toLocaleString()}</p>
    <p>circulating supply: $${filterData.circulating_supply.toLocaleString()}</p>
    <p>max-supply: $${filterData.max_supply.toLocaleString()}</p>





    `
}else{
    resualt.innerHTML='<p>there is no match for this crypto</p>';
}

};




window.onload = createTable; 
