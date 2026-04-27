import { useNavigate } from "react-router";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <div>
      <footer className="footer-container">
        <section className="container">
          <div id="list" class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5">
            <div class="col">
              <div>
                <img src="https://harlanrestaurant.com/images/logo.jpg" alt="" className="footer-image" />
                <p>Serious Food,No Compromise</p>
              </div>
            </div>
            <div class="col">
              <div className="footer-link">
                <h4>Quick Link</h4>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}>
                  Home
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/menu");
                  }}>
                  Menu
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/reservation");
                  }}>
                  Reservation
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about");
                  }}>
                  About
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/contact");
                  }}>
                  Contact
                </a>
              </div>
            </div>
            <div class="col">
              <div>
                <h4>Follow Us</h4>
                <a href="https://www.tiktok.com/@harlans_pattaya">
                  <img src="https://i.pinimg.com/1200x/a9/7b/fb/a97bfba3168f331db7ddbf5e3cebd240.jpg" alt="" className="tiktok-image" />
                </a>
                <a href="https://www.google.com/search?hl=my-MM&gl=mm&q=Harlan%E2%80%98s+Pattaya,+%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%84%E0%B8%B1%E0%B8%A1%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C+Muang+Pattaya,+Bang+Lamung+District,+Chon+Buri+20150,+%E1%80%91%E1%80%AD%E1%80%AF%E1%80%84%E1%80%BA%E1%80%B8&ludocid=12119188713915179671&lsig=AB86z5WuQIsRCMfyxVyZMwv9CB2a#lrd=0x3102950434b7ae39:0xa83001ecd2d66297,1">
                  <button className="btn btn-outline-secondary  w-100 mb-2">See Google Reviews</button>
                </a>
                <a href="https://www.google.com/search?hl=my-MM&gl=mm&q=Harlan%E2%80%98s+Pattaya,+%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%84%E0%B8%B1%E0%B8%A1%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C+Muang+Pattaya,+Bang+Lamung+District,+Chon+Buri+20150,+%E1%80%91%E1%80%AD%E1%80%AF%E1%80%84%E1%80%BA%E1%80%B8&ludocid=12119188713915179671&lsig=AB86z5WuQIsRCMfyxVyZMwv9CB2a#lrd=0x3102950434b7ae39:0xa83001ecd2d66297,3">
                  <button className="btn btn-outline-warning  w-100">Write a Google Review</button>
                </a>
              </div>
            </div>
            <div class="col">
              <div>
                <h4>Contact</h4>
                <p>
                  📍Harlan's Pattaya 47/72, Soi Welcome Town,Central Pattaya Road, Welcome Town, Pattaya Klang, Chan Buri, Bang Lamung,
                  <div> Thailand</div>
                  <div>📞0811613248</div>
                  <div>📧harlan.chef@gmail.com</div>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
      <div className="d-flex justify-content-between container version">
        <small>@2026 Harlan's Pattaya All rights reserved</small>
        <small>Version 1.0</small>
        <small>Developed By: Classic Software Team</small>
      </div>
    </div>
  );
}
