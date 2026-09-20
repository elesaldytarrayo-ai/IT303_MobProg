import React, {
  useState
} from "react";

import {
  useExpenses
} from "./ExpenseContext";

import "./DisplayExpenses.css";

function DisplayExpenses() {

  const {

    expenses,

    updateExpense,

    deleteExpense,

    clearExpenses

  } = useExpenses();

  const [edit, setEdit] =
    useState(null);

  const startEdit = (
    expense
  ) => {

    setEdit({
      ...expense
    });

  };

  const handleEditChange = (
    event
  ) => {

    const {
      name,
      value
    } = event.target;

    setEdit({

      ...edit,

      [name]: value

    });

  };

  const saveEdit = () => {

    if (!edit.title.trim()) {

      alert(
        "Expense name cannot be empty."
      );

      return;

    }

    if (
      !edit.amount ||
      Number(edit.amount) <= 0
    ) {

      alert(
        "Please enter a valid amount."
      );

      return;

    }

    updateExpense(
      edit.id,
      edit
    );

    setEdit(null);

  };

  const handleDelete = (
    id
  ) => {

    const answer =
      window.confirm(
        "Are you sure you want to delete this expense?"
      );

    if (answer) {

      deleteExpense(id);

    }

  };

  const handleClear = () => {

    if (expenses.length === 0) {

      return;

    }

    const answer =
      window.confirm(
        "Delete all expense records?"
      );

    if (answer) {

      clearExpenses();

    }

  };

  return (

    <main className="display-page">

      <section className="display-header">

        <div>

          <p>
            EXPENSE MANAGEMENT
          </p>

          <h1>
            My Expenses
          </h1>

          <span>
            View, edit, and delete
            your expense records.
          </span>

        </div>

        <button
          className="clear-button"
          onClick={handleClear}
        >
          Clear All
        </button>

      </section>

      {expenses.length === 0 ? (

        <section className="no-expenses">

          <div className="no-expense-icon">
            🧾
          </div>

          <h2>
            No Expenses Found
          </h2>

          <p>
            Your expense list is
            currently empty.
          </p>

        </section>

      ) : (

        <section className="expense-list">

          {expenses
            .slice()
            .reverse()
            .map((expense) => (

              <article
                className="expense-item"
                key={expense.id}
              >

                {edit &&
                edit.id === expense.id ? (

                  <div className="edit-form">

                    <input
                      name="title"
                      value={edit.title}
                      onChange={
                        handleEditChange
                      }
                    />

                    <input
                      name="amount"
                      type="number"
                      value={edit.amount}
                      onChange={
                        handleEditChange
                      }
                    />

                    <select
                      name="category"
                      value={edit.category}
                      onChange={
                        handleEditChange
                      }
                    >

                      <option value="Food">
                        Food
                      </option>

                      <option value="Transport">
                        Transport
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                    <input
                      name="date"
                      type="date"
                      value={edit.date}
                      onChange={
                        handleEditChange
                      }
                    />

                    <div className="edit-buttons">

                      <button
                        className="save-button"
                        onClick={saveEdit}
                      >
                        Save
                      </button>

                      <button
                        className="cancel-button"
                        onClick={() =>
                          setEdit(null)
                        }
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                ) : (

                  <>

                    <div className="expense-category-icon">

                      {expense.category ===
                      "Food"

                        ? "🍔"

                        : expense.category ===
                          "Transport"

                        ? "🚌"

                        : "📦"}

                    </div>

                    <div className="expense-details">

                      <h3>
                        {expense.title}
                      </h3>

                      <p>
                        {expense.category}
                        {" • "}
                        {expense.date}
                      </p>

                    </div>

                    <strong className="expense-amount">

                      ₱
                      {Number(
                        expense.amount
                      ).toFixed(2)}

                    </strong>

                    <div className="action-buttons">

                      <button
                        className="edit-button"
                        onClick={() =>
                          startEdit(
                            expense
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(
                            expense.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </>

                )}

              </article>

            ))}

        </section>

      )}

    </main>

  );

}

export default DisplayExpenses;