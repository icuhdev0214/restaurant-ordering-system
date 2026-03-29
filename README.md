# Restaurant Ordering System

A lightweight restaurant ordering system built using React, TypeScript, and Redux Toolkit.  
This project demonstrates async state management, cart logic, reusable components, and basic testing.

---

## Features

### Menu List

- Fetches menu items from a mock API using Redux Toolkit `createAsyncThunk`
- Displays name, price, and category
- Removes duplicate items (same name, price, category)
- Fuzzy, case-insensitive search across name, price, and category
- Sorting by name, price, and category

### Cart Management

- Add items to cart
- Increase or decrease quantity
- Remove items
- Supports add-ons (Fries, Ketchup)
- Same item + same add-ons → increases quantity
- Same item + different add-ons → separate entries
- Displays running subtotal

### Checkout

- Calculates final total
- Applies 10% service charge
- Generates receipt with timestamp
- Clears cart after checkout

### Testing

- Unit test for duplicate removal
- Component test for cart behavior

---

## Tech Stack

- React
- TypeScript (strict typing, no `any`)
- Redux Toolkit
- React Redux
- Fuse.js (fuzzy search)
- Jest
- React Testing Library
- JSON Server (mock API)

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```
