import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import App from "./src";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <App />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
