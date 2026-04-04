import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";

const TransactionScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("All");

  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const transactions = useSelector(
    (state: any) => state.transaction.transactions,
  );

  const total = transactions.reduce(
    (acc: any, item: any) =>
      item.type == "income" ? acc + item.amount : acc - item.amount,
    0,
  );

  const authState = useSelector((state: any) => state.auth);
  const transState = useSelector((state: any) => state.transaction);
  console.log("FULL STATE:", authState);
  console.log("FULL STATE:", transState);

  const visibleTransactions =
    active == "All"
      ? transactions
      : transactions.filter((item: any) => item.type == active);

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{
        paddingHorizontal: 20,
        flex: 1,
        // backgroundColor: "red",
      }}
    >
      <View style={styles.toggleButtonView}>
        <TouchableOpacity
          style={active == "All" ? styles.activeToggle : styles.inactiveToggle}
          onPress={() => setActive("All")}
        >
          <Text
            style={
              active == "All"
                ? styles.activeToggletext
                : styles.inactiveToggletext
            }
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            active == "Expense" ? styles.activeToggle : styles.inactiveToggle
          }
          onPress={() => setActive("Expense")}
        >
          <Text
            style={
              active == "Expense"
                ? styles.activeToggletext
                : styles.inactiveToggletext
            }
          >
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            active == "Income" ? styles.activeToggle : styles.inactiveToggle
          }
          onPress={() => setActive("Income")}
        >
          <Text
            style={
              active == "Income"
                ? styles.activeToggletext
                : styles.inactiveToggletext
            }
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>
      {visibleTransactions.length > 0 ? (
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
        </View>
      ) : (
        <Text>No Transactions made</Text>
      )}
      <View style={{ flex: 1 }}></View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTransaction")}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            color: "#FFFFFF",
            fontWeight: "700",
            backgroundColor: "blue",
            borderRadius: 4,
            paddingVertical: 8,
          }}
        >
          Add Transaction
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  header: {
    fontWeight: "700",
    color: "#000000",
    fontSize: 20,
  },
  amountTextInput: {
    borderRadius: 4,
    borderColor: "#000000",
    borderWidth: 0.4,
    padding: 4,
    marginVertical: 8,
  },
  toggleButtonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  activeToggle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "blue",
    padding: 12,
  },
  activeToggletext: {
    color: "#FFFFFF",
    fontWeight: 500,
  },

  inactiveToggle: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000000",
    borderWidth: 0.4,
    flex: 1,
    padding: 12,
  },
  inactiveToggletext: {
    color: "#000000",
    fontWeight: 500,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  categoryView: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    marginTop: 8,
  },
  iconStyle: {
    height: 56,
    width: 56,
  },
  iconText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 16,
  },
  noteInput: {
    borderRadius: 4,
    borderColor: "#000000",
    borderWidth: 0.4,
    padding: 4,
    marginVertical: 8,
  },
  addButton: { justifyContent: "flex-end" },
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
