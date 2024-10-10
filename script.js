let currentPage = 1;

function fetchTransactions() {
    const month = document.getElementById('month').value;
    const searchText = document.getElementById('search').value;
    fetch(`https://s3.amazonaws.com/roxiler.com/product_transaction.json`)
        .then(response => response.json())
        .then(data => {
            displayTransactions(data.transactions);
            updateStatistics(data.statistics);
        });
}

function displayTransactions(transactions) {
    const tbody = document.getElementById('transactions-body');
    tbody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = `<tr>
            <td>${transaction.title}</td>
            <td>${transaction.description}</td>
            <td>${transaction.price}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function updateStatistics(statistics) {
    document.getElementById('total-sales').innerText = statistics.totalSales;
    document.getElementById('total-sold').innerText = statistics.totalSold;
    document.getElementById('total-not-sold').innerText = statistics.totalNotSold;
}

function searchTransactions() {
    fetchTransactions();
}

function loadNextPage() {
    currentPage++;
    fetchTransactions();
}

function loadPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchTransactions();
    }
}

window.onload = fetchTransactions;
