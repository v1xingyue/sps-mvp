import { useWallet } from "@suiet/wallet-kit";
import { useState } from "react";

const AddNewChallenge = ({ reload }: { reload: Function }) => {
    const { address, signMessage } = useWallet();
    const [params, updateParams] = useState<{
        name: string,
        markdown: string,
        description: string,
        order: number
    }>({ name: "", markdown: "", description: "", order: 0 })

    const handleSubmit = async () => {
        const message = `you will add new challenge ${JSON.stringify(params)} `;
        const result = await signMessage({
            message: new TextEncoder().encode(message)
        });

        const res = await fetch("http://localhost:3000/api/challenge/create", {
            method: "POST",

            body: JSON.stringify({ ...params, message, address, signature: result.signature })
        });
        const data = await res.json();
        console.log(data);
        if (data.isValid && data.userSaved) {
            alert("Challenge added");
            reload();
        }
    }

    return (
        <div className="mt-3">
            <p className="mt-1"> Order: <input
                className="input input-info w-3/5"
                type="text"
                value={params.order}
                onChange={e => {
                    let v = parseInt(e.target.value);
                    if (isNaN(v)) {
                        v = 0;
                    }
                    updateParams({ ...params, order: v })
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

            <button onClick={handleSubmit} className="btn btn-primary mt-2">Submit this challenge</button>
        </div >
    );
};

export default AddNewChallenge;