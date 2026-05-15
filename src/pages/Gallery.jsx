import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const galleryApi = "http://localhost:8800/gallery";
const API_BASE_URL = "http://localhost:8800";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Event", "Party", "Birthday"];

  const {
    data: gallerys,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gallerys"],
    queryFn: async () => {
      const res = await fetch(galleryApi);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const filteredItems = (gallerys || []).filter((v) => (filter === "All" ? true : v.category === filter));

  const getMediaUrl = (url) => {
    if (!url) return "https://via.placeholder.com/250";
    if (url.startsWith("http")) return url;
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  if (isLoading) return <div className="text-center my-5 text-warning">Loading Gallery...</div>;
  if (isError) return <div className="text-center my-5 text-danger">Error: {error.message}</div>;

  return (
    <div className="container py-5 my-5">
      <h1 className="display-4 fw-bold text-center mb-4">Gallery</h1>

      <div className="d-flex justify-content-center flex-wrap gap-2 my-5">
        {categories.map((list) => (
          <button
            key={list}
            onClick={() => setFilter(list)}
            className={`btn px-4 rounded-pill ${filter === list ? "btn-warning shadow" : "btn-outline-warning"}`}>
            {list}
          </button>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {filteredItems.length > 0 ?
          filteredItems.map((v) => (
            <div className="col" key={v.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
                {/* Type စစ်ဆေးခြင်းကို Backend အတိုင်း Uppercase ပြောင်းထားသည် */}
                {v.type === "VIDEO" ?
                  v.url.includes("youtube.com") || v.url.includes("youtu.be") ?
                    <div className="ratio ratio-16x9">
                      <iframe src={v.url.replace("watch?v=", "embed/")} title={v.title} allowFullScreen></iframe>
                    </div>
                  : <video src={getMediaUrl(v.url)} controls className="w-100" style={{ height: "250px", objectFit: "cover" }} />
                : <img
                    src={getMediaUrl(v.url)}
                    alt={v.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/250?text=Image+Not+Found";
                    }}
                  />
                }

                <div className="card-body text-center bg-white">
                  <span className="badge bg-light text-dark mb-2 border">{v.category}</span>
                  <h6 className="card-title fw-bold mb-0">{v.title}</h6>
                </div>
              </div>
            </div>
          ))
        : <div className="col-12 text-center py-5 text-muted">No items found in this category.</div>}
      </div>
    </div>
  );
};

export default Gallery;
