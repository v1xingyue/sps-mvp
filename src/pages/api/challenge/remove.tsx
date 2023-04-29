import { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage, IntentScope } from '@mysten/sui.js';
import admin from '../../../firebase/admin/init';
import { isSignedByAddress } from "../../../utils";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { message, address, signature, name } = JSON.parse(req.body);
    if (signature === null || name == null) {
        res.status(200).json({
            error: "Invalid data provided"
        });
    } else {
        const signData = new TextEncoder().encode(message);
        const isValid = await verifyMessage(
            signData, signature, IntentScope.PersonalMessage
        );
        const isRealValid = await isSignedByAddress(address, signature);
        if (isValid && isRealValid) {
            const db = admin.firestore();
            const userDB = db.collection("challenges");
            const doc = userDB.where("name", "==", name);
            const snapshot = await doc.get();
            const batch = db.batch();
            snapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
                batch.delete(doc.ref);
            });
            const result = await batch.commit();
            res.status(200).json({
                isValid,
                result
            });
        } else {
            res.status(200).json({
                isValid,
                isRealValid,
                message: "signature verification failed"
            });
        }
    }
}

export default Handler;