import { logout } from "@/src/store/slices/authSlice";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const DashboardScreen = ({ navigation }: any) => {
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const transactions = useSelector(
    (state: any) => state.transaction.transactions,
  );

  const totalBalance = transactions.reduce(
    (acc: any, item: any) =>
      item.type == "income" ? acc + item.amount : acc - item.amount,
    0,
  );
  const totalIncome = transactions.reduce(
    (acc: any, item: any) => (item.type == "income" ? acc + item.amount : null),
    0,
  );
  const totalExpense = transactions.reduce(
    (acc: any, item: any) =>
      item.type == "expense" ? acc + item.amount : null,
    0,
  );
  console.log("user in dashboard", user);
  const visibleTransactions = expand ? transactions : transactions.slice(-3);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome 👋</Text>
      <Text style={styles.emailText}>{user?.email}</Text>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceHeader}>Total Income</Text>
        <Text style={styles.balanceText}>₹ {totalIncome}</Text>
      </View>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceHeader}>Total Expense</Text>
        <Text style={styles.balanceText}>₹ {totalExpense}</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.addTransactionButton}
          onPress={() => navigation.navigate("AddTransaction")}
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
        //   <View style={styles.transactionSummary}>
        //     <Text>Recent Transactions</Text>
        //     {visibleTransactions.map((item: any, index: any) => (
        //       <View key={index}>
        //         {item.type == "income" ? (
        //           <Text style={{ borderBottomColor: "#808080", borderWidth: 1 }}>
        //             <Ionicons name="arrow-up" size={20} color="green" /> + ₹{" "}
        //             {item.amount} {}
        //           </Text>
        //         ) : (
        //           <Text
        //             style={{
        //               borderBottomColor: "#808080",
        //               borderBottomWidth: 0.4,
        //               fontSize: 24,
        //               fontWeight: 600,
        //               color: "#808080",
        //             }}
        //           >
        //             <Ionicons name="arrow-down" size={20} color="red" />
        //             {"- "}
        //             <Text
        //               style={{
        //                 color: "#000000",
        //               }}
        //             >
        //               ₹ {item.amount}
        //             </Text>
        //             {" Grocery"}
        //             {}
        //           </Text>
        //         )}
        //       </View>
        //     ))}
        //     <Text
        //       style={{ textAlign: "right" }}
        //       onPress={() => {
        //         setExpand(!expand);
        //       }}
        //     >
        //       {expand ? "Hide" : "See more"}
        //     </Text>
        //   </View>
        // )
        <View style={styles.transactionSummary}>
          <Text>Recent Transactions</Text>

          <View style={styles.listContainer}>
            <FlatList
              data={visibleTransactions}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text>
                    {item.type === "income" ? "⬆" : "⬇"} ₹ {item.amount}
                  </Text>
                </View>
              )}
            />
          </View>

          <Text
            style={{ textAlign: "right" }}
            onPress={() => setExpand(!expand)}
          >
            {expand ? "Hide" : "See more"}
          </Text>
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
    marginVertical: 16,
    flex: 1,
  },
  listContainer: {
    // maxHeight: 250,
  },

  itemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
});
