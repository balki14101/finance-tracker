import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { api } from "../../services/api";

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    alert("api function call");
    try {
      alert("inside try");
      await api.post("/signup", { email, password });
      alert("Signup successful");
      navigation.navigate("Login");
    } catch (error) {
      alert("Signup Failed");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Signup" onPress={handleSignup} />

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "blue",
  },
});
