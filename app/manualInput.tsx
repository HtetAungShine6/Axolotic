import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ManualInputScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Manual Input Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ManualInputScreen;
