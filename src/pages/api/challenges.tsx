import admin from '../../firebase/admin/init';
import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    const firebase = admin.firestore();
    firebase
        .collection('challenges')
        .get()
        .then((posts) => {
            const items = posts.docs.map((doc) => {
                return doc.data();
            });
            res.statusCode = 200
            res.json({
                message: 'Hello World',
                items
            })
        })
        .catch((e) => {
            console.log(e);
            res.json({
                err: e
            });
        })

}