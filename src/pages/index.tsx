import { useEffect, useState } from "react";
import { getChallenges } from "../firebase";
import Loading from "../components/loading";

// https://heroicons.dev/

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
                            <div className="card w-4/5 bg-base-100 shadow-xl mx-auto p-2 mt-2" key={item.id}>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        🚀 Challenge #{item.order}  🐶
                                    </h2>
                                    <a className="link link-primary" href={`/challenge/${item.name}`}>
                                        {item.name}
                                    </a>
                                    <a className="link link-info" href={item.markdown}> {item.markdown}</a>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>

                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => {
                                        location.href = `/challenge/${item.name}`;
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                        Challenge Now</button>
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