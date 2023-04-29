import { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage, IntentScope } from '@mysten/sui.js';
import admin from '../../../firebase/admin/init';
import { isSignedByAddress } from "../../../utils";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { message, address, signature, deployedURL, contractURL, description, challengeID } = JSON.parse(req.body);
    if (signature === null || deployedURL == null || contractURL == null || challengeID == null) {
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
            console.log("isValid : ", isValid);
            const db = admin.firestore();
            const userDB = db.collection("challenge_submit");
            const doc = userDB.doc();
            const userSaved = await doc.set({
                submit_time: new Date(),
                address,
                deployedURL,
                description,
                contractURL,
                challengeID
            });
            res.status(200).json({
                isValid,
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