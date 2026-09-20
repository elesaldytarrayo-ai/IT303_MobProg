import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ExpenseContext = createContext();
const STORAGE_KEY = "PERSONAL_EXPENSES";

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    if (!loading) saveExpenses(expenses);
  }, [expenses, loading]);

  const loadExpenses = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        setExpenses(JSON.parse(data));
      }
    } catch (error) {
      console.log("Load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveExpenses = async (data) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
    } catch (error) {
      console.log("Save error:", error);
    }
  };

  const addExpense = (item) => {
    const newExpense = {
      id: Date.now().toString(),
      title: item.title.trim(),
      amount: Number(item.amount),
      category: item.category,
      date: item.date,
    };

    setExpenses((old) => [...old, newExpense]);
  };

  const updateExpense = (id, item) => {
    setExpenses((old) =>
      old.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              title: item.title.trim(),
              amount: Number(item.amount),
              category: item.category,
              date: item.date,
            }
          : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((old) =>
      old.filter((item) => item.id !== id)
    );
  };

  const clearExpenses = () => {
    setExpenses([]);
  };

  const totalBy = (category) => {
    return expenses
      .filter(
        (item) =>
          !category || item.category === category
      )
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        addExpense,
        updateExpense,
        deleteExpense,
        clearExpenses,
        total: totalBy(),
        foodTotal: totalBy("Food"),
        transportTotal: totalBy("Transport"),
        otherTotal: totalBy("Other"),
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}