import admin from '../../firebase/admin/init';
import { NextApiRequest, NextApiResponse } from 'next'

// sui/sdk/typescript/test/unit/cryptography/ed25519-keypair.test.ts
// it('signature of data is valid', () => {
//     const keypair = new Ed25519Keypair();
//     const signData = new TextEncoder().encode('hello world');
//     const signature = keypair.signData(signData);
//     const isValid = nacl.sign.detached.verify(
//       signData,
//       signature,
//       keypair.getPublicKey().toBytes(),
//     );
//     expect(isValid).toBeTruthy();
//   });

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