import { useState, useEffect } from "react";
import { getChallenges } from "../firebase";
import ChallengeItem from "../components/challgenItem";

const Admin = () => {
    const [challenges, updateChallenges] = useState<any[]>([])
    const [loadSignal, updateLoadSignal] = useState(0);

    useEffect(() => {
        (async () => {
            const challgens = await getChallenges();
            updateChallenges(challgens);
        })()
    }, [loadSignal]);

    return (
        <div className="card w-full shadow-xl ">
            <div className="card-body">
                <h2>Manage challenge <button className="btn btn-info" onClick={() => { }}>+</button></h2>
                {
                    challenges.length === 0 ? null : (
                        <>
                            {
                                challenges.map(
                                    (challenge) => {
                                        return (
                                            <ChallengeItem key={challenge.id} challenge={challenge} reload={() => {
                                                console.log("reload data ");
                                                updateLoadSignal(loadSignal + 1);
                                            }} />
                                        )
                                    }
                                )
                            }
                        </>
                    )
                }



            </div>
        </div >
    )
}

export default Admin;