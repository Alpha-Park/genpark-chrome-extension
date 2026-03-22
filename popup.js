document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getDeals"}, function(response) {
            const container = document.getElementById('deals-container');
            if (response && response.dealFound) {
                container.innerHTML = `
                    <div class="deal-card">
                        <h3>${response.productName}</h3>
                        <div class="deal-price">Retailer: $${response.retailPrice}</div>
                        <div class="genpark-price">GenPark Network: $${response.genparkPrice} (-${response.savings}%)</div>
                        <button id="arbitrageBtn">Execute Arbitrage Buy</button>
                    </div>
                `;
                document.getElementById('arbitrageBtn').addEventListener('click', () => {
                    document.getElementById('arbitrageBtn').innerText = "Processing via GenPark Wallet...";
                    document.getElementById('arbitrageBtn').style.background = "#4CAF50";
                });
            } else {
                container.innerHTML = `<div style="text-align:center; color:#666; font-size: 13px; padding: 20px 0;">Agent is idle. No significant arbitrage detected on this page.</div>`;
            }
        });
    });
});
