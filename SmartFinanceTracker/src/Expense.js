import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {
  ExpenseProvider
} from "./ExpenseContext";

import Dashboard from "./Dashboard";
import DailyExpenses from "./DailyExpenses";
import DisplayExpenses from "./DisplayExpenses";

import "./Expense.css";

function Expense() {
  return (
    <BrowserRouter>

      <ExpenseProvider>

        <div className="app">

          <nav className="navbar">

            <div className="logo">

              <span className="logo-blue">
                Pink
              </span>

              <span className="logo-pink">
                Budget
              </span>

            </div>

            <div className="nav-links">

              <Link to="/">
                Dashboard
              </Link>

              <Link to="/add">
                Add Expense
              </Link>

              <Link to="/expenses">
                Expenses
              </Link>

            </div>

          </nav>

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/add"
              element={<DailyExpenses />}
            />

            <Route
              path="/expenses"
              element={<DisplayExpenses />}
            />

          </Routes>

        </div>

      </ExpenseProvider>

    </BrowserRouter>
  );
}

export default Expense;