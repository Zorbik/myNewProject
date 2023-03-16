import * as Location from "expo-location";

export const coordsToWords = async (latitude, longitude) => {
  try {
    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    return location;
  } catch (error) {
    console.log("error:", error);
  }
};
