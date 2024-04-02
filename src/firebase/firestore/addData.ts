import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to add data to a Firestore collection
export default async function addData(
  _collection: string,
  data: any,
  pid?: string,
  includeCreatedAt: boolean = false
) {
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  const id = pid ?? "";

  try {
    // Set the document with the provided data in the specified collection and ID
    const ref =
      id.length === 0
        ? doc(collection(db, _collection))
        : doc(db, _collection, id);

    const tileData = { ...data, id: ref.id, updatedAt: serverTimestamp() };

    const tileDateToUse = includeCreatedAt
      ? { ...tileData, createdAt: serverTimestamp() }
      : tileData;

    // Merge the new data with existing document data
    result = await setDoc(ref, tileDateToUse, {
      merge: true,
    });
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}
