import { X, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// API URL (Category ဆွဲလိုက်ရင် items ပါ တစ်ခါတည်းပါလာရပါမယ်)
const menuApi = "http://localhost:8800/categories";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    data: menuCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const res = await fetch(menuApi);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const handleSeeMore = (category) => {
    setSelectedCategory(category);
    setIsOpen(true);
  };

  if (isLoading)
    return (
      <div className="text-center mt-5 py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading Harlan Menu...</p>
      </div>
    );

  if (error) return <div className="alert alert-danger text-center m-5">Something went wrong!</div>;

  return (
    <div className="container text-center menu-container pb-5">
      {/* --- MODAL OVERLAY (Items Display) --- */}
      {isOpen && selectedCategory && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050, backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(5px)" }}>
          <section
            className="model-section p-4 rounded-4 bg-dark text-white shadow-lg"
            style={{ width: "95%", maxWidth: "1000px", maxHeight: "85vh", overflowY: "auto", border: "1px solid #444" }}>
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <div>
                <h4 className="fw-bold mb-0 text-warning">{selectedCategory.name}</h4>
                <span className="badge bg-secondary mt-1">{selectedCategory.menuItems?.length || 0} Items Available</span>
              </div>
              <button className="btn btn-outline-light rounded-circle p-2" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {selectedCategory.menuItems && selectedCategory.menuItems.length > 0 ?
                selectedCategory.menuItems.map((item) => (
                  <div className="col" key={item.id}>
                    <div className="card h-100 border-0 shadow-sm bg-secondary bg-opacity-25 text-white overflow-hidden">
                      <img src={item.image} alt={item.name} className="card-img-top" style={{ height: "160px", objectFit: "cover" }} />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0">{item.name}</h6>
                          <span className="text-warning fw-bold small">{item.price} K</span>
                        </div>
                        <p className="card-text small text-light text-opacity-75" style={{ fontSize: "0.85rem" }}>
                          {item.description || "No description available for this item."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : <div className="col-12 text-center py-5">
                  <UtensilsCrossed size={48} className="text-muted mb-3" />
                  <p>No items found in this category.</p>
                </div>
              }
            </div>
          </section>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT --- */}
      <div className="py-5">
        <h1 className="display-4 fw-bold">Our Menu</h1>
        <p className="lead text-muted">Discover our delicious categories</p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {menuCategories?.map((cat) => (
          <div className="col" key={cat.id}>
            <div className="card h-100 shadow border-0 overflow-hidden rounded-4 group">
              <div className="position-relative overflow-hidden" style={{ height: "500px" }}>
                <img src={cat.image} alt={cat.name} className="card-img-top w-100 h-100 transition-transform" style={{ objectFit: "cover" }} />
                <div className="position-absolute top-0 end-0 p-3">
                  <span className="badge bg-dark bg-opacity-75 rounded-pill px-3 py-2">{cat.menuItems?.length || 0} Items</span>
                </div>
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-to-t from-dark text-white text-start"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                  <h2 className="fw-bold mb-1">{cat.name}</h2>
                  <p className="small mb-0 text-light text-opacity-75">Click to explore our {cat.name.toLowerCase()} selection</p>
                </div>
              </div>
              <div className="card-body d-flex justify-content-between align-items-center bg-white py-3">
                <span className="text-uppercase small fw-bold text-muted tracking-widest">🏷️ {cat.name}</span>
                <button className="btn btn-primary px-4 rounded-pill shadow-sm fw-bold" onClick={() => handleSeeMore(cat)}>
                  View Items
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
