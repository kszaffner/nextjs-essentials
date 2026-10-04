import Link from "next/link";
import { PROXY_DEMO_BASE } from "../decideProxyAction";
import styles from "./Proxy.module.css";

const demoLinks = [
  { path: "old", title: "Redirect", effect: "The proxy answers 307 and the browser lands on /new." },
  { path: "alias", title: "Rewrite", effect: "The URL stays /alias; the content comes from /target." },
  { path: "personalized", title: "Personalize", effect: "A rewrite to variant A or B, chosen by a cookie the proxy sets on the first visit." },
  { path: "blocked", title: "Respond directly", effect: "The proxy returns 403 itself; no route runs." },
] as const;

export function ProxyDemo() {
  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>What the proxy does to each URL</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Open</th>
            <th scope="col">Behavior</th>
          </tr>
        </thead>
        <tbody>
          {demoLinks.map((link) => (
            <tr key={link.path}>
              <td>
                {/* Full navigations: the point is what the proxy does to the request. */}
                <a href={`${PROXY_DEMO_BASE}/${link.path}`}>
                  {link.title}: /{link.path}
                </a>
              </td>
              <td>{link.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.hint}>
        <Link href={`${PROXY_DEMO_BASE}/target`}>/target</Link> and{" "}
        <Link href={`${PROXY_DEMO_BASE}/new`}>/new</Link> are ordinary pages that
        report what the proxy told them.
      </p>
    </section>
  );
}
