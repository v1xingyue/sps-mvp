import { useState, useEffect } from "react";
import { getChallenges } from "../firebase";

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
                    challenges.length == 0 ? null : (
                        <>
                            {
                                challenges.map(
                                    (challenge) => {
                                        return (
                                            <div id={challenge.id} className="mt-3">
                                                <ul>Order: {challenge.order}</ul>
                                                <ul>{challenge.name}</ul>
                                                <ul>{challenge.markdown}</ul>
                                                <ul>{challenge.description}</ul>
                                                <button className="btn btn-primary mt-2">Save</button>
                                                <button className="btn btn-danger mt-2 ml-3">Remove</button>
                                            </div>
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