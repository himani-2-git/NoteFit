const STORAGE_KEY = "notefit-data";

let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  sales: [],
  expenses: []
};

const saleForm = document.getElementById("saleForm");
const expenseForm = document.getElementById("expenseForm");

const saleAmount = document.getElementById("saleAmount");
const saleNote = document.getElementById("saleNote");
const saleDate = document.getElementById("saleDate");

const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");

const todaySalesEl = document.getElementById("todaySales");
const todayExpensesEl = document.getElementById("todayExpenses");
const todayProfitEl = document.getElementById("todayProfit");
const sevenProfitEl = document.getElementById("sevenProfit");

const recordsBody = document.getElementById("recordsBody");
const searchInput = document.getElementById("searchInput");
const exportBtn = document.getElementById("exportBtn");

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId() {
  return Date.now().toString();
}

saleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amountValue = saleAmount.value.trim();
  const amount = Number(amountValue);
  const note = saleNote.value.trim();
  const date = saleDate.value;

  if (amountValue === "" || amount <= 0 || !date) {
    alert("Enter valid sale amount and date");
    return;
  }

  data.sales.push({
    id: generateId(),
    amount,
    note,
    date
  });

  saveData();
  saleForm.reset();
  renderAll();
});

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amountValue = expenseAmount.value.trim();
  const amount = Number(amountValue);
  const category = expenseCategory.value;
  const date = expenseDate.value;

  if (amountValue === "" || amount <= 0 || !date) {
    alert("Enter valid expense amount and date");
    return;
  }

  data.expenses.push({
    id: generateId(),
    amount,
    category,
    date
  });

  saveData();
  expenseForm.reset();
  renderAll();
});

function updateDashboard() {
  const today = new Date().toISOString().split("T")[0];

  const todaySales = data.sales
    .filter(s => s.date === today)
    .reduce((sum, s) => sum + s.amount, 0);

  const todayExpenses = data.expenses
    .filter(e => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const sevenSales = data.sales
    .filter(s => new Date(s.date) >= sevenDaysAgo)
    .reduce((sum, s) => sum + s.amount, 0);

  const sevenExpenses = data.expenses
    .filter(e => new Date(e.date) >= sevenDaysAgo)
    .reduce((sum, e) => sum + e.amount, 0);

  todaySalesEl.textContent = `₹${todaySales}`;
  todayExpensesEl.textContent = `₹${todayExpenses}`;
  todayProfitEl.textContent = `₹${todaySales - todayExpenses}`;
  sevenProfitEl.textContent = `₹${sevenSales - sevenExpenses}`;
}

function renderRecords() {
  recordsBody.innerHTML = "";

  const searchValue = searchInput.value.toLowerCase();

  const allEntries = [
    ...data.sales.map(s => ({ ...s, type: "Sale" })),
    ...data.expenses.map(e => ({ ...e, type: "Expense" }))
  ];

  const filtered = allEntries
    .filter(entry =>
      (entry.note || entry.category || "")
        .toLowerCase()
        .includes(searchValue)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  filtered.forEach(entry => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.type}</td>
      <td class="${entry.type === "Sale" ? "sale" : "expense"}">
        ₹${entry.amount}
      </td>
      <td>${entry.note || entry.category}</td>
      <td>${entry.date}</td>
      <td>
        <button class="icon-btn" onclick="deleteEntry('${entry.type}', '${entry.id}')">
          <img src="assets/trash.png" alt="Delete">
        </button>
      </td>
    `;

    recordsBody.appendChild(row);
  });
}

function deleteEntry(type, id) {
  if (type === "Sale") {
    data.sales = data.sales.filter(s => s.id !== id);
  } else {
    data.expenses = data.expenses.filter(e => e.id !== id);
  }

  saveData();
  renderAll();
}

exportBtn.addEventListener("click", () => {
  let csv = "Type,Amount,Details,Date\n";

  data.sales.forEach(s => {
    csv += `Sale,${s.amount},${s.note},${s.date}\n`;
  });

  data.expenses.forEach(e => {
    csv += `Expense,${e.amount},${e.category},${e.date}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "notefit-data.csv";
  a.click();
});

searchInput.addEventListener("input", renderRecords);

function renderAll() {
  updateDashboard();
  renderRecords();
}

renderAll();