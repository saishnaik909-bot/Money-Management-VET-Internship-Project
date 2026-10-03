# SMM — SIMPLE PROJECT EXPLANATION

## 1. What is SMM?

**Solo Money Management (SMM)** is a personal expense and income tracking application.

It records:

- Income
- Expenses
- Categories
- Payment modes
- Dates
- Descriptions

It then calculates:

- Total income
- Total expenses
- Monthly expenses
- Yearly expenses
- Monthly balances

The user can also edit, delete, filter and export transactions.

---

# 2. Technology Used

## React.js

React is used to create the frontend.

It displays:

- Dashboard
- Forms
- Transactions
- Log Book
- Chatbot

React also handles user interaction.

---

## Node.js

Node.js runs JavaScript on the server.

In SMM it is responsible for:

- Running the backend
- Handling requests
- Running JavaScript outside the browser

---

## Express.js

Express is a Node.js framework.

It creates API routes such as:

```text
GET /api/transactions
POST /api/transactions
PUT /api/transactions/:id
DELETE /api/transactions/:id
```

---

## MySQL

MySQL stores the transaction data permanently.

Example:

```text
id: 1
type: expense
title: Lunch
amount: 150
category: Food
paymentMode: UPI
```

---

## Sequelize

Sequelize is an ORM.

Instead of writing SQL for every operation, JavaScript can be used:

```js
Transaction.findAll()
```

or:

```js
Transaction.create(data)
```

---

# 3. Why Store Expense Amount as Positive?

Suppose the user spends ₹500.

Database:

```text
amount = 500
type = expense
```

Income:

```text
amount = 1000
type = income
```

The application decides how to display them.

Expense:

```text
- ₹500
```

Income:

```text
+ ₹1000
```

This makes database calculations easier.

---

# 4. Main Database Table

## Transaction

```text
Transaction
--------------------------------
id
type
title
amount
category
paymentMode
date
description
createdAt
updatedAt
```

### type

```text
income
expense
```

### paymentMode

```text
UPI
Cash
```

---

# 5. Basic API Flow

For loading transactions:

```text
React
  ↓
GET /api/transactions
  ↓
Express
  ↓
Controller
  ↓
Sequelize
  ↓
MySQL
  ↓
JSON
  ↓
React
```

---

# 6. Add Transaction Flow

```text
User fills form
      ↓
Clicks Add
      ↓
React sends POST
      ↓
Express receives request
      ↓
Controller validates data
      ↓
Sequelize creates record
      ↓
MySQL stores record
      ↓
Server sends response
      ↓
React displays transaction
```

---

# 7. Edit Transaction

```text
User clicks Edit
       ↓
Existing transaction loaded
       ↓
Form gets existing values
       ↓
User changes values
       ↓
PUT request
       ↓
Sequelize update()
       ↓
Database updated
       ↓
React refreshes list
```

---

# 8. Delete Transaction

```text
Delete button
     ↓
Confirmation
     ↓
DELETE request
     ↓
Sequelize destroy()
     ↓
MySQL record deleted
     ↓
React updates list
```

---

# 9. Category Filtering

Example:

User chooses:

```text
Food
```

Backend can query:

```text
WHERE category = 'Food'
```

Only food transactions are returned.

This demonstrates Sequelize querying and filtering.

---

# 10. Dashboard

The dashboard contains four important summary cards:

```text
Total Income
Total Expenses
Monthly Expenses
Yearly Expenses
```

Example:

```text
Total Income       ₹50,000
Total Expenses     ₹18,000
Monthly Expenses    ₹5,000
Yearly Expenses    ₹18,000
```

---

# 11. Log Book

The Log Book organizes transaction history.

```text
Log Book
   |
   └── 2026
        |
        ├── January
        ├── February
        ├── March
        ├── April
        ├── ...
        └── December
```

Inside a month:

```text
October 2026

Income:   ₹20,000
Expenses:  ₹7,500
Balance:  ₹12,500
```

Then all transactions for October are displayed.

---

# 12. CSV Export

CSV means:

**Comma-Separated Values**

Example:

```csv
Date,Title,Type,Category,Payment Mode,Amount,Description
2026-10-01,Salary,income,Salary,UPI,20000,Monthly salary
2026-10-02,Lunch,expense,Food,UPI,150,College lunch
```

The user can open this file in Excel or similar software.

---

# 13. Chatbot

The SMM chatbot is NOT artificial intelligence.

It uses predefined options.

Example:

User clicks:

```text
How much did I spend this month?
```

The backend calculates the amount from the database.

Example response:

```text
You spent ₹5,200 this month.
```

This demonstrates API + database querying without requiring an external AI service.

---

# 14. React State

React state stores changing values.

Example:

```js
const [amount, setAmount] = useState("");
```

When the user types:

```text
500
```

the state becomes:

```text
500
```

---

# 15. useEffect

`useEffect` is useful for loading data.

Example concept:

```text
Page opens
   ↓
useEffect runs
   ↓
GET transactions
   ↓
Display transactions
```

---

# 16. Redux

Redux stores shared application state.

For SMM, transaction data can be stored in Redux.

Example:

```text
dispatch(setTransactions(data))
```

The component can then access the transaction data from the Redux store.

Do not put every small value into Redux.

---

# 17. React Router

React Router allows multiple pages.

SMM can have:

```text
/
```

Dashboard

and:

```text
/logbook
```

Log Book.

---

# 18. Error Handling

Backend:

```js
try {
   // database operation
} catch (error) {
   res.status(500).json({
      message: "Something went wrong"
   });
}
```

Frontend should show a friendly message.

For example:

```text
Failed to load transactions.
```

Instead of displaying technical database errors.

---

# 19. Syllabus Mapping

## Week 1

SMM demonstrates:

- Node installation
- package.json
- Express
- server

Main files:

```text
backend/package.json
backend/server.js
```

---

## Week 2

Demonstrates:

- modules
- dependencies
- module functionality

Used through:

```text
routes
controllers
models
config
```

---

## Week 3

Demonstrates:

- asynchronous code
- callbacks
- exception handling
- events

Used through:

```text
async/await
try/catch
EventEmitter example
```

---

## Week 4

Demonstrates:

- promises
- modules
- file system

Used through:

```text
async/await
fs examples
```

---

## Week 5

Demonstrates:

- streams
- server
- routes
- request headers

CSV export can demonstrate writable streams.

---

## Week 6

Demonstrates:

- cron jobs
- blocking/non-blocking
- Webpack/build tools

Keep these examples separate from the main application when necessary.

---

## Week 7

Demonstrates:

- Sequelize
- MySQL
- connection testing

---

## Week 8

Demonstrates:

- models
- migrations
- basic queries

---

## Week 9

Demonstrates:

- finders
- validation
- constraints
- raw queries

---

## Week 10

Demonstrates:

- Sequelize associations

Category and Transaction can demonstrate a simple:

```text
Category 1 ──────── many Transactions
```

---

## Week 11

Demonstrates:

- React
- components
- props
- state

---

## Week 12

Demonstrates:

- React Hooks

Especially:

```text
useState
useEffect
useRef
useMemo
```

---

## Week 13

Demonstrates:

- React Router
- navigation

---

## Week 14

Demonstrates:

- Redux
- dispatch

---

## Week 15

Demonstrates:

```text
React
  ↓
Node/Express
  ↓
Sequelize
  ↓
MySQL
```

This is the complete full-stack integration.

---

# 20. Simple Viva Questions

### What is Node.js?

Node.js is a JavaScript runtime that allows JavaScript to run outside the browser.

### What is Express?

Express is a Node.js framework used for creating servers and APIs.

### What is an API?

An API is a way for two applications or parts of an application to communicate.

### What is Sequelize?

Sequelize is an ORM for Node.js that helps interact with relational databases using JavaScript.

### Why use MySQL?

MySQL is a relational database suitable for structured transaction data.

### What is a model?

A model represents the structure of data stored in a database table.

### What is a migration?

A migration is a version-controlled way to create or modify database tables.

### What is React?

React is a JavaScript library used to build user interfaces.

### What is a component?

A component is a reusable part of a React interface.

### What is state?

State is data that can change during the lifetime of a React component.

### What is a prop?

A prop is data passed from one React component to another.

### What is Redux?

Redux is a state-management library used to store shared application state.

### What is dispatch?

Dispatch sends an action to Redux so the state can be changed.

### What is REST API?

A REST API uses HTTP methods such as GET, POST, PUT and DELETE to work with resources.

### Why use async/await?

It makes asynchronous JavaScript easier to read and understand.

### What is middleware?

Middleware is a function that runs between the request and the final response.

Example:

```js
app.use(cors());
```

### What is CORS?

CORS allows the frontend and backend running on different origins to communicate.

---

# 21. Final Architecture to Remember

The easiest way to explain SMM in a viva is:

```text
             SMM
              |
       React Frontend
              |
          HTTP API
              |
      Node.js + Express
              |
         Sequelize
              |
            MySQL
```

Frontend:
**What the user sees**

Backend:
**What processes the request**

Sequelize:
**Connects JavaScript with MySQL**

MySQL:
**Stores the data**

This is the core idea of the entire project.
