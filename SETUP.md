# SMM — SETUP

## 1. Install
Node.js LTS, MySQL Server, VS Code. Check: `node -v`, `npm -v`, `mysql --version`

## 2. Create the database
```sql
CREATE DATABASE smm_db;
```

## 3. Backend (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env      # then open .env and type your MySQL password
npm run migrate           # creates the tables + default categories
npm run dev
```
Expected: `Server running on port 5000` and `Database connected`.

## 4. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## 5. Syllabus demo scripts (optional)
```bash
cd backend
npm run test-db                             # Week 7
node scripts/eventExample.js                # Week 3
node scripts/fileSystemExample.js note.txt  # Week 4
node scripts/streamExample.js               # Week 5
node scripts/blockingExample.js             # Week 6
node scripts/nonBlockingExample.js          # Week 6
node scripts/cronExample.js                 # Week 6 (Ctrl+C to stop)
node scripts/associationsExample.js         # Week 10
```

## 6. Common errors
- **MySQL connection error**: MySQL not running, wrong password in `.env`, or `smm_db` missing.
- **Migration error**: check `.env` values and that the database exists.
- **CORS error**: backend must have `app.use(cors())` (already in `server.js`).
- **Port in use**: change `PORT` in `.env` and `API_URL` in `frontend/src/api.js`.
- Never upload `.env` or `node_modules/` to GitHub.

## 7. Testing checklist
Add income, add expense, edit, delete, filter by category, check the 4 cards, open Log Book → year → month, Export CSV, ask the chatbot, try an empty title / amount 0, stop the backend and reload (friendly error), empty list.
