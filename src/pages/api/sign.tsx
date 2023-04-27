

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

export default (_req: NextApiRequest, res: NextApiResponse) => {
    res.json({
        message: 'Hello World'
    })
}