import Head from 'next/head';
import Link from 'next/link';
import styles from '/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Windmill Dashboard Nextjs Template!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages folder</code>
        </p>

        <div className={styles.grid}>
          <Link href="/login">
            <a className={styles.card}>
              <h3>Login Page &rarr;</h3>
              <p>Login auth page</p>
            </a>
          </Link>
          <Link href="/create-account">
            <a className={styles.card}>
              <h3>Create Account Page &rarr;</h3>
              <p>Create Account Auth Page</p>
            </a>
          </Link>

          <a href="/app" className={styles.card}>
            <h3>App Page &rarr;</h3>
            <p>Discover the windmill dashboard</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>{/* footer */}</footer>
    </div>
  );
}
