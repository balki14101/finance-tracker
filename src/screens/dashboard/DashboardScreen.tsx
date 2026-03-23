import { logout } from "@/src/store/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const DashboardScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const transactions = useSelector(
    (state: any) => state.transaction.transactions,
  );

  const total = transactions.reduce(
    (acc: any, item: any) =>
      item.type == "income" ? acc + item.amount : (acc = item.amount),
    0,
  );
  console.log("user in dashboard", user);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome 👋</Text>
      <Text style={styles.emailText}>{user?.email}</Text>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceHeader}>Total Balance</Text>
        <Text style={styles.balanceText}>₹ {total}</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.addTransactionButton}
          onPress={() => navigation.navigate("Transaction")}
        >
          <Text
            style={{ textAlign: "center", color: "#FFFFFF", fontWeight: 500 }}
          >
            Transactions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => dispatch(logout())}
        >
          <Text style={{ textAlign: "center", fontWeight: 500 }}>Logout</Text>
        </TouchableOpacity>
      </View>
      {transactions.length > 0 ? (
        <View style={styles.transactionSummary}>
          {transactions.slice(0, 3).map((item: any, index: any) => (
            <View key={index}>
              {item.type == "income" ? (
                <Text style={{ borderBottomColor: "#808080", borderWidth: 1 }}>
                  <Ionicons name="arrow-up" size={20} color="green" /> + ₹{" "}
                  {item.amount} {}
                </Text>
              ) : (
                <Text
                  style={{
                    borderBottomColor: "#808080",
                    borderBottomWidth: 0.4,
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#808080",
                  }}
                >
                  <Ionicons name="arrow-down" size={20} color="red" />
                  {"- "}
                  <Text
                    style={{
                      color: "#000000",
                    }}
                  >
                    ₹ {item.amount}
                  </Text>
                  {" Grocery"}
                  {}
                </Text>
              )}
            </View>
          ))}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: "#F5F5F5" },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
  },
  emailText: {
    fontSize: 20,
    color: "#808080",
  },
  balanceCard: {
    backgroundColor: "green",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  balanceHeader: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  balanceText: {
    fontSize: 48,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 16,
  },
  buttonView: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  addTransactionButton: {
    flex: 1,
    backgroundColor: "blue",
    borderRadius: 16,
    padding: 20,
    marginRight: 4,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginLeft: 4,
  },
  transactionSummary: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
});
