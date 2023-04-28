import { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage, IntentScope } from '@mysten/sui.js';
import admin from '../../../firebase/admin/init';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { message, signature, deployURL, contractURL, description, challengeName } = JSON.parse(req.body);
    if (signature === null || deployURL == null || contractURL == null || challengeName == null) {
        res.status(400).json({
            error: "Invalid data provided"
        });
    } else {
        const signData = new TextEncoder().encode(message);
        const isValid = await verifyMessage(
            signData, signature, IntentScope.PersonalMessage
        );
        if (isValid) {
            console.log("isValid : ", isValid);
            const db = admin.firestore();
            const userDB = db.collection("challenge_submit");
            const doc = userDB.doc();
            const userSaved = await doc.set({
                submit_time: new Date(),
                deployURL,
                description,
                contractURL,
                challengeName
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