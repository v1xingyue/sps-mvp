import Image from "next/image";
import { NavItem } from "./NavItem";
import { SuiConnect } from "./SuiConnect";
import { useProfile } from "../hooks";

export function NavBar() {
  const [profile] = useProfile();
  return (
    <nav className="navbar py-4 px-4 bg-base-100">
      <div className="flex-1">
        <a href="http://movedid.build" target="_blank" rel="noreferrer">
          <Image src="/logo.png" width={64} height={64} alt="logo" />
        </a>
        <ul className="menu menu-horizontal p-0 ml-5">
          <NavItem href="/" title="Home" />
          {
            profile ? <NavItem href="/profile" title="Profile" /> : <NavItem href="/register" title="Register" />
          }
          {
            (profile && profile.is_admin) ? <NavItem href="/admin" title="Manage" /> : <></>
          }
        </ul>
      </div>
      <SuiConnect />
    </nav>
  );
}
