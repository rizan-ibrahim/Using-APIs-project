const topCrypto = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
const solanaChain = "https://api.coingecko.com/api/v3/coins/solana";

const createTable = async () => {
    const userInterface = document.getElementById("user-interface");

    // Create a container for the table
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    // Create table
    const table = document.createElement("table");
    table.classList.add("crypto-table");

    // Create thead (Header)
    const thead = document.createElement("thead");
    thead.classList.add("header");
    thead.innerHTML = `
        <tr>
            <th>#Name</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Market Cap</th>
            <th>Circulating Supply</th>
            <th>Change</th>
            <th>Price Graph</th>
        </tr>
    `;

    // Create tbody (Data rows)
    const tbody = document.createElement("tbody");
    tbody.id = "token-body";

    

    // Append elements
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    userInterface.appendChild(tableContainer);

    // Fetch and insert data
    fetchCoinsData();
};

const fetchCoinsData = async () => {
    try {
        const response = await fetch(topCrypto);
        const data = await response.json();
        const tbody = document.getElementById("token-body");

        tbody.innerHTML = data
            .slice(0, 100) // Display first 20 coins
            .map((coin,num) => `
                <tr>
                    <td> ${num+1} <img src="${coin.image}" alt="${coin.name}" width="16px"> ${coin.name} </td>
                    <td>$${coin.current_price.toFixed(4)}</td>
                    <td>$${coin.total_volume.toLocaleString(1)}</td>
                    <td>$${coin.market_cap.toLocaleString(1)}</td>
                    <td>${coin.circulating_supply.toLocaleString()}</td>
                    <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
                    <td></td>
                </tr>
            `)
            .join("");
    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
};

window.onload = createTable;
