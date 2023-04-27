import { getFirestore, collection, getDocs, QuerySnapshot, query, where } from "firebase/firestore";
export const getChallenges = async () => {
    const fileStore = getFirestore()
    const colref = collection(fileStore, "challenges");
    const snapshot = await getDocs(colref);
    return snapshotToChallenges(snapshot);
}

export const snapshotToChallenges = (snapshot: QuerySnapshot) => {
    const challenges: Array<any> = [];
    snapshot.forEach((doc) => {
        challenges.push({ ...doc.data(), id: doc.id });
    })
    return challenges;
}

export const getChallenge = async (id: string) => {
    const fileStore = getFirestore()
    const colref = collection(fileStore, "challenges");
    const q = query(colref, where("name", "==", id));
    const snapshot = await getDocs(q);
    return snapshotToChallenges(snapshot)[0];
};

export const getProfile = async (address: string) => {
    const fileStore = getFirestore()
    const colref = collection(fileStore, "users");
    const q = query(colref, where("address", "==", address));
    const snapshot = await getDocs(q);
    return snapshotToChallenges(snapshot)[0];
};