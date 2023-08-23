import Image from "next/image"; // Images
import { eth } from "state/eth"; // State container
import Layout from "components/Layout"; // Layout wrapper
import { useRouter } from "next/router"; // Routing
import styles from "styles/pages/Home.module.scss"; // Page styles
import { useConnectWallet } from "@web3-onboard/react";
import { useMemo } from "react";

// Setup project details
const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";
const heading: string = process.env.NEXT_PUBLIC_HEADING ?? "Some heading";
const description: string =
  process.env.NEXT_PUBLIC_DESCRIPTION ?? "Some description";
const reimburseText =
  "docs.deus.finance/dei-incident-05.05.2023/long-term-reimbursement-plan/symm-deusmigration";
const migrationText = "app.deus.finance/migration";

export default function Home() {
  // Routing
  const { push } = useRouter();
  // Authentication status
  // const { address }: { address: string | null } = eth.useContainer();
  const [{ wallet }] = useConnectWallet();
  const address = useMemo(
    () => wallet?.accounts[0].address,
    [wallet?.accounts]
  );

  return (
    <Layout>
      <div className={styles.home}>
        {/* Project logo */}
        <div>
          <Image src="/logo.png" alt="Logo" width={250} height={250} priority />
        </div>

        {/* Project introduction article, if it exists */}
        {process.env.NEXT_PUBLIC_ARTICLE ? (
          <a
            href={process.env.NEXT_PUBLIC_ARTICLE}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more about the Scream v1 compensation plan{" "}
            <Image src="/icons/arrow.svg" alt="Arrow" height={12} width={12} />
          </a>
        ) : null}

        {/* Project heading */}
        <h1>{heading}</h1>

        {/* Project description */}
        <p>
          Scream v1 debt holders can claim 1 bDEI for every dollar of net assets
          they held in Scream v1, using Chainlink prices.
        </p>

        <p>
          <p style={{ marginBlock: "0" }}>bDEI is not Liquid immediately;</p>
          <p style={{ marginBlock: "0" }}>
            it has to be migrated to DEUS or SYMM
          </p>
          <p style={{ marginBlock: "0" }}>The bDEI to DEUS ratio is 185/1</p>
          <p style={{ marginBlock: "0" }}>
            The DEUS to SYMM ratio can be viewed live here:{" "}
            <a
              href={"https://" + migrationText}
              target="_blank"
              rel="noopener noreferrer"
            >
              {migrationText}{" "}
            </a>
          </p>
          <p style={{ marginBlock: "0" }}>
            DEUS will be liquid once the migration period ends.
          </p>
          <p style={{ marginBlock: "0" }}>
            SYMM has a 12-month vest once the migration period ends.
          </p>
          <p style={{ marginBlock: "0" }}>
            learn more:{" "}
            <a
              href={"https://" + reimburseText}
              target="_blank"
              rel="noopener noreferrer"
            >
              {reimburseText}{" "}
            </a>
          </p>
        </p>

        <p>
          By participating in this compensation plan I waive any and all claims
          that I may have against DEUS Finance & Scream team arising from
          deposits made to Scream&apos;s v1 markets, whose comptroller is set to
          0x260E596DAbE3AFc463e75B6CC05d8c46aCAcFB09.
        </p>

        <div></div>

        {/* Claim button */}
        {!address ? (
          // If not authenticated, disabled
          <button disabled>Connect Wallet to Claim Tokens</button>
        ) : (
          // Else, reroute to /claim
          <button onClick={() => push("/claim")}>Claim Tokens</button>
        )}
      </div>
    </Layout>
  );
}
