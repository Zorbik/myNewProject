import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const getCount = async (postId, desired) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    const array = postDoc.data()[desired];
    const count = array.length;
    return count;
  } catch (error) {
    console.log(error);
  }
};
