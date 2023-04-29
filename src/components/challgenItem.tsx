import { useWallet } from "@suiet/wallet-kit";
import { useState } from "react";

const ChallengeItem = ({ challenge }: { challenge: any }) => {
    const [params, updateParams] = useState<any>(challenge);
    const { signMessage, address } = useWallet();

    const saveParams = async () => {
        const message = `You will update : ` + JSON.stringify(params);
        const result = await signMessage({
            message: new TextEncoder().encode(message)
        });
        const resp = await fetch("/api/challenge/update", {
            method: "POST",
            body: JSON.stringify({ ...params, message, signature: result.signature, address })
        });
        const data = await resp.json();
        if (data.isValid && data.userSaved) {
            alert("Challenge updated");
        }
    }
    return (
        <div id={challenge.id} className="mt-3">

            <p className="mt-1"> Order: <input
                className="input input-info w-3/5"
                type="text"
                value={params.order}
                onChange={e => {
                    updateParams({ ...params, order: e.target.value })
                }}
            /></p>
            <p className="mt-1">Name: <input
                className="input input-info w-3/5"
                type="text"
                value={params.name}
                onChange={e => {
                    updateParams({ ...params, name: e.target.value })
                }}
            /></p>
            <p className="mt-1">Markdown: <input
                className="input input-info w-3/5"
                type="text"
                value={params.markdown}
                onChange={e => {
                    updateParams({ ...params, markdown: e.target.value })
                }}
            /></p>
            <p className="mt-1">Descrition: <input
                className="input input-info w-3/5"
                type="text"
                value={params.description}
                onChange={e => {
                    updateParams({ ...params, description: e.target.value })
                }}
            /></p>

            <button onClick={saveParams} className="btn btn-primary mt-2">Save</button>
            <button className="btn btn-danger mt-2 ml-3">Remove</button>
        </div >
    )
}

export default ChallengeItem;