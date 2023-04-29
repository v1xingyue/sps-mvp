import { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage, IntentScope } from '@mysten/sui.js';
import admin from '../../../firebase/admin/init';
import { isSignedByAddress } from "../../../utils";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { message, address, id, signature, name, description, markdown, order } = JSON.parse(req.body);
    if (signature === null || id == null) {
        res.status(400).json({
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
            const doc = userDB.doc(id);
            const userSaved = await doc.set({
                order,
                name,
                description,
                markdown
            }, { merge: true });
            res.status(200).json({
                isValid,
                id,
                userSaved
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