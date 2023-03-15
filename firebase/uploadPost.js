import { addDoc, collection } from "firebase/firestore";
import { db } from "./config";

export const uploadPost = async (postObject) => {
  try {
    await addDoc(collection(db, "posts"), postObject);
  } catch (error) {
    console.log(error);
  }
};
