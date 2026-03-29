# Restaurant Ordering System

A lightweight restaurant ordering system built with **React + TypeScript + Redux Toolkit**.  
Users can browse menu items, add items to a cart with add-ons, and complete checkout with a generated receipt.

---

# How to Install & Run

```bash
# install dependencies
npm install
```

### Run the mock API (Terminal 1)

```bash
npm run api
```

### Run the app (Terminal 2)

```bash
npm run dev
```

---

# Running URLs

- Frontend: http://localhost:5173
- API: http://localhost:3001

---

# What the App Does

- Loads menu items from an API (using Redux async thunk)
- Search and sort menu (name, price, category)
- Remove duplicate items
- Add items to cart with optional add-ons
- Manage quantity (increase, decrease, remove)
- Display running subtotal
- Checkout:
  - applies 10% service charge
  - generates a receipt with timestamp
  - clears the cart

---

# Ionic Usage

Ionic is used for **UI components and layout**:

- IonApp, IonPage, IonHeader, IonToolbar, IonContent → page structure
- IonCard → menu, cart, and receipt layout
- IonButton → actions (add to cart, checkout, etc.)

👉 A **hybrid approach** was used:

- Core logic is handled by React + Redux Toolkit
- Ionic is used to improve styling and provide a mobile-friendly UI

---

# 🧪 Testing

```bash
npm test
```

- Includes unit and component tests using Jest + React Testing Library

---

# 📌 Notes

- Uses a mock API (no backend persistence)
- Focused on clean structure, state management, and user flow
