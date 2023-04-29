import { useState, useEffect } from "react";
import { getChallenges } from "../firebase";
import ChallengeItem from "../components/challgenItem";

const Admin = () => {
    const [challenges, updateChallenges] = useState<any[]>([])
    useEffect(() => {
        (async () => {
            const challgens = await getChallenges();
            updateChallenges(challgens);
        })()
    }, []);

    return (
        <div className="card w-full shadow-xl ">
            <div className="card-body">
                <h2>Admin profile</h2>
                {
                    challenges.length === 0 ? null : (
                        <>
                            {
                                challenges.map(
                                    (challenge) => {
                                        return (
                                            <ChallengeItem key={challenge.id} challenge={challenge} />
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