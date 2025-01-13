import Link from 'next/link';
import ModeToggle from './ModeToggle';

const Header = () => {
  return (
    <header className="flex gap-5">
      <div>
        <Link href="/">Main</Link>
      </div>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
