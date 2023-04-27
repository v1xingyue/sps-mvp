import { useEffect, useState } from "react";
import { getChallenges } from "../firebase";


const Index = () => {
    const [challenges, updateChallenges] = useState<Array<any>>([]);
    useEffect(() => {
        (async () => {
            const challenges = await getChallenges();
            console.log(challenges);
            updateChallenges(challenges);
        })()
    }, [])
    return (
        <>
            <div className="w-4/5 bg-base-100 mx-auto p-2 ">

                {
                    challenges.map(item => {
                        return (
                            <div className="card w-4/5 bg-base-100 shadow-xl mx-auto p-2 mt-2" key={item.id}>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        <a className="link link-primary" href={`/challenge/${item.name}`}>
                                            Challenge {item.order} {item.name}
                                        </a>
                                    </h2>
                                    <a className="link link-info" href={item.markdown}> {item.markdown}</a>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </>
    );

}

export default Index;