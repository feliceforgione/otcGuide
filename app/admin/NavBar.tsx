"use client";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, DropdownMenu } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "@/app/components/";

function AdminNavBar() {
  return (
    <nav className="flex justify-between border-b px-2 items-center h-10">
      <Link
        href="/admin"
        className="font-extrabold text-red-950 hover:text-red-800 transition-colors"
      >
        Admin Section
      </Link>
      <PageLinks />
      <Box>
        <AuthStatus />
      </Box>
    </nav>
  );
}

const PageLinks = () => {
  const pageLinks = [
    { label: "Disease Class", href: "/admin/disease-classes" },
    { label: "Disease Subclass", href: "/admin/disease-subclasses" },
  ];
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" color="gray">
          Pages <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {pageLinks.map((link) => (
          <DropdownMenu.Item key={link.href}>
            <Link
              className="text-gray-500 hover:text-gray-800 transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  console.log(status);
  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Login</Link>;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          size="2"
          src={session!.user!.image!}
          fallback="?"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Signout</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AdminNavBar;
