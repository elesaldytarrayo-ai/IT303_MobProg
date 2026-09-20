import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import "./ExpenseContext.css";

const ExpenseContext =
  createContext();

const STORAGE_KEY =
  "personal_expense_tracker";

export function ExpenseProvider({
  children
}) {

  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {

        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setExpenses(parsed);
        }

      }

    } catch (error) {

      console.log(
        "Unable to load expenses:",
        error
      );

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {

    if (!loading) {

      try {

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(expenses)
        );

      } catch (error) {

        console.log(
          "Unable to save expenses:",
          error
        );

      }

    }

  }, [expenses, loading]);

  const addExpense = (expense) => {

    const newExpense = {

      id:
        Date.now() +
        Math.random(),

      title:
        expense.title.trim(),

      amount:
        Number(expense.amount),

      category:
        expense.category,

      date:
        expense.date

    };

    setExpenses(
      (currentExpenses) => [
        ...currentExpenses,
        newExpense
      ]
    );

  };

  const updateExpense = (
    id,
    updatedExpense
  ) => {

    setExpenses(
      (currentExpenses) =>

        currentExpenses.map(
          (expense) =>

            expense.id === id

              ? {
                  ...expense,
                  title:
                    updatedExpense.title.trim(),
                  amount:
                    Number(
                      updatedExpense.amount
                    ),
                  category:
                    updatedExpense.category,
                  date:
                    updatedExpense.date
                }

              : expense
        )

    );

  };

  const deleteExpense = (id) => {

    setExpenses(
      (currentExpenses) =>

        currentExpenses.filter(
          (expense) =>
            expense.id !== id
        )

    );

  };

  const clearExpenses = () => {

    setExpenses([]);

  };

  const total =
    expenses.reduce(
      (sum, expense) =>
        sum +
        Number(expense.amount),
      0
    );

  const foodTotal =
    expenses
      .filter(
        (expense) =>
          expense.category === "Food"
      )
      .reduce(
        (sum, expense) =>
          sum +
          Number(expense.amount),
        0
      );

  const transportTotal =
    expenses
      .filter(
        (expense) =>
          expense.category ===
          "Transport"
      )
      .reduce(
        (sum, expense) =>
          sum +
          Number(expense.amount),
        0
      );

  const otherTotal =
    expenses
      .filter(
        (expense) =>
          expense.category === "Other"
      )
      .reduce(
        (sum, expense) =>
          sum +
          Number(expense.amount),
        0
      );

  const value = {

    expenses,

    loading,

    addExpense,

    updateExpense,

    deleteExpense,

    clearExpenses,

    total,

    foodTotal,

    transportTotal,

    otherTotal

  };

  return (

    <ExpenseContext.Provider
      value={value}
    >

      {children}

    </ExpenseContext.Provider>

  );

}

export function useExpenses() {

  return useContext(
    ExpenseContext
  );

}