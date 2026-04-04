import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import AddTransactionScreen from "../screens/transaction/AddTransactionScreen";
import TransactionScreen from "../screens/transaction/TransactionScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen
              name="Transaction"
              component={TransactionScreen}
              options={{
                headerShown: true,
                title: "Transactions",
                headerStyle: {
                  backgroundColor: "lightblue",
                },
              }}
            />
            <Stack.Screen
              name="AddTransaction"
              component={AddTransactionScreen}
              options={{
                headerShown: true,
                title: "Add Transactions",
                headerStyle: {
                  backgroundColor: "lightblue",
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
