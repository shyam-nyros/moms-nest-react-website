import { useEffect, useMemo, useRef, useState } from "react";
import { chickenPickleImage, fullMenu, reviews } from "./data/products";
import { useCart } from "./hooks/useCart.js";
import { filterCatalog } from "./utils/filterCatalog.js";
import Announcement from "./components/Announcement.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import FeaturedPickles from "./components/FeaturedPickles.jsx";
import PicklesSection from "./components/PicklesSection.jsx";
import StorySection from "./components/StorySection.jsx";
import BrandStory from "./components/BrandStory.jsx";
import ReviewsSection from "./components/ReviewsSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import BackToTop from "./components/BackToTop.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

const CONTACT_EMAIL = "hello@momsnest.in";
const SECTION_ORDER = ["home", "story", "ingredients", "reviews", "contact"];

const SCREEN_FOR_ID = {
  home: "home",
  ingredients: "home",
  reviews: "home",
  contact: "home",
  pickles: "pickles",
  story: "story",
};

const screenFromHash = () => {
  const hash = window.location.hash;
  if (hash === "#pickles") return "pickles";
  if (hash === "#story") return "story";
  return "home";
};

export default function App() {
  const [page, setPage] = useState(screenFromHash);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [rev, setRev] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const {
    cartItems,
    cartOpen,
    setCartOpen,
    cartCount,
    cartTotal,
    addToCart,
    updateQty,
    removeFromCart,
    checkoutOnWhatsApp,
    toast,
    showToast,
  } = useCart();

  const searchInputRef = useRef(null);
  const navActionsRef = useRef(null);

  const go = (id) => {
    setMenu(false);

    const targetScreen = SCREEN_FOR_ID[id] || "home";
    const targetHash = targetScreen === "home" ? "" : `#${targetScreen}`;
    const switchingScreen = targetScreen !== page;

    if (switchingScreen) {
      setPage(targetScreen);
      if (window.location.hash !== targetHash) {
        window.history.pushState(
          null,
          "",
          window.location.pathname + window.location.search + targetHash
        );
      }
    }

    if (targetScreen === "pickles") {
      window.scrollTo({ top: 0, behavior: switchingScreen ? "auto" : "smooth" });
      return;
    }

    if (switchingScreen) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = useMemo(
    () => filterCatalog(fullMenu, searchQuery),
    [searchQuery]
  );

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onHashChange = () => setPage(screenFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (navActionsRef.current && !navActionsRef.current.contains(event.target)) {
        setSearchOpen(false);
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setCartOpen(false);
      setSearchOpen(false);
      setAccountOpen(false);
      setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 700);

      const scrollPos = window.scrollY + 140;
      let current = SECTION_ORDER[0];
      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPos) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextReview = () => setRev((current) => (current + 1) % reviews.length);
  const previousReview = () =>
    setRev((current) => (current - 1 + reviews.length) % reviews.length);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const messageText = form.message.value.trim();

    const subject = encodeURIComponent(`Enquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(`${messageText}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    showToast("Opening your email app…");
  };

  return (
    <div className="site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Announcement />

      <Navbar
        menu={menu}
        setMenu={setMenu}
        go={go}
        activeSection={page !== "home" ? page : activeSection}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInputRef={searchInputRef}
        searchResultCount={filteredProducts.length}
        accountOpen={accountOpen}
        setAccountOpen={setAccountOpen}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        navActionsRef={navActionsRef}
        contactEmail={CONTACT_EMAIL}
      />

      {page === "home" && (
        <main id="main-content">
          <Hero go={go} image={chickenPickleImage} />

          <FeaturedPickles addToCart={addToCart} onViewFullMenu={() => go("pickles")} />

          <StorySection go={go} />

          <ReviewsSection
            reviews={reviews}
            activeIndex={rev}
            onPrevious={previousReview}
            onNext={nextReview}
          />

          <ContactSection contactEmail={CONTACT_EMAIL} onSubmit={handleContactSubmit} />
        </main>
      )}

      {page === "pickles" && (
        <main id="main-content">
          <PicklesSection
            items={filteredProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            addToCart={addToCart}
          />
        </main>
      )}

      {page === "story" && (
        <main id="main-content">
          <BrandStory />
        </main>
      )}

      <Footer go={go} contactEmail={CONTACT_EMAIL} />

      <div className="copyright">
        © 2026 Mom's Nest. All rights reserved.{" "}
        <span>Made with ♥ for authentic flavours.</span>
      </div>

      <Toast message={toast} />
      <BackToTop show={showBackToTop} />

      {cartOpen && (
        <CartDrawer
          items={cartItems}
          total={cartTotal}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onCheckout={checkoutOnWhatsApp}
          onShopPickles={() => {
            setCartOpen(false);
            go("pickles");
          }}
        />
      )}
    </div>
  );
}
