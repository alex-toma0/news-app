import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import SearchBar from "./SearchBar";
export default function Header() {
  return (
    <Navbar className="top-0">
      <NavbarBrand>
        <p>News App</p>
      </NavbarBrand>
      <NavbarContent justify="start">
        <NavbarItem>
          <SearchBar />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <SignedIn>
          <NavbarItem>
            <Link href="/feeds">Feeds</Link>
          </NavbarItem>
        </SignedIn>
        <SignedIn>
          <NavbarItem>
            <Link href="/feeds/favorites">Favorites</Link>
          </NavbarItem>
        </SignedIn>
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
