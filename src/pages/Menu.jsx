const menuItems = [
  {
    image: "https://harlanrestaurant.com/images/categories/1776939880_4ceafcd6-2535-4515-9e16-cb17c585920d.JPG",
    title: "Daily ( Starter )",
  },
  {
    image: "https://harlanrestaurant.com/images/categories/1776939897_98baf2e2-c21b-4825-b726-b2a609b25307.JPG",
    title: "Daily ( Main Coiurse )",
  },
  {
    image: "https://harlanrestaurant.com/images/categories/1776756729_25bb7d3e-6fd9-4acc-9992-7204f3b2d824.jpeg",
    title: "Daily ( Dessert )",
  },
  {
    image: "https://harlanrestaurant.com/images/categories/1777036541_Copy%20of%20Red%20Luxury%20Wine%20Menu%20(1).jpg",
    title: "Wine",
  },
  {
    image: " https://harlanrestaurant.com/images/categories/1777036589_Copy%20of%20Red%20Luxury%20Wine%20Menu.jpg",
    title: "Wine",
  },
];

const menuItems2 = [
  {
    image: "https://harlanrestaurant.com/images/menu-items/1776772549_Untitled%20design%20(3).jpg",
    title: "Organic Pork Chop, Slow-Cooked, Roasted Tomatoes, Mozzarella, Basil Pesto, Riso",
    price: 980,
  },
  {
    image: "https://harlanrestaurant.com/images/menu-items/1776773368_Untitled%20design%20(5).jpg",
    title: "Charcoal Grilled Lamb Chops, Porcini Truffle Stuffing, Vegetables, Roast Garlic Jus",
    price: 1580,
  },
  {
    image: "https://harlanrestaurant.com/images/menu-items/1776797252_Untitled%20design%20(8).jpg",
    title: "French Fries, Ketchup, Truffle Mayonnaise",
    context: "something on sides",
    price: 190,
  },
  {
    image: "https://harlanrestaurant.com/images/menu-items/1776797542_Untitled%20design%20(9).jpg",
    title: "Creamed Spinach with Parmesan",
    context: "Something on Sides",
    price: 280,
  },
  {
    image: "https://harlanrestaurant.com/images/menu-items/1777037217_Untitled%20design%20(13).jpg",
    title: "The Wellington *",
    context: "Beef Willie, Wagyu Beef Fillet, Foie Gras, Porcini, Wrapped in Buttery Pastry ( Cooking Time - 30 Mins )",
    price: 1780,
  },
  {
    image: "https://harlanrestaurant.com/images/menu-items/1777037726_Untitled%20design%20(14).jpg",
    title: "Seafood Rice, Lots of Seafood, Spanish Rice in Rich Broth",
    price: 1280,
  },
];

import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container text-center menu-container">
      {/* 1. THE MODAL OVERLAY */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050, backgroundColor: "rgba(0,0,0,0.8)" }}>
          <section className="model-section p-3 rounded-3 bg-secondary" style={{ maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="d-flex justify-content-between mb-3 fs-5 text-white title">
              <div>Daily (Main Course)</div>
              {/* 2. HIDE MODAL ON CLICK X */}
              <button className="btn" onClick={() => setIsOpen(false)}>
                <X color="white" size={32} />
              </button>
            </div>

            <div id="list" className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2">
              {menuItems2.map((items, index) => (
                <div className="col" key={index}>
                  <div className="card text-center shadow bg-white h-100">
                    <img src={items.image} alt="" className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                    <div className="card-body">
                      <p className="fw-bold" style={{ fontSize: "0.9rem" }}>
                        {items.title}
                      </p>
                      <p className="small text-muted">{items.context}</p>
                    </div>
                    <div className="card-footer bg-white border-0">
                      <button className="btn btn-warning fw-bold">THB {items.price}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* MAIN PAGE CONTENT */}
      <h1 className="display-2 fw-bold mt-5">Our Menu</h1>
      <p>Experience an exquisite journey through Spanish, Mexican, and Cuban flavors.</p>

      <div className="row row-cols-1 row-cols-lg-2 g-4">
        {menuItems.map((item, i) => {
          return (
            <div className="col" key={i}>
              <div className="card h-100 shadow-sm">
                <img src={item.image} alt="" className="card-img-top" style={{ height: "auto", objectFit: "cover" }} />
                <div className="card-body">
                  <h4 className="fw-bold">{item.title}</h4>
                  {/* 3. SHOW MODAL ON CLICK SEE MORE */}
                  <button className="btn btn-link text-decoration-none" onClick={() => setIsOpen(true)}>
                    [See more...]
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center my-5">
        <h3>Experience the elegance of Harlan with a reservation for our exquisite dining.</h3>
        <button className="btn btn-outline-secondary px-4 py-2" onClick={() => navigate("/reservation")}>
          Book a Reservation
        </button>
      </div>
    </div>
  );
}
