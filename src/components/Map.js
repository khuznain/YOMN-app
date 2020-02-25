import React from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { theme } from "../constants";

const { height } = Dimensions.get("window");

const MapModal = ({ location }) => (
  <View style={styles.content}>
    {/* {!location && (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    )} */}

    {location && (
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          rotation={-15}
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={{ latitude: location.lat, longitude: location.lng }}
        ></Marker>
      </MapView>
    )}
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
