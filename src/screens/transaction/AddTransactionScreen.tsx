import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { addTransaction } from "@/src/store/slices/transactionSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "../../../assets/images/react-logo.png";

const AddTransactionScreen = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [active, setActive] = useState("Expense");
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
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

  const categoryList = [
    {
      categoryIcon: Icon,
      categoryName: "Food",
    },
    {
      categoryIcon: Icon,
      categoryName: "Entertainment",
    },
    {
      categoryIcon: Icon,
      categoryName: "Travel",
    },
    {
      categoryIcon: Icon,
      categoryName: "Shopping",
    },
    {
      categoryIcon: Icon,
      categoryName: "Medicine",
    },
    {
      categoryIcon: Icon,
      categoryName: "Others",
    },
  ];

  function handleAdd() {
    if (amount != "") {
      dispatch(
        addTransaction({
          amount: Number(amount),
          date: date.toDateString(),
          type: active,
          selectedCategory: selectedCategory,
          note: note,
        }),
      );
      setAmount("");
      console.log("updated state", transactions);
    } else Alert.alert("Enter the amount");
  }
  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Text style={styles.header}>Enter Amount</Text>

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.amountTextInput}
      />
      <Text>{date.toDateString()}</Text>

      <TouchableOpacity onPress={() => setShow(true)}>
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
          Select Date
        </Text>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event: any, selectedDate: any) => {
              setShow(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </TouchableOpacity>
      <View style={styles.toggleButtonView}>
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

      {active == "Expense" ? (
        <>
          <Text style={styles.header}>Select Category</Text>
          <View style={styles.grid}>
            {categoryList.map((item, index) => (
              <TouchableOpacity
                key={String(index)}
                style={[
                  styles.categoryView,
                  index == selectedCategoryIndex
                    ? { backgroundColor: "blue" }
                    : null,
                ]}
                onPress={() => {
                  setSelectedCategory(item.categoryName);
                  setSelectedCategoryIndex(index);
                }}
              >
                <Image source={item.categoryIcon} style={styles.iconStyle} />
                <Text style={styles.iconText}>{item.categoryName}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Add note"
            keyboardType="default"
            value={note}
            onChangeText={setNote}
            style={styles.noteInput}
          />
        </>
      ) : null}
      <View style={styles.addButton}></View>
      <TouchableOpacity onPress={handleAdd}>
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
          Add
        </Text>
      </TouchableOpacity>

      {/* <Text>Total: {total}</Text>
          {transactions?.map((item: any, index: string) => (
            <Text key={index}>
              {item.type} - {item.amount}
            </Text>
          ))} */}
    </SafeAreaView>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  header: {
    fontWeight: "700",
    color: "#000000",
    fontSize: 20,
    marginTop: 8,
  },
  amountTextInput: {
    borderRadius: 4,
    borderColor: "#000000",
    borderWidth: 0.4,
    padding: 4,
    marginVertical: 8,
    height: 48,
  },
  toggleButtonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
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
  addButton: { flex: 1, justifyContent: "flex-end" },
});
