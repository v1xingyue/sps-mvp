import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


type StringMap<T> = { [key: string]: T };
const markdownMap: StringMap<string> = {
    "simple-nft-example": "https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-typescript-challenges/challenge-0-simple-nft/README.md"
}

export default function Home() {
    const router = useRouter();
    console.log(router.query);
    const { challengeID } = router.query;
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        if (challengeID) {
            const url = markdownMap[challengeID as string];
            fetch(url).then(response => response.text()).then(text => {
                console.log(text);
                setMarkdownContent(text);
            });
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
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </div>


            </div>
        </>
    )

}