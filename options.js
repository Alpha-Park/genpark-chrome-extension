document.getElementById('saveBtn').addEventListener('click', () => {
    const email = document.getElementById('gpEmail').value;
    const threshold = document.getElementById('threshold').value;
    chrome.storage.sync.set({ genparkEmail: email, genparkThreshold: threshold }, () => {
        const status = document.getElementById('status');
        status.style.display = 'block';
        setTimeout(() => { status.style.display = 'none'; }, 2000);
    });
});
