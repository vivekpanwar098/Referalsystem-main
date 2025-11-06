# Referral & Credit System

A referral program where users can invite friends and earn credits when they make purchases.

## What does this do?

- Users sign up and get a unique referral link
- Share the link with friends
- When friends buy something, both get 2 credits
- Track everything on a dashboard

## Tech Stack

**Frontend:**
- Next.js with TypeScript
- Tailwind CSS for styling
- Zustand for state management
- Framer Motion for animations

**Backend:**
- Node.js + Express
- MongoDB database
- JWT authentication

## How to Run

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd referral-credit-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/referral-system
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

### 4. Open in browser
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## How it Works

1. **Sign Up**: User creates account and gets referral code
2. **Share Link**: Copy referral link like `yourapp.com/register?r=CODE123`
3. **Friend Joins**: New user signs up using your link
4. **First Purchase**: When friend buys something for the first time:
   - Friend gets 2 credits
   - You get 2 credits
5. **Dashboard**: See all your stats and credits

## API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### User
- `GET /api/users/me` - Get user info
- `GET /api/users/referral-stats` - Get referral stats

### Purchase
- `POST /api/purchases` - Make a purchase
- `GET /api/purchases/history` - Purchase history

## Database Schema

**User:**
- email, password (hashed)
- referralCode (unique)
- referredBy (who invited them)
- credits
- hasPurchased (true/false)

**Purchase:**
- userId
- productName
- amount
- isFirstPurchase

## Features

- Secure authentication
- Unique referral codes
- Copy referral link button
- Credits only on first purchase
- No double credits
- Responsive design
- Real-time dashboard

## Project Structure

```
referral-credit-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── store/
│   └── package.json
└── README.md
```

## Important Rules

- Credits only given on **first purchase**
- Both referrer and referred user get 2 credits
- Passwords are hashed with bcrypt
- JWT tokens for authentication
- No duplicate credits

## Environment Variables Needed

**Backend (.env):**
```
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Deployment

**Frontend:** Deploy on Vercel
**Backend:** Deploy on Render or Railway
**Database:** Use MongoDB Atlas

## Example Flow

```
Lina signs up → Gets code LINA123
Lina shares: yourapp.com/register?r=LINA123
Ryan signs up using Lina's link
Ryan makes first purchase
→ Lina gets 2 credits
→ Ryan gets 2 credits
Ryan's future purchases = no more credits
```

## Screenshots

(Add your screenshots here)

## Demo

- Live Link: [Add deployment link]
- Video: [Add video link]

---

Made for FileSure Internship Assignment
