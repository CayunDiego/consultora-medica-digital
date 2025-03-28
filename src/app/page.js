import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/contact-form"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact form
          </a>
          <a
            href="/download-resource"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Download resource
          </a>
        </div>
      </main>
    </div>
  );
}
