"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./Navigation.module.css";

const otherPagePath = "/fundamentals/navigation/demo/other";

type RouterAction = {
  label: string;
  description: string;
  run: () => void;
};

type AppRouter = ReturnType<typeof useRouter>;

function createLinks(pathname: string) {
  return [
    { href: `${pathname}?tab=link`, label: "Link ?tab=link", shouldReplace: false, shouldPrefetch: undefined },
    { href: `${pathname}?tab=replaced`, label: "Link ?tab=replaced (replace)", shouldReplace: true, shouldPrefetch: undefined },
    { href: otherPagePath, label: "Link to another page", shouldReplace: false, shouldPrefetch: undefined },
    { href: otherPagePath, label: "Same page, prefetch={false}", shouldReplace: false, shouldPrefetch: false },
  ];
}

function createRouterActions(router: AppRouter, pathname: string): RouterAction[] {
  return [
    { label: "router.push", description: "router.push(?tab=push)", run: () => router.push(`${pathname}?tab=push`) },
    { label: "router.replace", description: "router.replace(?tab=replace)", run: () => router.replace(`${pathname}?tab=replace`) },
    { label: "router.back", description: "router.back()", run: () => router.back() },
    { label: "router.refresh", description: "router.refresh()", run: () => router.refresh() },
    { label: "router.push (other page)", description: "router.push(other page)", run: () => router.push(otherPagePath) },
  ];
}

export function NavigationPlayground() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lastAction, setLastAction] = useState("none yet");

  const tab = searchParams.get("tab") ?? "(none)";
  const links = createLinks(pathname);
  const routerActions = createRouterActions(router, pathname);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>Client navigation</h3>
      <p className={styles.readout}>usePathname(): {pathname}</p>
      <p className={styles.readout}>useSearchParams().get(&quot;tab&quot;): {tab}</p>
      <p className={styles.readout}>Last action (client state): {lastAction}</p>

      <ul className={styles.actions}>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} replace={link.shouldReplace} prefetch={link.shouldPrefetch}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className={styles.actions}>
        {routerActions.map((action) => (
          <li key={action.label}>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setLastAction(action.description);
                action.run();
              }}
            >
              {action.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
