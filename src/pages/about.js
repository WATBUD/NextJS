 
import Image from 'next/image'
import Link from 'next/link';
const about = () => {
    return (
      <div>
                <h1>Welcome to the about</h1>
                <Link id="contact" href="/contact">contact</Link>

                <Link href="/">page</Link>

      </div>
    );
  };
  
  export default about;