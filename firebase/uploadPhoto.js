import uuid from "react-native-uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { app, storage } from "./config";

export const uploadPhotoToServer = async (photo) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePhotoName = uuid.v4();

    const storageRef = await ref(storage, `postImages/${uniquePhotoName}`);

    await uploadBytes(storageRef, file).then();

    const photoUrl = await getDownloadURL(storageRef);

    return photoUrl;
  } catch (error) {
    console.log("error:", error);
  }
};
