import { useEffect, useState } from "react";
import { getChallenges } from "../firebase";
import Loading from "../components/loading";

const Index = () => {
    const [challenges, updateChallenges] = useState<Array<any>>([]);
    const [loaded, updateLoaded] = useState(false);
    useEffect(() => {
        (async () => {
            updateLoaded(false);
            const challenges = await getChallenges();
            console.log(challenges);
            updateChallenges(challenges);
            updateLoaded(true);
        })()
    }, [])
    return (
        <>

            <div className="w-4/5 bg-base-100 mx-auto p-2 ">
                {loaded ? null : <Loading />}
                {
                    challenges.map(item => {
                        return (
                            <div className="card card-side w-4/5 bg-base-100 shadow-xl mx-auto p-2 mt-2" key={item.id}>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        <h2>Challenge #{item.order}</h2>
                                    </h2>
                                    <a className="link link-primary" href={`/challenge/${item.name}`}>
                                        {item.name}
                                    </a>
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