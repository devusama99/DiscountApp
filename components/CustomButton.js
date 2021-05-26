import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Keyboard,
  TextPropTypes,
} from "react-native";

export default function CustomButton(props) {
  return (
    <TouchableOpacity
      style={{
        ...styles.ButtonTouchables,
        backgroundColor: props.state === "on" ? "#424242" : "#757575",
      }}
      activeOpacity={0.8}
      onPress={props.onPress}
      disabled={props.state === "on" ? false : true}
    >
      <Text style={styles.ButtonTouchablesText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonTouchables: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  ButtonTouchablesText: {
    color: "white",
  },
});
