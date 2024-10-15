let transactions = [];
let chart;

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value === 'Custom' ? document.getElementById('custom-category').value : document.getElementById('category').value;

    transactions.push({ description, amount, date, category });
    updateTransactionList();
    updateChart();
    this.reset();
});

function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.textContent = `${transaction.date} - ${transaction.description}: $${transaction.amount} (${transaction.category})`;
        transactionList.appendChild(li);
    });
}

function updateChart() {
    const categoryData = transactions.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
    }, {});

    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);

    if (chart) {
        chart.destroy();
    }
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function addCategory() {
    const newCategory = document.getElementById('new-category').value;
    if (newCategory) {
        const categoryList = document.getElementById('category-list');
        const li = document.createElement('li');
        li.innerHTML = `${newCategory} <button onclick="removeCategory('${newCategory}')">Remove</button>`;
        categoryList.appendChild(li);
        document.getElementById('new-category').value = '';
    }
}

function removeCategory(category) {
    const categoryList = document.getElementById('category-list');
    const items = categoryList.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.includes(category)) {
            categoryList.removeChild(items[i]);
            break;
        }
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const buttonText = isDark ? 'Light Mode' : 'Dark Mode';
    document.querySelector('.toggle-mode').innerText = buttonText;
}

// Show the record page by default
showPage('record-page');




