import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getChallenge } from "../../firebase";
import Loading from "../../components/loading";
import { useWallet } from '@suiet/wallet-kit';

export default function Home() {
    const [displayModal, updateDisplayModal] = useState(false);
    const router = useRouter();
    const { challengeID } = router.query;
    const [markdownContent, setMarkdownContent] = useState("");
    const [loaded, updateLoaded] = useState(false);
    const { address, signMessage } = useWallet();

    const [submitParams, updateParams] = useState<{
        contractURL: string,
        deployedURL: string,
        description: string,
    }>({
        contractURL: "", deployedURL: "", description: ""
    });

    useEffect(() => {
        if (challengeID && (typeof challengeID === "string")) {
            (
                async () => {
                    updateLoaded(false);
                    const challenge = await getChallenge(challengeID);
                    console.log(challenge);
                    if (challenge) {
                        const url = challenge.markdown as string;
                        console.log(url);
                        const resp = await fetch(url);
                        const markdown = await resp.text();
                        setMarkdownContent(markdown);
                    }
                    updateLoaded(true);
                }
            )();

        }
    }, [challengeID])

    const submitChallenge = async () => {
        updateDisplayModal(true);
        console.log("submit challenge");
    };



    const doSubmitChallenge = async () => {

        const payload = {
            ...submitParams,
            challengeID,
            address
        }

        const message = JSON.stringify(payload);
        const result = await signMessage({
            message: new TextEncoder().encode(message),
        });

        const resp = await fetch("/api/challenge/submit", {
            method: "POST",
            body: JSON.stringify({ ...payload, message, signature: result.signature }),
        });

        const data = await resp.json();
        if (data.isValid && data.userSaved) {
            alert("Challenge submitted successfully");
            updateDisplayModal(false);
        }
    }

    return (
        <>

            <div className={displayModal ? "modal modal-open" : "modal"}>
                <div className="modal-box w-11/12 max-w-5xl">
                    <label onClick={() => { updateDisplayModal(false) }} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg mt-3">Submit your challenge Info</h3>
                    <div className="mt-3">
                        <input
                            type="text"
                            value={submitParams.deployedURL}
                            onChange={(e) => { updateParams({ ...submitParams, deployedURL: e.target.value }) }}
                            placeholder="Deployed URL"
                            className="input input-primary w-full mt-3" />
                        <input
                            type="text"
                            value={submitParams?.contractURL}
                            onChange={(e) => { updateParams({ ...submitParams, contractURL: e.target.value }) }}
                            placeholder="Contract URL"
                            className="input input-primary w-full mt-3" />
                        <textarea
                            value={submitParams.description}
                            onChange={(e) => { updateParams({ ...submitParams, description: e.target.value }) }}
                            className="textarea textarea-bordered h-24 mt-3 w-full"
                            placeholder="Description" />

                        <div className="modal-action">
                            <label htmlFor="my-modal-6" className="btn" onClick={doSubmitChallenge}>OK, Submit!! 📒 </label>
                        </div>
                    </div>
                </div>
            </div >

            {
                loaded ? (
                    <div className="card w-3/5 bg-base-100 mx-auto p-5" >
                        <div className="card-body">
                            <ReactMarkdown className="prose prose-lg">
                                {markdownContent}
                            </ReactMarkdown>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary btn-wide mt-3" onClick={submitChallenge}>
                                    Submit Challenge Data!! </button>
                            </div>
                        </div>
                    </div>
                ) : <Loading />
            }
        </>
    )

}