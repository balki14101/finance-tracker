import { logout } from "@/src/store/slices/authSlice";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const DashboardScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  console.log("user in dashboard", user);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome: {user?.email}</Text>
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Transaction")}>
        <Text>transaction page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
