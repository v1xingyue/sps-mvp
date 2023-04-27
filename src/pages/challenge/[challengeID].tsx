import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getChallenge } from "../../firebase";

export default function Home() {
    const router = useRouter();
    const { challengeID } = router.query;
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        if (challengeID && (typeof challengeID === "string")) {
            (
                async () => {
                    const challenge = await getChallenge(challengeID);
                    console.log(challenge);
                    if (challenge) {
                        const url = challenge.markdown as string;
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