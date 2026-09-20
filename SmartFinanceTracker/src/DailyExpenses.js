import React, {
  useState
} from "react";

import {
  useExpenses
} from "./ExpenseContext";

import "./DailyExpenses.css";

function DailyExpenses() {

  const { addExpense } =
    useExpenses();

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const [form, setForm] =
    useState({

      title: "",

      amount: "",

      category: "Food",

      date: today

    });

  const handleChange = (
    event
  ) => {

    const {
      name,
      value
    } = event.target;

    setForm({

      ...form,

      [name]: value

    });

  };

  const handleSubmit = (
    event
  ) => {

    event.preventDefault();

    if (!form.title.trim()) {

      alert(
        "Please enter an expense name."
      );

      return;

    }

    if (
      !form.amount ||
      Number(form.amount) <= 0
    ) {

      alert(
        "Please enter a valid amount."
      );

      return;

    }

    if (!form.date) {

      alert(
        "Please select a date."
      );

      return;

    }

    addExpense(form);

    setForm({

      title: "",

      amount: "",

      category: "Food",

      date: today

    });

    alert(
      "Expense successfully added!"
    );

  };

  return (

    <main className="daily-page">

      <section className="expense-form-card">

        <div className="form-header">

          <div className="form-logo">
            💗
          </div>

          <div>

            <p>
              DAILY EXPENSE
            </p>

            <h1>
              Add Expense
            </h1>

          </div>

        </div>

        <p className="form-description">

          Record your daily spending
          and keep your budget organized.

        </p>

        <form
          onSubmit={handleSubmit}
          className="expense-form"
        >

          <div className="input-group">

            <label>
              Expense Name
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Example: Lunch"
            />

          </div>

          <div className="input-group">

            <label>
              Amount
            </label>

            <div className="amount-input">

              <span>
                ₱
              </span>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
              />

            </div>

          </div>

          <div className="input-group">

            <label>
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >

              <option value="Food">
                🍔 Food
              </option>

              <option value="Transport">
                🚌 Transport
              </option>

              <option value="Other">
                📦 Other
              </option>

            </select>

          </div>

          <div className="input-group">

            <label>
              Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />

          </div>

          <button
            className="submit-button"
            type="submit"
          >

            <span>
              +
            </span>

            Save Expense

          </button>

        </form>

      </section>

    </main>

  );

}

export default DailyExpenses;