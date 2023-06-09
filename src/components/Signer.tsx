
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { SignedMessage } from "@mysten/sui.js";
import { toB64 } from '@mysten/bcs';


export function Signer() {
    const router = useRouter();
    const [data, updateSignData] = useState("");
    const [result, updateSignResult] = useState<SignedMessage>({ messageBytes: "", signature: "" });
    const [pubKey, updatePubkey] = useState("");
    useEffect(() => {
        (async () => {
            console.log("render once ...");
            if (typeof router.query.msg === 'string') {
                updateSignData(router.query.msg);
            }
        })();
    }, [router.query]);
    const { signMessage, account } = useWallet();
    const signContentAction = async () => {
        try {
            const result = await signMessage({
                message: new TextEncoder().encode(data)
            })
            if (!result) return
            console.log('signMessage success', result)
            updateSignResult(result);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    useEffect(() => {
        if (account?.publicKey && account.publicKey.length > 0) {
            updatePubkey(toB64(account.publicKey));
        }
        // console.log("public key : ", account?.publicKey);
    }, [account]);

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl mt-5">
            <div className="card-body">
                <h2 className="card-title">Sui Signer</h2>
                <input
                    placeholder="message to sign"
                    className="mt-8 p-4 input input-bordered input-primary w-full"
                    value={data}
                    onChange={(e) =>
                        updateSignData(e.target.value)
                    }
                />
                {

                }
                {
                    result.messageBytes === "" || (<>
                        <p>publicKey: {pubKey}</p>
                        <p>messageBytes: {result.messageBytes}</p>
                        <b>signature: {result.signature}</b>
                    </>)
                }
                <div className="card-actions justify-end">
                    <button
                        onClick={signContentAction}
                        className="btn btn-primary btn-xl"
                    >
                        Sign Content
                    </button>
                </div>
            </div>
        </div>
    );
}
