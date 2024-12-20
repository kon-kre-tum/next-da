import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import React from "react";
import { GiMatchTip } from "react-icons/gi";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import { getUserInfoForNav } from "@/actions/userActions";

export default async function TopNav() {
  const session = await auth();
  const userInfo = session?.user && await getUserInfoForNav();

  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-blue-400 to-blue-700"
      classNames={{
        item: [
          "text-white",
          "text-xl",
          "uppercase",
          "data-[active=true]:text-gray-900",
        ],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className=" text-gray-200" />
        <div className="font-bold text-3xl flex ">
          <span className="text-gray-900">Next</span>
          <span className="text-gray-700">Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink href="/members" label="Matches" />
        <NavLink href="/lists" label="Lists" />
        <NavLink href="/messages" label="Messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        {userInfo ? (
          <UserMenu userInfo={userInfo} />
        ) : (
          <>
            <Button
              as={Link}
              href="/auth/login"
              variant="bordered"
              className="text-white"
            >
              Login
            </Button>
            <Button
              as={Link}
              href="/auth/register"
              variant="bordered"
              className="text-white"
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
