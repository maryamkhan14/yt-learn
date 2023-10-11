import Link from "next/link";
import NavMenu from "./NavMenu";

function Header() {
  return (
    <div className="z-50 flex w-full flex-col justify-between bg-slate-900/50 px-4 py-8 text-2xl font-bold  md:flex-row">
      <Link className="text-3xl uppercase" href="/">
        {" "}
        Some logo{" "}
      </Link>
      <div className="md:min-w-1/4">
        <NavMenu />
      </div>
    </div>
  );
}

export default Header;
