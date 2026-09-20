import React from "react";
import { Link } from "react-router-dom";

import {
  useExpenses
} from "./ExpenseContext";

import "./Dashboard.css";

function Dashboard() {

  const {

    expenses,

    total,

    foodTotal,

    transportTotal,

    otherTotal

  } = useExpenses();

  return (

    <main className="dashboard">

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            PERSONAL PRODUCTIVITY
          </p>

          <h1>
            Personal Expense
            <br />
            & Budget Tracker
          </h1>

          <p className="hero-text">
            Track your daily expenses,
            manage your spending,
            and understand where
            your money goes.
          </p>

          <Link
            className="hero-button"
            to="/add"
          >
            + Add New Expense
          </Link>

        </div>

        <div className="hero-circle">

          <span>
            ₱
          </span>

        </div>

      </section>

      <section className="summary-title">

        <h2>
          Financial Overview
        </h2>

        <p>
          Your current expense summary
        </p>

      </section>

      <section className="cards">

        <div className="money-card total-card">

          <div className="card-icon">
            💳
          </div>

          <p>
            Total Expenses
          </p>

          <h2>
            ₱{total.toFixed(2)}
          </h2>

        </div>

        <div className="money-card food-card">

          <div className="card-icon">
            🍔
          </div>

          <p>
            Food
          </p>

          <h2>
            ₱{foodTotal.toFixed(2)}
          </h2>

        </div>

        <div className="money-card transport-card">

          <div className="card-icon">
            🚌
          </div>

          <p>
            Transport
          </p>

          <h2>
            ₱{transportTotal.toFixed(2)}
          </h2>

        </div>

        <div className="money-card other-card">

          <div className="card-icon">
            📦
          </div>

          <p>
            Other
          </p>

          <h2>
            ₱{otherTotal.toFixed(2)}
          </h2>

        </div>

      </section>

      <section className="recent-section">

        <div className="section-heading">

          <div>

            <h2>
              Recent Expenses
            </h2>

            <p>
              Latest recorded transactions
            </p>

          </div>

          <Link to="/expenses">
            View All
          </Link>

        </div>

        {expenses.length === 0 ? (

          <div className="empty-dashboard">

            <div>
              💸
            </div>

            <h3>
              No expenses yet
            </h3>

            <p>
              Start recording your
              daily expenses.
            </p>

          </div>

        ) : (

          <div className="recent-list">

            {expenses
              .slice(-5)
              .reverse()
              .map((expense) => (

                <div
                  className="recent-item"
                  key={expense.id}
                >

                  <div className="recent-icon">

                    {expense.category ===
                    "Food"

                      ? "🍔"

                      : expense.category ===
                        "Transport"

                      ? "🚌"

                      : "📦"}

                  </div>

                  <div className="recent-info">

                    <h3>
                      {expense.title}
                    </h3>

                    <p>
                      {expense.category}
                      {" • "}
                      {expense.date}
                    </p>

                  </div>

                  <strong>
                    ₱
                    {Number(
                      expense.amount
                    ).toFixed(2)}
                  </strong>

                </div>

              ))}

          </div>

        )}

      </section>

    </main>

  );

}

export default Dashboard;