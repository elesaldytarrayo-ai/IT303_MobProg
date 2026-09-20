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

export default function DailyExpenses({ goHome }) {
  const { addExpense } = useExpenses();

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(today);

  const saveExpense = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Enter an expense name.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      Alert.alert("Error", "Enter a valid amount.");
      return;
    }

    addExpense({
      title,
      amount,
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(today);

    Alert.alert(
      "Success",
      "Expense added successfully.",
      [{ text: "OK", onPress: goHome }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Add Expense
      </Text>

      <Text style={styles.label}>
        Expense Name
      </Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Example: Lunch"
      />

      <Text style={styles.label}>
        Amount
      </Text>

      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>
        Category
      </Text>

      <View style={styles.row}>
        {["Food", "Transport", "Other"].map(
          (item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.category,
                category === item &&
                  styles.selected,
              ]}
              onPress={() => setCategory(item)}
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
          )
        )}
      </View>

      <Text style={styles.label}>
        Date
      </Text>

      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveExpense}
      >
        <Text style={styles.buttonText}>
          Save Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    color: "#246BCE",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#BFD3F2",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  category: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#BFD3F2",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  selected: {
    backgroundColor: "#246BCE",
  },
  categoryText: {
    color: "#246BCE",
    fontWeight: "bold",
  },
  white: {
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#246BCE",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});