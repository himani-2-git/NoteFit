# Notefit — Daily Sales & Expense Tracker

A lightweight, offline-first web application for tracking daily sales, expenses, and profit. Built using HTML, CSS, and Vanilla JavaScript with LocalStorage for data persistence.

---

## Overview

Notefit helps small vendors and local businesses:

* Record daily sales
* Track categorized expenses
* Calculate daily profit/loss
* View last 7 days performance
* Export transaction data as CSV

The application runs entirely in the browser and does not require a backend.

---

## Core Features

### Dashboard

* Today's Sales
* Today's Expenses
* Today's Profit
* Last 7 Days Profit
* Automatic recalculation after each transaction

### Transaction Management

* Add Sale (amount, note, date)
* Add Expense (amount, category, date)
* Delete transactions
* Search transactions
* Sorted by most recent date

### Offline Support

* Uses browser `localStorage`
* Data persists after refresh
* No internet required

### CSV Export

* Export all transactions in structured CSV format
* Compatible with Excel and Google Sheets

---

## Tech Stack

* HTML5
* CSS3 (Flexbox & Grid)
* Vanilla JavaScript (ES6)
* Browser LocalStorage
* Google Fonts (Inter)

No frameworks or external libraries used.

---

## Project Structure

```
Notefit
│
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── logo.svg
│   └── trash.png
└── README.md
```

---

## Data Model

```js
{
  sales: [{ id, amount, note, date }],
  expenses: [{ id, amount, category, date }]
}
```

Stored under the key:

```
"notefit-data"
```

---

## Business Logic

* Daily Profit = Today's Sales − Today's Expenses
* 7-Day Profit = Last 7 Days Sales − Last 7 Days Expenses
* Input validation ensures amount > 0 and valid date

---

## How to Run

1. Download or clone the repository
2. Open the folder
3. Run with Live Server or open `index.html` in your browser

No installation or dependencies required.

---

## Purpose

This project demonstrates:

* DOM manipulation
* State management without frameworks
* Financial calculations
* LocalStorage usage
* Clean UI structuring

---

## Author

Himani
B.Tech Computer Engineering

---

This project is intended for educational and demonstration purposes.
