console.log("GenPark Chrome Extension Active.");

let dealData = { dealFound: false };

function extractPrice() {
    const priceElement = document.querySelector('.a-price .a-offscreen') || document.querySelector('#corePrice_feature_div .a-price .a-offscreen');
    if (!priceElement) return null;
    return parseFloat(priceElement.innerText.replace('$', '').replace(/,/g, ''));
}

function analyzePage() {
    const productTitleEl = document.getElementById("productTitle");
    if (!productTitleEl) return;

    const retailPrice = extractPrice();
    if (!retailPrice) return;

    const productName = productTitleEl.innerText.trim();
    
    // Simulate GenPark API checking global dark pools for better price
    const savingsPercent = Math.floor(Math.random() * (25 - 10 + 1)) + 10; // Random 10-25%
    const genparkPrice = (retailPrice * (1 - (savingsPercent / 100))).toFixed(2);

    dealData = {
        dealFound: true,
        productName: productName.substring(0, 40) + "...",
        retailPrice: retailPrice,
        genparkPrice: genparkPrice,
        savings: savingsPercent
    };

    injectBanner(dealData);
}

function injectBanner(data) {
    const targetEl = document.getElementById("productTitle") || document.querySelector("h1");
    if (targetEl && !document.getElementById('genpark-injected-banner')) {
        const banner = document.createElement("div");
        banner.id = 'genpark-injected-banner';
        banner.className = 'genpark-flash-banner';
        banner.innerHTML = `
            <div class="genpark-flash-text">
                🚨 <strong>GenPark Arbitrage Opportunity</strong><br>
                This identical item is trading for <strong>$${data.genparkPrice}</strong> on the GenPark Network.
            </div>
            <button class="genpark-action-btn" id="gp-auto-buy">Auto-Snipe & Buy</button>
        `;
        targetEl.parentElement.insertBefore(banner, targetEl.nextSibling);

        document.getElementById('gp-auto-buy').addEventListener('click', function() {
            this.innerText = "Executing Smart Contract...";
            this.style.backgroundColor = "#ff9800";
            setTimeout(() => {
                this.innerText = "Purchased Confirmed!";
                this.style.backgroundColor = "#1976d2";
            }, 2000);
        });
    }
}

// Listen for popup requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getDeals") {
        sendResponse(dealData);
    }
});

setTimeout(analyzePage, 2000);
