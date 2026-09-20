import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { useExpenses } from "./ExpenseContext";

export default function DisplayExpenses({ goHome }) {
  const {
    expenses,
    updateExpense,
    deleteExpense,
    clearExpenses,
  } = useExpenses();

  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const editExpense = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setAmount(String(item.amount));
    setCategory(item.category);
    setDate(item.date);
  };

  const saveEdit = () => {
    if (!title.trim() || !amount || Number(amount) <= 0) {
      Alert.alert("Error", "Enter valid information.");
      return;
    }

    updateExpense(editId, {
      title,
      amount,
      category,
      date,
    });

    setEditId(null);
  };

  const removeExpense = (id) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => deleteExpense(id),
        },
      ]
    );
  };

  const clearAll = () => {
    if (expenses.length === 0) return;

    Alert.alert(
      "Clear All",
      "Delete all expenses?",
      [
        { text: "Cancel" },
        {
          text: "Clear",
          onPress: clearExpenses,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          My Expenses
        </Text>

        <TouchableOpacity
          style={styles.home}
          onPress={goHome}
        >
          <Text style={styles.white}>
            Home
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.clear}
        onPress={clearAll}
      >
        <Text style={styles.clearText}>
          Clear All
        </Text>
      </TouchableOpacity>

      {expenses.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            No Expenses
          </Text>
          <Text style={styles.hint}>
            Your expenses appear here.
          </Text>
        </View>
      ) : (
        expenses
          .slice()
          .reverse()
          .map((item) => (
            <View
              style={styles.card}
              key={item.id}
            >
              {editId === item.id ? (
                <View>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Expense Name"
                  />

                  <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="Amount"
                    keyboardType="decimal-pad"
                  />

                  <View style={styles.row}>
                    {[
                      "Food",
                      "Transport",
                      "Other",
                    ].map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={[
                          styles.category,
                          category === item &&
                            styles.selected,
                        ]}
                        onPress={() =>
                          setCategory(item)
                        }
                      >
                        <Text
                          style={[
                            styles.categoryText,
                            category === item &&
                              styles.white,
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="Date"
                  />

                  <TouchableOpacity
                    style={styles.save}
                    onPress={saveEdit}
                  >
                    <Text style={styles.white}>
                      Save Changes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancel}
                    onPress={() => setEditId(null)}
                  >
                    <Text style={styles.cancelText}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <View style={styles.info}>
                    <View style={styles.details}>
                      <Text style={styles.itemTitle}>
                        {item.title}
                      </Text>

                      <Text style={styles.hint}>
                        {item.category} • {item.date}
                      </Text>
                    </View>

                    <Text style={styles.amount}>
                      ₱{Number(item.amount).toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={styles.edit}
                      onPress={() =>
                        editExpense(item)
                      }
                    >
                      <Text style={styles.editText}>
                        Edit
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.delete}
                      onPress={() =>
                        removeExpense(item.id)
                      }
                    >
                      <Text style={styles.white}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    color: "#246BCE",
    fontSize: 26,
    fontWeight: "bold",
  },
  home: {
    backgroundColor: "#246BCE",
    padding: 10,
    borderRadius: 8,
  },
  white: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  clear: {
    borderWidth: 1,
    borderColor: "#246BCE",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  clearText: {
    color: "#246BCE",
    fontWeight: "bold",
  },
  empty: {
    backgroundColor: "#FFFFFF",
    padding: 35,
    borderRadius: 10,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
  },
  hint: {
    color: "#888888",
    fontSize: 11,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D9E5F5",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    flex: 1,
  },
  itemTitle: {
    color: "#333333",
    fontWeight: "bold",
  },
  amount: {
    color: "#246BCE",
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  edit: {
    flex: 1,
    backgroundColor: "#E8F1FF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  editText: {
    color: "#246BCE",
    fontWeight: "bold",
  },
  delete: {
    flex: 1,
    backgroundColor: "#246BCE",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#BFD3F2",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 8,
  },
  category: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#BFD3F2",
    borderRadius: 8,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#246BCE",
  },
  categoryText: {
    color: "#246BCE",
    fontSize: 11,
    fontWeight: "bold",
  },
  save: {
    backgroundColor: "#246BCE",
    padding: 11,
    borderRadius: 8,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#E8F1FF",
    padding: 11,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 7,
  },
  cancelText: {
    color: "#246BCE",
    fontWeight: "bold",
  },
});