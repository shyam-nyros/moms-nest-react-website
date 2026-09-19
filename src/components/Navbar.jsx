import { Search, UserRound, ShoppingBag, Menu, X } from "lucide-react";
import logoMark from "../assets/products/web-logo-icon.png";
import SearchPanel from "./SearchPanel.jsx";
import AccountPanel from "./AccountPanel.jsx";

const NAV_LINKS = [
  ["Home", "home"],
  ["Pickles", "pickles"],
  ["Our Story", "story"],
  ["Ingredients", "ingredients"],
  ["Reviews", "reviews"],
  ["Contact", "contact"],
];

export default function Navbar({
  menu,
  setMenu,
  go,
  activeSection,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  searchInputRef,
  searchResultCount,
  accountOpen,
  setAccountOpen,
  cartCount,
  onCartOpen,
  navActionsRef,
  contactEmail,
}) {
  return (
    <header className="navbar">
      <button
        className="mobile-menu"
        onClick={() => setMenu((current) => !current)}
        aria-label="Toggle navigation menu"
        aria-expanded={menu}
      >
        {menu ? <X /> : <Menu />}
      </button>

      <button className="brand" onClick={() => go("home")}>
        <img className="brand-mark" src={logoMark} alt="" />
        <span>
          <strong>Mom's Nest</strong>
          <small>ANDHRA PICKLES</small>
        </span>
      </button>

      <nav className={menu ? "nav-links open" : "nav-links"} aria-label="Primary">
        {NAV_LINKS.map(([label, id]) => (
          <button
            key={id}
            onClick={() => go(id)}
            className={activeSection === id ? "active" : ""}
            aria-current={activeSection === id ? "page" : undefined}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="nav-actions" ref={navActionsRef}>
        <div className="search-wrap">
          <button
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => {
              setAccountOpen(false);
              setSearchOpen((current) => !current);
            }}
          >
            {searchOpen ? <X /> : <Search />}
          </button>

          {searchOpen && (
            <SearchPanel
              inputRef={searchInputRef}
              query={searchQuery}
              onQueryChange={setSearchQuery}
              resultCount={searchResultCount}
              onSubmit={() => {
                setSearchOpen(false);
                go("pickles");
              }}
            />
          )}
        </div>

        <div className="account-wrap">
          <button
            aria-label="Account"
            aria-expanded={accountOpen}
            onClick={() => {
              setSearchOpen(false);
              setAccountOpen((current) => !current);
            }}
          >
            <UserRound />
          </button>

          {accountOpen && <AccountPanel contactEmail={contactEmail} />}
        </div>

        <button
          className="cart"
          onClick={onCartOpen}
          aria-label={`Shopping cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
        >
          <ShoppingBag />
          {cartCount > 0 && <span>{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
