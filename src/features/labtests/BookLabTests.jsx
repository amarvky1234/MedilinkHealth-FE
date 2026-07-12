import React, { useState, useRef } from "react";
import { ShoppingCart, ChevronDown, Search, Phone, ChevronRight, Zap } from "lucide-react";

const TESTS = [
  {
    id: 1,
    name: "Thyroid Profile",
    price: 420,
    mrp: null,
    alias: "Known as Thyroid Profile Total Blood",
  },
  {
    id: 2,
    name: "Complete Blood Count",
    price: 330,
    mrp: null,
    alias: "Known as Complete Blood Count Automated Blood",
  },
  {
    id: 3,
    name: "Lipid Profile",
    price: 620,
    mrp: null,
    alias: "Known as Lipid Profile Blood",
  },
  {
    id: 4,
    name: "Liver Function Test",
    price: 790,
    mrp: null,
    alias: "Known as Liver Function Tests Blood",
  },
  {
    id: 5,
    name: "Dengue NS 1",
    price: 630,
    mrp: null,
    alias: "Known as Dengue Ns1 Antigen Pcr Blood",
  },
  {
    id: 6,
    name: "Malarial Antigen",
    price: 680,
    mrp: 780,
    alias: "Known as Malarial Antigen Pcr Blood",
  },
];

export default function BookLabTests() {
  const [cartCount, setCartCount] = useState(0);
  const [addedIds, setAddedIds] = useState(new Set());
  const scrollerRef = useRef(null);

  const handleAddToCart = (id) => {
    setAddedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setCartCount((c) => c + 1);
  };

  const scrollNext = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <div className="container-fluid px-4 px-md-5 py-4">
        {/* Header row */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <h1 className="fw-bold mb-0" style={{ fontSize: "2.25rem", color: "#1a1d29", letterSpacing: "-0.5px" }}>
            Book Lab Tests Online
          </h1>
          <button
            className="btn d-flex align-items-center gap-2 px-3 py-2"
            style={{ border: "1px solid #d8dbe2", borderRadius: "999px", background: "#fff", color: "#1a1d29", fontWeight: 500 }}
          >
            <ShoppingCart size={18} />
            <span>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</span>
          </button>
        </div>

        {/* Search row */}
        <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
          <div
            className="d-flex align-items-center px-3 py-2 flex-grow-1"
            style={{
              background: "#eef0f3",
              borderRadius: "999px",
              minWidth: "280px",
              maxWidth: "700px",
              gap: "0.75rem",
            }}
          >
            <span className="d-flex align-items-center" style={{ color: "#2b8fe0" }}>
              📍
            </span>
            <span className="fw-semibold" style={{ color: "#1a1d29", whiteSpace: "nowrap" }}>
              Bangalore
            </span>
            <ChevronDown size={16} color="#6b7280" />
            <div style={{ width: "1px", height: "22px", background: "#c9ccd3" }} />
            <input
              type="text"
              placeholder="Search for tests, packages & profiles"
              className="border-0 bg-transparent flex-grow-1"
              style={{ outline: "none", color: "#374151", fontSize: "0.95rem" }}
            />
            <Search size={18} color="#374151" />
          </div>

          <button
            className="btn d-flex align-items-center gap-2 px-3 py-2 text-white fw-semibold"
            style={{ background: "#1e9de3", borderRadius: "999px", border: "none", whiteSpace: "nowrap" }}
          >
            Book Via Call
            <span
              className="d-flex align-items-center justify-content-center"
              style={{ background: "#fff", borderRadius: "50%", width: "26px", height: "26px" }}
            >
              <Phone size={14} color="#1e9de3" fill="#1e9de3" />
            </span>
          </button>

          <button
            className="btn d-flex align-items-center gap-2 px-3 py-2 text-white fw-semibold"
            style={{ background: "#25b95c", borderRadius: "999px", border: "none", whiteSpace: "nowrap" }}
          >
            Book Via Whatsapp
            <span
              className="d-flex align-items-center justify-content-center"
              style={{ background: "#fff", borderRadius: "50%", width: "26px", height: "26px", fontSize: "14px" }}
            >
              💬
            </span>
          </button>
        </div>

        {/* Section title */}
        <h2 className="fw-bold mb-2" style={{ fontSize: "1.5rem", color: "#1a1d29" }}>
          Top Booked Diagnostic Tests
        </h2>
        <div className="mb-3">
          <span
            className="d-inline-flex align-items-center gap-2 px-3 py-1"
            style={{ background: "#e5f7ea", color: "#1c8a44", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 500 }}
          >
            <Zap size={14} fill="#1c8a44" color="#1c8a44" />
            Get reports within 24hrs
          </span>
        </div>

        {/* Cards row */}
        <div className="position-relative">
          <div
            ref={scrollerRef}
            className="d-flex gap-3 pb-2"
            style={{ overflowX: "auto", scrollBehavior: "smooth" }}
          >
            {TESTS.map((test) => {
              const added = addedIds.has(test.id);
              return (
                <div
                  key={test.id}
                  className="d-flex flex-column justify-content-between flex-shrink-0"
                  style={{
                    width: "270px",
                    minHeight: "190px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "1.1rem",
                    background: "#fff",
                  }}
                >
                  <div>
                    <div className="d-flex align-items-baseline gap-2 mb-1">
                      <span className="fw-bold" style={{ fontSize: "1.05rem", color: "#1a1d29" }}>
                        {test.name}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="fw-semibold" style={{ color: "#1c9d4f", fontSize: "1rem" }}>
                        ₹{test.price}
                      </span>
                      {test.mrp && (
                        <span
                          className="ms-2 text-muted"
                          style={{ textDecoration: "line-through", fontSize: "0.9rem" }}
                        >
                          ₹{test.mrp}
                        </span>
                      )}
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>
                      {test.alias}
                    </p>
                  </div>

                  <div className="mt-3 pt-2" style={{ borderTop: "1px solid #eef0f3" }}>
                    <button
                      onClick={() => handleAddToCart(test.id)}
                      className="btn w-100 fw-semibold p-0"
                      style={{
                        color: added ? "#1c9d4f" : "#1e9de3",
                        fontSize: "0.9rem",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      {added ? "ADDED ✓" : "ADD TO CART"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={scrollNext}
            className="d-none d-md-flex align-items-center justify-content-center position-absolute top-50"
            style={{
              right: "-10px",
              transform: "translateY(-50%)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid #e5e7eb",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
            aria-label="Scroll for more tests"
          >
            <ChevronRight size={18} color="#374151" />
          </button>
        </div>
      </div>
    </div>
  );
}
