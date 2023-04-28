import { fromSerializedSignature } from "@mysten/sui.js";
import admin from '../firebase/admin/init';

const getDBProfile = async (address: string) => {
    const db = admin.firestore();
    const userdb = db.collection("users");
    const snapshot = await userdb.where("address", "==", address).get();
    return snapshot.docs[0].data();
}

export const isSignedByAddress = async (address: string, signature: string) => {
    const profile = await getDBProfile(address);
    console.log(profile);
    if (profile) {
        const publicKeyB64 = profile.publicKeyB64 as string;
        const pubKeyused = parsePublicKey(signature);
        return publicKeyB64 === pubKeyused;
    }
    return false;
}

export const parsePublicKey = (signature: string) => {
    const signPair = fromSerializedSignature(signature);
    return signPair.pubKey.toBase64();
}