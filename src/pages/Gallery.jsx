import React, { useState } from "react";

const Gallery = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Event", "Party", "Birthday"];

  const videos = [
    {
      id: 1,
      category: "Event",
      title: "Harlan's Concept",
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      category: "Party",
      title: "Harlan's Restaurant",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      category: "Birthday",
      title: "Harlan's Restaurant",
      url: "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  // Logic: Filter ဖြစ်ထားတဲ့ Array ကိုပဲ သုံးမယ်
  const filteredVideos = filter === "All" ? videos : videos.filter((v) => v.category === filter);

  return (
    <div className="container">
      <h1 className="gallery-container display-4 fw-bold text-center mb-4">Gallery</h1>

      {/* Categories Buttons */}
      <div className="d-flex justify-content-center gap-3 my-5">
        {categories.map((list) => {
          return (
            <button
              key={list}
              onClick={() => setFilter(list)} // Button နှိပ်ရင် Category ပြောင်းမယ်
              className={`btn px-4 rounded-pill ${filter === list ? "btn-warning" : "btn-outline-warning"}`}>
              {list}
            </button>
          );
        })}
      </div>

      {/* Images Grid */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {filteredVideos.map((v) => {
          // filteredVideos ကို ပတ်ပြရပါမယ်
          return (
            <div className="col" key={v.id}>
              <div className="card h-100 border-0 shadow-sm">
                <img src={v.url} alt={v.title} className="card-img-top rounded shadow-sm" style={{ height: "250px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <p className="badge bg-secondary">{v.category}</p>
                  <h6 className="card-title">{v.title}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
