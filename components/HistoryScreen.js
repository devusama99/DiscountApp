import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
} from "react-native";

import { DataTable } from "react-native-paper";

export default function HistoryScreen({ navigation, route }) {
  const [refresh, setrefresh] = useState("");
  const historyList = route.params.history;
  const deleteItem = (id) => {
    const index = historyList.findIndex((ele) => ele.id === id);
    historyList.splice(index, index + 1);
    setrefresh("refresh");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.ButtonTouchables}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert("Delete", "Are You Sure You Want To Delete All Items", [
              { text: "NO", onPress: () => 0, style: "cancel" },
              {
                text: "YES",
                onPress: () => {
                  historyList.length = 0;
                  setrefresh("refresh");
                },
              },
            ]);
          }}
        >
          <Text>Clear All</Text>
        </TouchableOpacity>
      ),
    });
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Orignal Price</DataTable.Title>
          <DataTable.Title>Discount</DataTable.Title>
          <DataTable.Title>Final Price</DataTable.Title>
          <DataTable.Title>Delete</DataTable.Title>
        </DataTable.Header>
        {historyList.map((element) => (
          <DataTable.Row key={element.id}>
            <DataTable.Cell>{element.orignalPrice}</DataTable.Cell>
            <DataTable.Cell>{element.discountPercentage}%</DataTable.Cell>
            <DataTable.Cell>
              {element.orignalPrice - element.discount}
            </DataTable.Cell>
            <DataTable.Cell>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.delButton}
                onPress={() => {
                  deleteItem(element.id);
                }}
              >
                <Text style={styles.delButtonText}>x</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
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
  delButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "black",
  },
  delButtonText: { color: "#fff" },

  ButtonTouchables: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
