"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./Navigation.module.css";
import { LocalizedLink, useLocalizedPath } from "@/shared/i18n";
import { useNavigationText } from "../text";

const otherPagePath = "/fundamentals/navigation/demo/other";

type RouterAction = {
  label: string;
  description: string;
  run: () => void;
};

type AppRouter = ReturnType<typeof useRouter>;

function createLinks(pathname: string, labels: ReturnType<typeof useNavigationText>["playground"]["links"]) {
  return [
    { href: `${pathname}?tab=link`, label: labels.tab, shouldReplace: false, shouldPrefetch: undefined },
    { href: `${pathname}?tab=replaced`, label: labels.replaced, shouldReplace: true, shouldPrefetch: undefined },
    { href: otherPagePath, label: labels.other, shouldReplace: false, shouldPrefetch: undefined },
    { href: otherPagePath, label: labels.noPrefetch, shouldReplace: false, shouldPrefetch: false },
  ];
}

function createRouterActions(
  router: AppRouter,
  pathname: string,
  otherPage: string,
  otherPageLabel: string,
): RouterAction[] {
  return [
    { label: "router.push", description: "router.push(?tab=push)", run: () => router.push(`${pathname}?tab=push`) },
    { label: "router.replace", description: "router.replace(?tab=replace)", run: () => router.replace(`${pathname}?tab=replace`) },
    { label: "router.back", description: "router.back()", run: () => router.back() },
    { label: "router.refresh", description: "router.refresh()", run: () => router.refresh() },
    { label: otherPageLabel, description: "router.push(other page)", run: () => router.push(otherPage) },
  ];
}

export function NavigationPlayground() {
  const router = useRouter();
  const localize = useLocalizedPath();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const text = useNavigationText().playground;
  const [lastAction, setLastAction] = useState(text.noAction);

  const tab = searchParams.get("tab") ?? text.noTab;
  const links = createLinks(pathname, text.links);
  const routerActions = createRouterActions(router, pathname, localize(otherPagePath), text.otherPage);

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <p className={styles.readout}>{text.pathname}: {pathname}</p>
      <p className={styles.readout}>{text.searchParam}: {tab}</p>
      <p className={styles.readout}>{text.lastAction}: {lastAction}</p>

      <ul className={styles.actions}>
        {links.map((link) => (
          <li key={link.label}>
            <LocalizedLink href={link.href} replace={link.shouldReplace} prefetch={link.shouldPrefetch}>
              {link.label}
            </LocalizedLink>
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
