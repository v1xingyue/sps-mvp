import { getFirestore, collection, getDocs, QuerySnapshot, query, where } from "firebase/firestore";
export const getChallenges = async () => {
    const fileStore = getFirestore()
    const colref = collection(fileStore, "challenges");
    return getDocs(colref);
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
    console.log(q);
    return getDocs(q);

};