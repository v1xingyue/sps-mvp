import { useEffect, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { toB64 } from '@mysten/bcs';

const Register = () => {
    const [pubKey, updatePubkey] = useState("");
    const [github, updateGithub] = useState("");
    const { signMessage, account } = useWallet();
    const [signData, updateSignData] = useState("");

    const loadCode = async () => {
        if (account && account.address) {
            const resp = await fetch("/api/register/code", { method: "POST", body: JSON.stringify({ address: account?.address }) });
            const code = await resp.json();
            return code;
        }
    }

    const doRegister = async () => {
        try {
            if (account?.publicKey && account.publicKey.length > 0) {
                updatePubkey(toB64(account.publicKey));
            }
            const code = await loadCode();
            const data = `You will register as a developer. \n random: ${code.hash}\n address: ${account?.address} \n`;
            console.log(data);
            const result = await signMessage({
                message: new TextEncoder().encode(data)
            });
            const payload = {
                address: account?.address,
                message: data,
                signature: result.signature,
                github
            };
            updateSignData(JSON.stringify(payload, null, 2));
            const saveResult = await fetch("/api/register/save", {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const saveJSON = await saveResult.json();
            if (saveJSON.userSaved) {
                location.href = "/profile";
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    useEffect(() => {
        if (account?.publicKey && account.publicKey.length > 0) {
            updatePubkey(toB64(account.publicKey));
        }
        // console.log("public key : ", account?.publicKey);
    }, [account]);
    return (
        <div className="card w-4/5 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Register as developer</h2>
                <input type="text" value={pubKey} onChange={(e) => updatePubkey(e.target.value)} placeholder="Public Key" className="input input-bordered mt-3" />
                <input type="text" value={github} onChange={(e) => updateGithub(e.target.value)} placeholder="github" className="input input-bordered mt-3" />
                <pre>
                    {signData}
                </pre>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={doRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register;