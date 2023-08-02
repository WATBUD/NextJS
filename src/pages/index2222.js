 
// pages/index.js

import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </div>
  );
};

export default HomePage;
