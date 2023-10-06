import NavMenu from "./NavMenu";

function Header() {
  return (
    <div className="px-4 py-8 bg-slate-100 flex flex-col md:flex-row w-full justify-between">
      <p> Some logo </p>
      <div className="md:w-1/6">
        <NavMenu />
      </div>
    </div>
  );
}

export default Header;
