# Money Management System

A simple personal income/expense tracker for the Full Stack Development syllabus.
**React + Redux + React Router → Node + Express → Sequelize → MySQL.** No login, no AI APIs.

Setup: see `SETUP.md`. Concepts and viva answers: see `EXPLANATION.md`.

## Folder structure
```
Money Management System/
├── backend/
│   ├── config/        database.js (Sequelize), config.js (for migrations)
│   ├── controllers/   transaction, summary, logbook, chatbot
│   ├── models/        Transaction.js, Category.js, index.js (association)
│   ├── migrations/    create-categories, create-transactions, seed-categories
│   ├── routes/        one file per controller
│   ├── services/      rawQueryService.js (raw SQL)
│   ├── utils/         formatTransaction, dateRange, handleError
│   ├── scripts/       syllabus demos (events, fs, streams, cron, blocking...)
│   ├── events.js      EventEmitter ("transactionAdded")
│   └── server.js
└── frontend/src/
    ├── components/    Navbar, SummaryCard, FilterBar, TransactionForm/List/Item,
    │                  YearCard, MonthCard, Chatbot
    ├── pages/         Dashboard, LogBook
    ├── store/         store.js, transactionSlice.js
    └── App.jsx, main.jsx, api.js, utils.js, App.css
```

## Database schema
**categories**: id, name (unique), createdAt, updatedAt
**transactions**: id, type (income/expense), title, amount DECIMAL(10,2) (always positive),
categoryId (FK → categories.id), paymentMode (UPI/Cash), date, description, createdAt, updatedAt

`Category.hasMany(Transaction)` and `Transaction.belongsTo(Category)`.
Expenses are stored positive; the UI shows `-` for expense and `+` for income.

## API (base: http://localhost:5000/api)
| Method | URL | What it does |
|---|---|---|
| GET | /transactions | All transactions. Optional `?category=&type=&year=&month=` |
| GET | /transactions/:id | One transaction |
| POST | /transactions | Add (validated) |
| PUT | /transactions/:id | Edit |
| DELETE | /transactions/:id | Delete |
| GET | /transactions/category/:category | Filter by category |
| GET | /transactions/export/:year/:month | CSV download (stream) |
| GET | /summary | totalIncome, totalExpenses, monthlyExpenses, yearlyExpenses |
| GET | /summary/monthly, /summary/yearly | Current month / year expenses |
| GET | /summary/raw | Total expenses using a raw SQL query |
| GET | /logbook/years | Years found in the data |
| GET | /logbook/:year | 12 months with totals |
| GET | /logbook/:year/:month | Income, expenses, balance + transactions |
| GET | /chatbot/:option | `total-income, total-expenses, month-expenses, year-expenses, count, top-category, recent` |
| GET | /headers | Shows request headers (Week 5) |

POST body example:
```json
{"type":"expense","title":"Lunch","amount":150,"category":"Food","paymentMode":"UPI","date":"2026-10-02T13:00:00.000Z","description":""}
```
Errors return `{ "message": "..." }` with status 400 (validation), 404 (not found) or 500.

## Syllabus mapping
| Week | Topic | Where in Money Management System |
|---|---|---|
| 1 | Node, package.json, Express server | `backend/package.json`, `server.js` |
| 2 | Modules, dependencies | routes / controllers / models / config split with `require` |
| 3 | Async, callbacks, try/catch, EventEmitter | async controllers, `events.js`, `scripts/eventExample.js` |
| 4 | Promises, fs, CLI arguments | `scripts/fileSystemExample.js`, async/await DB calls |
| 5 | Streams, headers, gateway | CSV `Readable.from().pipe(res)`, `/api/headers`, `scripts/streamExample.js` |
| 6 | Cron, blocking vs non-blocking, Webpack | `scripts/cronExample.js`, `blockingExample.js`, `nonBlockingExample.js`, `webpack.config.example.js` (app uses Vite) |
| 7 | Sequelize + MySQL connection | `config/database.js`, `scripts/testConnection.js` |
| 8 | Models, migrations, CRUD | `models/`, `migrations/`, create/findAll/findByPk/update/destroy |
| 9 | Finders, validation, raw query | `where`/`order` in controllers, validators in `Transaction.js`, `services/rawQueryService.js` |
| 10 | Associations | `models/index.js`, category filter join, `scripts/associationsExample.js` (1:1, M:N) |
| 11 | React components, props, state | `components/` |
| 12 | Hooks | useState (form), useEffect (loading), useCallback + useMemo (Dashboard), useRef (Chatbot) |
| 13 | React Router | `App.jsx`, `Navbar.jsx` (`/`, `/logbook`) |
| 14 | Redux | `store/`, `dispatch()` in `Dashboard.jsx` |
| 15 | Full-stack integration | `api.js` fetch → Express → Sequelize → MySQL |

## Why migrations?
They create tables the same way on every computer and keep a history of database changes (like Git for the database). `sync({alter:true})` can change or lose data silently.

## Hooks used
- `useState` – stores values that change (form fields, selected year).
- `useEffect` – runs code when the page opens (load data).
- `useCallback` – keeps `loadTransactions` stable so `useEffect` doesn't re-run needlessly.
- `useMemo` – recalculates the "showing" totals only when the list changes.
- `useRef` – points to the bottom of the chat to auto-scroll.

## Redux in 4 lines
- **store** – holds the shared state (`store.js`).
- **state** – `{ transactions: { list: [...] } }`.
- **dispatch** – `dispatch(addTransaction(saved))` sends an action.
- **reducer** – the function in the slice that changes the state.
