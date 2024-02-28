import { db } from "./firestoreConfig";

import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const textStr = "text";
const textCollectionRef = collection(db, textStr);

class Helper {
  getTexts = async () => {
    const { docs } = await getDocs(textCollectionRef);
    return docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };

  addTexts = async (text) => {
   return addDoc(textCollectionRef, text);
  };

  deleteTexts = async (id) => {
    const textDelete = doc(db, textStr, id);
    return deleteDoc(textDelete);
  };

}

export default new Helper();
