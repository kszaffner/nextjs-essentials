import { LocalizedAnchor, LocalizedLink, type Locale } from "@/shared/i18n";
import { PROXY_DEMO_BASE } from "../decideProxyAction";
import { getProxyText } from "../text";
import styles from "./Proxy.module.css";

const demoPaths = ["old", "alias", "personalized", "blocked"] as const;

export function ProxyDemo({ locale }: { locale: Locale }) {
  const text = getProxyText(locale).demo;

  return (
    <section className={styles.panel}>
      <h3 className={styles.title}>{text.title}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{text.open}</th>
            <th scope="col">{text.behavior}</th>
          </tr>
        </thead>
        <tbody>
          {demoPaths.map((path) => (
            <tr key={path}>
              <td>
                {/* Full navigations: the point is what the proxy does to the request. */}
                <LocalizedAnchor href={`${PROXY_DEMO_BASE}/${path}`}>
                  {text.links[path].title}: /{path}
                </LocalizedAnchor>
              </td>
              <td>{text.links[path].effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.hint}>
        <LocalizedLink href={`${PROXY_DEMO_BASE}/target`}>/target</LocalizedLink> {text.footerBetween}{" "}
        <LocalizedLink href={`${PROXY_DEMO_BASE}/new`}>/new</LocalizedLink> {text.footerAfter}
      </p>
    </section>
  );
}
