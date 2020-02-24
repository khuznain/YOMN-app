import React from "react";
import MapView from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const MapModal = props => (
  <View style={styles.content}>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
    />
  </View>
);
export default MapModal;

const styles = StyleSheet.create({
  content: {
    height: (height + 50) / 2,
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
