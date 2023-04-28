import { useEffect, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { getProfile } from "../firebase/index";

const Profile = () => {
    const { connected, account } = useWallet();
    const [profile, updateProfile] = useState<any>(null);
    useEffect(() => {
        if (connected && account) {
            const address = account.address;
            console.log(address);
            (async () => {
                const profile = await getProfile(address);
                console.log(address, profile);
                updateProfile(profile);
            })();
        }
    }, [account, connected])
    return (
        <>
            {profile == null ? null : (
                <>
                    <h2>Profile page </h2>
                    <ul>
                        <li>Address : {profile.address}</li>
                        <li>Github : {profile.github}</li>
                        <li>Register time : {new Date(profile.register_time.seconds * 1000).toLocaleString()}</li>
                    </ul>
                </>
            )}

        </>

    )
}

export default Profile;