import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useExpenses } from "./ExpenseContext";

export default function Dashboard({
  goToAdd,
  goToExpenses,
}) {
  const {
    expenses,
    total,
    foodTotal,
    transportTotal,
    otherTotal,
    loading,
  } = useExpenses();

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </View>
    );
  }

  const money = (value) =>
    `₱${Number(value).toFixed(2)}`;

  const recent = expenses.slice(-4).reverse();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.small}>
          PERSONAL EXPENSES
        </Text>

        <Text style={styles.title}>
          Expense Tracker
        </Text>

        <Text style={styles.description}>
          Manage your daily expenses easily.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={goToAdd}
        >
          <Text style={styles.buttonText}>
            + Add Expense
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Summary
      </Text>

      <View style={styles.totalCard}>
        <Text style={styles.label}>
          TOTAL EXPENSES
        </Text>

        <Text style={styles.total}>
          {money(total)}
        </Text>

        <Text style={styles.hint}>
          {expenses.length} expense(s)
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.label}>FOOD</Text>
          <Text style={styles.amount}>
            {money(foodTotal)}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            TRANSPORT
          </Text>
          <Text style={styles.amount}>
            {money(transportTotal)}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>OTHER</Text>
          <Text style={styles.amount}>
            {money(otherTotal)}
          </Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>
          Recent Expenses
        </Text>

        <TouchableOpacity onPress={goToExpenses}>
          <Text style={styles.link}>View All</Text>
        </TouchableOpacity>
      </View>

      {recent.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            No expenses yet
          </Text>

          <Text style={styles.hint}>
            Add your first expense.
          </Text>
        </View>
      ) : (
        recent.map((item) => (
          <View style={styles.expense} key={item.id}>
            <View style={styles.info}>
              <Text style={styles.expenseTitle}>
                {item.title}
              </Text>

              <Text style={styles.hint}>
                {item.category} • {item.date}
              </Text>
            </View>

            <Text style={styles.amount}>
              {money(item.amount)}
            </Text>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={goToExpenses}
      >
        <Text style={styles.link}>
          View All Expenses
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loading: {
    padding: 50,
    alignItems: "center",
  },
  loadingText: {
    color: "#246BCE",
    fontWeight: "bold",
  },
  hero: {
    backgroundColor: "#246BCE",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  small: {
    color: "#DDEAFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 5,
  },
  description: {
    color: "#EAF2FF",
    fontSize: 13,
    marginTop: 7,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#246BCE",
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#222222",
    fontSize: 19,
    fontWeight: "bold",
  },
  totalCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D9E5F5",
  },
  label: {
    color: "#777777",
    fontSize: 10,
    fontWeight: "bold",
  },
  total: {
    color: "#246BCE",
    fontSize: 29,
    fontWeight: "bold",
    marginTop: 5,
  },
  hint: {
    color: "#888888",
    fontSize: 11,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9E5F5",
  },
  amount: {
    color: "#246BCE",
    fontWeight: "bold",
    marginTop: 5,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  link: {
    color: "#246BCE",
    fontWeight: "bold",
  },
  empty: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#333333",
    fontWeight: "bold",
  },
  expense: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  expenseTitle: {
    color: "#333333",
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#E8F1FF",
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
});