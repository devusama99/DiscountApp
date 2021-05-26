import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

// import Custom Components
import CustomButton from "./CustomButton";

export default function HomeScreen({ navigation }) {
  const [getSaveState, setSaveState] = useState("on");
  const [getHistory, setHistory] = useState([]);
  const [getErr, setErr] = useState("");
  const [getObj, setObj] = useState({
    id: Math.random().toString(),
    orignalPrice: "",
    discountPercentage: "",
    discount: 0,
  });
  const calculateDiscount = (price, percentage) => {
    setSaveState("on");
    if (!isNaN(price) && !isNaN(percentage)) {
      if (
        (price > 0 || price === "") &&
        (percentage > 0 || percentage === "")
      ) {
        if (percentage <= 100) {
          setErr("");
          let discount = (Number(percentage) / 100) * Number(price);
          setObj({
            id: Math.random().toString(),
            orignalPrice: price,
            discountPercentage: percentage,
            discount: String(discount.toFixed(2)),
          });
        } else {
          setErr("Discount Percentage can be utmost 100");
        }
      } else {
        setErr("Price or Discount Percentage should be greater than zero");
      }
    } else {
      setErr("Please Enter Number in Price or Discount Percentage input ");
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.ButtonTouchables}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("HistoryScreen", { history: getHistory });
          }}
        >
          <Text>History</Text>
        </TouchableOpacity>
      ),
    });
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.inputView}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>Orignal Price</Text>
          <TextInput
            value={String(getObj.orignalPrice)}
            style={styles.input}
            onChangeText={(input) => {
              calculateDiscount(input, getObj.discountPercentage);
            }}
          ></TextInput>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>Discount Percentage</Text>
          <TextInput
            value={String(getObj.discountPercentage)}
            style={styles.input}
            onChangeText={(input) => {
              calculateDiscount(getObj.orignalPrice, input);
            }}
          ></TextInput>
        </View>
      </View>
      <Text style={styles.err}>{getErr}</Text>
      <View style={styles.displayView}>
        <Text style={styles.displayText}>Price After Discount Discount :</Text>
        <Text style={styles.displayTextDisocunt}>
          {(getObj.orignalPrice - getObj.discount).toFixed(2)}
        </Text>

        <Text style={styles.displayText}>Total Discount :</Text>
        <Text style={styles.displayTextDisocunt}>
          {Number(getObj.discount).toFixed(2)}
        </Text>
      </View>
      <View style={styles.ButtonView}>
        <CustomButton
          text="Save"
          state={
            getObj.orignalPrice == "" || getObj.discountPercentage == ""
              ? "off"
              : getSaveState
          }
          onPress={() => {
            setHistory([...getHistory, getObj]);
            setSaveState("off");
            setObj({
              id: Math.random().toString(),
              orignalPrice: "",
              discountPercentage: "",
              discount: 0,
            });
          }}
        >
          <Text style={styles.ButtonTouchablesText}>Save</Text>
        </CustomButton>
        <CustomButton
          text="Clear"
          state={"on"}
          onPress={() =>
            setObj({
              orignalPrice: "",
              discountPercentage: "",
              discount: "0",
              id: Math.random().toString(),
            })
          }
        >
          <Text style={styles.ButtonTouchablesText}>Clear</Text>
        </CustomButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inputGroup: {
    width: "50%",
    flexDirection: "column",
    padding: 7,
  },
  inputText: {
    fontSize: 12,
    paddingVertical: 3,
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 5,
  },
  err: {
    color: "red",
    width: "100%",
    paddingHorizontal: 7,
  },
  displayView: {
    width: "100%",
    marginTop: 15,
    padding: 7,
    alignItems: "flex-start",
  },
  displayText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  displayTextDisocunt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  ButtonView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
    padding: 7,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  ButtonTouchables: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
