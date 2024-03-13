import { Fragment } from "react";
import Link from "next/link";

export default function Page() {
    return (
      <Fragment>
        <h1>Welcome to the dashboard</h1>;
        <Link href="/" legacyBehavior>
          <a>Link to Page</a>
        </Link>
      </Fragment>
    );
    
}