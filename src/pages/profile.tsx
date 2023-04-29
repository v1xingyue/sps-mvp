import { getSubmit } from "../firebase";
import { useProfile } from "../hooks";
import { useState, useEffect } from "react";


const Profile = () => {
    const [profile] = useProfile();
    const [submits, setSubmits] = useState<any[]>([]);

    useEffect(() => {
        if (profile && profile.address) {
            (async () => {
                const submits = await getSubmit(profile.address)
                console.log("submits : ", submits);
                setSubmits(submits);
            })();
        }
    }, [profile]);
    return (
        <>
            {profile == null ? null : (
                <div className="card shadow-xl w-5/6 p-5 mt-3">
                    <div className="card-body">
                        <h2> User Profile </h2>
                        <ul>
                            <li>Address : {profile.address}</li>
                            <li>Github : {profile.github}</li>
                            <li>Register time : {new Date(profile.register_time.seconds * 1000).toLocaleString()}</li>
                        </ul>
                    </div>
                </div>
            )}


            {submits.length === 0 ? null : (
                <div className="card shadow-xl w-5/6 p-5 mt-3">
                    <div className="card-body">
                        <h2> Your submits </h2>
                        <div>
                            {
                                submits.map((submit) => {
                                    return (
                                        <div key={submit.id} className="mt-3">
                                            <p>
                                                {submit.challengeID}
                                            </p>
                                            <p>
                                                contract url : {submit.contractURL}
                                            </p>
                                            <p>
                                                deployedURL url : {submit.deployedURL}
                                            </p>
                                            <p>
                                                Submit time : {new Date(submit.submit_time.seconds * 1000).toLocaleString()}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default Profile;