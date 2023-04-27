import { useEffect, useState } from "react";
import { getChallenges, initFirebase, snapshotToChallenges } from "../firebase";

const Index = () => {
    const [challenges, updateChallenges] = useState<Array<any>>([]);
    useEffect(() => {
        (async () => {
            initFirebase();
            const snapshot = await getChallenges();
            const challenges = snapshotToChallenges(snapshot);
            updateChallenges(challenges);
        })()
    }, [])

    return (
        <>
            <div className="card w-4/5 bg-base-100 shadow-xl mx-auto p-5 mt-2">
                <div className="card-body">
                    <h2 className="card-title"> challenge list </h2>
                </div>
                <div>
                    {
                        challenges.map(item => {
                            console.log(item);
                            return (
                                <div key={item.id}>
                                    <a className="link link-primary" href={`/challenge/${item.name}`}> {item.name}</a>
                                    <a className="link link-info" href={item.markdown}> {item.markdown}</a>
                                    <p> Description:
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );

}

export default Index;