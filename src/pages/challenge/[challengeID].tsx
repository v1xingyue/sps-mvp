import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { initFirebase, getChallenge, snapshotToChallenges } from "../../firebase";

export default function Home() {
    const router = useRouter();
    const { challengeID } = router.query;
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        initFirebase();
    }, [])

    useEffect(() => {
        if (challengeID && (typeof challengeID === "string")) {
            (
                async () => {
                    const snap = await getChallenge(challengeID);
                    const challenges = snapshotToChallenges(snap);
                    console.log(challenges);
                    if (challenges.length > 0) {
                        const url = challenges[0].markdown as string;
                        console.log(url);
                        fetch(url).then(response => response.text()).then(text => {
                            setMarkdownContent(text);
                        });
                    }
                }
            )();

        }
    }, [challengeID])

    return (
        <>
            <div className="card w-4/5 bg-base-100 shadow-xl mx-auto p-5">
                <div className="card-body">
                    <ReactMarkdown className="prose prose-lg">
                        {markdownContent}
                    </ReactMarkdown>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )

}