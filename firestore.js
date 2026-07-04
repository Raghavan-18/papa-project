import { db } from "./firebase.js";
import { doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Save user data upon registration
export async function saveUserData(userId, userData) {
    try {
        await setDoc(doc(db, "users", userId), userData);
        console.log("User data saved successfully");
    } catch (e) {
        console.error("Error saving user data: ", e);
        throw e;
    }
}

// Fetch user data for the dashboard
export async function getUserData(userId) {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such user document!");
            return null;
        }
    } catch (e) {
        console.error("Error fetching user data: ", e);
        throw e;
    }
}

// Update user data (e.g. eligibility history, saved schemes)
export async function updateUserData(userId, updateData) {
    try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, updateData, { merge: true });
        console.log("User data updated successfully");
    } catch (e) {
        console.error("Error updating user data: ", e);
        throw e;
    }
}
