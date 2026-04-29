import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const menuApi = "http://localhost:8800/menu"; // categories ယူတဲ့ API

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(""); // နှိပ်လိုက်တဲ့ type ကို သိမ်းရန်
  const navigate = useNavigate();

  // ၁။ Main Menu Categories ကို ခေါ်ယူခြင်း
  const {
    data: menuCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const res = await fetch(menuApi);
      return res.json();
    },
  });

  // ၂။ See More နှိပ်လိုက်တဲ့ Type အလိုက် Item များကို Filter လုပ်ယူခြင်း
  // (Backend က category အောက်မှာ items တွေ include လုပ်ပြီးသားမို့လို့
  //  Client-side မှာပဲ အလွယ်တကူ filter စစ်ထုတ်လိုက်ပါမယ်)
  const currentCategory = menuCategories?.find((cat) => cat.menuType === selectedType);
  const displayItems = currentCategory?.items || [];

  const handleSeeMore = (type) => {
    setSelectedType(type); // နှိပ်လိုက်တဲ့ menu type (e.g. Daily) ကို သိမ်းမယ်
    setIsOpen(true); // Modal ဖွင့်မယ်
  };

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  if (error) return <div className="alert alert-danger text-center">Something went wrong!</div>;

  return (
    <div className="container text-center menu-container">
      {/* --- MODAL OVERLAY --- */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050, backgroundColor: "rgba(0,0,0,0.85)" }}>
          <section className="model-section p-4 rounded-3 bg-dark text-white" style={{ width: "90%", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="d-flex justify-content-between mb-4 fs-5 title border-bottom pb-2">
              <div className="fw-bold">{selectedType} Menu Items</div>
              <button className="btn p-0" onClick={() => setIsOpen(false)}>
                <X color="white" size={32} />
              </button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {displayItems.length > 0 ?
                displayItems.map((item, index) => (
                  <div className="col" key={index}>
                    <div className="card text-center shadow-sm bg-white text-dark h-100">
                      <img src={item.image} alt={item.name} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} />
                      <div className="card-body">
                        <h6 className="fw-bold mb-1">{item.name}</h6>
                        <p className="small text-muted mb-0">{item.description}</p>
                      </div>
                      <div className="card-footer bg-white border-0 pb-3">
                        <span className="badge bg-warning text-dark fs-6">{item.price} MMK</span>
                      </div>
                    </div>
                  </div>
                ))
              : <div className="col-12 text-center py-5">No items found for this category.</div>}
            </div>
          </section>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT --- */}
      <h1 className="display-4 fw-bold mt-5">Our Menu</h1>
      <p className="lead mb-5 text-muted">Experience an exquisite journey through our authentic flavors.</p>

      <div className="row row-cols-1 row-cols-lg-2 g-4">
        {menuCategories?.map((cat, i) => (
          <div className="col" key={i}>
            <div className="card h-100 shadow border-0 overflow-hidden">
              <div className="position-relative">
                <img src={cat.image} alt={cat.name} className="card-img-top" style={{ objectFit: "cover" }} />
                <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-dark bg-opacity-50 text-white">
                  <h3 className="fw-bold mb-0">{cat.name}</h3>
                </div>
              </div>
              <div className="card-body d-flex justify-content-between align-items-center bg-light">
                <span className="text-uppercase small fw-bold text-secondary">{cat.menuType}</span>
                <button className="btn btn-dark btn-sm px-4 rounded-pill" onClick={() => handleSeeMore(cat.menuType)}>
                  See more...
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-5 py-5 border-top">
        <h3 className="mb-4">Experience the elegance of Harlan with a reservation.</h3>
        <button className="btn btn-outline-dark btn-lg px-5" onClick={() => navigate("/reservation")}>
          Book a Reservation
        </button>
      </div>
    </div>
  );
}
