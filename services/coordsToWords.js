import * as Location from "expo-location";

export const coordsToWords = async (latitude, longitude) => {
  const location = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });
  return location;
};
