import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function MapScreen({ route }) {
  const { latitude, longitude } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        {latitude && (
          <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
        )}
      </MapView>
    </View>
  );
}
