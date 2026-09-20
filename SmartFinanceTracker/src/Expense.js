import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { ExpenseProvider } from "./ExpenseContext";
import Dashboard from "./Dashboard";
import DailyExpenses from "./DailyExpenses";
import DisplayExpenses from "./DisplayExpenses";

function ExpenseApp() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "add") {
      return <DailyExpenses goHome={() => setPage("home")} />;
    }

    if (page === "expenses") {
      return <DisplayExpenses goHome={() => setPage("home")} />;
    }

    return (
      <Dashboard
        goToAdd={() => setPage("add")}
        goToExpenses={() => setPage("expenses")}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Expense Tracker</Text>
          <Text style={styles.money}>₱</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {renderPage()}
        </ScrollView>

        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setPage("home")}
          >
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setPage("add")}
          >
            <Text style={styles.navText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setPage("expenses")}
          >
            <Text style={styles.navText}>Expenses</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function Expense() {
  return (
    <ExpenseProvider>
      <ExpenseApp />
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F8FF",
  },
  container: {
    flex: 1,
  },
  header: {
    height: 65,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#D9E5F5",
  },
  logo: {
    color: "#246BCE",
    fontSize: 20,
    fontWeight: "bold",
  },
  money: {
    color: "#246BCE",
    fontSize: 26,
    fontWeight: "bold",
  },
  scroll: {
    paddingBottom: 20,
  },
  nav: {
    height: 65,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#D9E5F5",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  navText: {
    color: "#246BCE",
    fontSize: 13,
    fontWeight: "bold",
  },
});