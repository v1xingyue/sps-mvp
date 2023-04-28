import { NextApiRequest, NextApiResponse } from 'next';
// import { fromB64 } from '@mysten/sui.js';
import { Secp256k1PublicKey, Ed25519PublicKey } from "@mysten/sui.js";
// import nacl from 'tweetnacl';


const parsePubKey = (key: string) => {
    try {
        return [new Ed25519PublicKey(key), "Ed25519"];
    } catch (error) {
        try {
            return [new Secp256k1PublicKey(key), "Secp256k1"];
        } catch (error) {
            return [null, "none"];
        }
    }
}

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { pubKey, github, result: { messageBytes, signature } } = JSON.parse(req.body);
    const [pub, keyType] = parsePubKey(pubKey);
    console.log(messageBytes, signature);
    if (keyType === "none") {
        res.status(400).json({
            error: "Invalid public key"
        });
    } else {
        res.status(200).json({
            pubKey, github, pub, keyType
        })
        // const signValid = false;
        // const d = fromB64(signature);
        // console.log(d.length);
        // if (keyType === "Ed25519" && (pub instanceof Ed25519PublicKey)) {
        //     console.log(pub.toBytes());
        //     // const isValid = nacl.sign.detached.verify(
        //     //     fromB64(messageBytes),
        //     //     fromB64(signature),
        //     //     pub.toBytes(),
        //     // );
        //     // console.log(isValid);
        // }
        // if (signValid) {
        //     res.status(200).json({
        //         pubKey, github, pub, keyType
        //     })
        // } else {
        //     res.status(200).json({
        //         error: "Invalid signature"
        //     })
        // }
    }

}

export default Handler;