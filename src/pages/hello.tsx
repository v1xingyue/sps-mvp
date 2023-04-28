import { useProfile } from "../hooks";

const Profile = () => {
    const [profile] = useProfile();
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