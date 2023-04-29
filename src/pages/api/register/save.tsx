import { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage, IntentScope } from '@mysten/sui.js';
import admin from '../../../firebase/admin/init';
import { parsePublicKey } from '../../../utils';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { address, message, signature, github } = JSON.parse(req.body);
    if (signature === null || address == null || message == null) {
        res.status(400).json({
            error: "Invalid data provided"
        });
    } else {
        const signData = new TextEncoder().encode(message);
        const isValid = await verifyMessage(
            signData, signature, IntentScope.PersonalMessage
        );
        if (isValid) {
            const publicKeyB64 = parsePublicKey(signature);
            console.log("isValid : ", isValid);
            const db = admin.firestore();
            const userDB = db.collection("users");
            const doc = userDB.doc(address);
            const userSaved = await doc.set({
                register_time: new Date(),
                is_admin: false,
                address,
                publicKeyB64,
                github,
            });
            res.status(200).json({
                isValid,
                userSaved
            });
        } else {
            res.status(200).json({
                isValid: false,
                message: "signature verification failed"
            });
        }
    }
}

export default Handler;