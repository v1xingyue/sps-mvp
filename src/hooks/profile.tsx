import { useEffect, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { getProfile } from "../firebase/index";

export const useProfile = () => {
    const { connected, account } = useWallet();
    const [profile, updateProfile] = useState<any>(null);
    useEffect(() => {
        if (connected && account) {
            const address = account.address;
            console.log(address);
            (async () => {
                const profile = await getProfile(address);
                console.log("hook", address, profile);
                updateProfile(profile);
            })();
        }
    }, [account, connected])

    return [profile];
}