import { useState, useEffect } from "react";
import { getChallenges } from "../firebase";
import ChallengeItem from "../components/challgenItem";
import AddNewChallenge from "../components/addNewChallenge";

const displayChallengeList = 1;
const displayAddChallenge = 2;
const Admin = () => {
    const [challenges, updateChallenges] = useState<any[]>([])
    const [loadSignal, updateLoadSignal] = useState(0);
    const [displayMode, updateDisplayMode] = useState(displayChallengeList);

    useEffect(() => {
        (async () => {
            const challgens = await getChallenges();
            updateChallenges(challgens);
        })()
    }, [loadSignal]);

    return (
        <div className="card w-full shadow-xl ">
            <div className="card-body">
                <div className="tabs">
                    <a className={`tab tab-bordered ${displayMode === displayChallengeList ? "tab-active" : ""}`} onClick={() => {
                        updateDisplayMode(displayChallengeList);
                    }
                    }>Challenge List</a>
                    <a className={`tab tab-bordered ${displayMode === displayAddChallenge ? "tab-active" : ""}`} onClick={() => {
                        updateDisplayMode(displayAddChallenge);
                    }}>Add Challenge</a>
                </div>

                {displayMode === displayChallengeList ? (<>
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
                </>) : null}

                {displayMode === displayAddChallenge ? (<>
                    <AddNewChallenge reload={() => {
                        updateLoadSignal(loadSignal + 1);
                    }} />
                </>) : null}



            </div>
        </div >
    )
}

export default Admin;