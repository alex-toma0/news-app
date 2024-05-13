import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Sign } from "crypto";
export default function Header() {
  return (
    <Navbar className="top-0">
      <NavbarBrand>
        <p>News App</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about">About</Link>
        </NavbarItem>
        <SignedOut>
          <NavbarItem>
            <Link href="/sign-up" passHref>
              <Button role="link">Sign up</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/sign-in" passHref>
              <Button role="link">Sign in</Button>
            </Link>
          </NavbarItem>
        </SignedOut>
        <SignedIn>
          <NavbarItem>
            <Link href="/user-profile" passHref>
              <Button role="link">Profile</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <SignOutButton>
              <Button role="link">Sign out</Button>
            </SignOutButton>
          </NavbarItem>
        </SignedIn>
      </NavbarContent>
    </Navbar>
  );
}
