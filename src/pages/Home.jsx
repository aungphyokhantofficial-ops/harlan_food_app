import { useNavigate } from "react-router";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="hero-section">
        {/* Background Video */}
        <video autoPlay muted loop playsInline className="hero-video">
          {/* သင့်ဆီမှာရှိတဲ့ video file လမ်းကြောင်းကို src မှာ ထည့်ပါ */}
          <source src="src/assets/food.mp4" />
          Your browser does not support the video tag.
        </video>

        {/* စာသားတွေ ပိုပေါ်အောင် အပေါ်ကနေ အမည်းရောင် Overlay အုပ်ထားခြင်း */}
        <div className="video-overlay"></div>

        {/* Content အပိုင်း */}
        <div className="hero-content container text-center text-white">
          <h1 className="fw-bold mb-3">Harlan's Pattaya</h1>
          <p className=" display-2 fw-bold text-warning fst-italic">Where Dining Is An Experience</p>
          <h5>Fire. Precision. Obsession.</h5>
          <h5> Welcome to Harlan’s.</h5>
          <div className="mt-5">
            <button className="btn btn-outline-light btn-lg px-4 me-3 rounded-3" onClick={() => navigate("/reservation")}>
              Reserve a Table
            </button>
            <button
              className="btn btn-outline-light btn-lg px-4 rounded-3"
              onClick={() => {
                navigate("/menu");
              }}>
              View Menu
            </button>
          </div>
        </div>
      </section>

      <section className="menu-section container text-center">
        <h3 className="pb-5">Signature Experinece</h3>
        <div id="list" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
          <div class="col">
            <div class="card text-center shadow bg-white">
              <img src="https://i.pinimg.com/1200x/0b/bb/e8/0bbbe8435a1373f6564377a6059cb710.jpg" alt="" className="card-image" />
              <div className="card-body">
                <h5>Culinary Mastery in Every Bite</h5>
                <p>A promise of expertly crafted dishes that elevate dining into unforgettable momnets</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card text-center shadow bg-white">
              <img src="https://i.pinimg.com/736x/06/6a/e6/066ae65cc8bdb3c3fbe7debd4311c9a4.jpg" alt="" className="card-image" />
              <div className="card-body">
                <h5>Culinary Mastery in Every Bite</h5>
                <p>A promise of expertly crafted dishes that elevate dining into unforgettable momnets</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card text-center shadow bg-white">
              <img src="https://i.pinimg.com/1200x/96/5b/54/965b54b39aeab89473457b918a74b20a.jpg" alt="" className="card-image" />
              <div className="card-body">
                <h5>Culinary Mastery in Every Bite</h5>
                <p>A promise of expertly crafted dishes that elevate dining into unforgettable momnets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section container text-center">
        <h3>Our Sevices</h3>
        <p className="mb-5">Experience a culinary journey through Spanish. Maxican and Cuban flavors</p>
        <div id="list" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
          <div class="col">
            <div class="card text-center shadow bg-white">
              <img src="https://i.pinimg.com/736x/4c/8e/7a/4c8e7a6bfa38c9c856d2c0ac09e87a38.jpg" alt="" className="card-image" />
              <div className="card-body">
                <h5>Culinary Mastery in Every Bite</h5>
                <p>A promise of expertly crafted dishes that elevate dining into unforgettable momnets</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card text-center shadow bg-white">
              <img src="https://i.pinimg.com/736x/2d/ce/aa/2dceaad367671530ec53b2e3527aef61.jpg" alt="" className="card-image" />
              <div className="card-body">
                <h5>Culinary Mastery in Every Bite</h5>
                <p>A promise of expertly crafted dishes that elevate dining into unforgettable momnets</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card text-center shadow bg-white">
              <img src="https://i.pinimg.com/1200x/e0/b6/c2/e0b6c23f37b4fad1ad3b0a3f8f4b6dd0.jpg" alt="" className="card-image" />
              <div className="card-body">
                <h5>Culinary Mastery in Every Bite</h5>
                <p>A promise of expertly crafted dishes that elevate dining into unforgettable momnets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-5">
        <div className="text-center sunday-section">
          <h1>Sunday Special</h1>
          <p>Exclusive Wagyu & Wine pairing experience available only today</p>
          <button className="btn btn-outline-warning" onClick={() => naviagte("/menu")}>
            Explore Sunday Menu
          </button>
        </div>
      </section>

      <section className="menu-section m-auto mb-5 hour ">
        <h3 className="text-center mb-5">Opening Hours</h3>
        <div className="time-container">
          <div className="d-flex justify-content-between time">
            <div>Sunday</div>
            <div>01.00:PM - 06:00PM</div>
          </div>
          <div className="d-flex justify-content-between time">
            <div>Monday</div>
            <div>Closed</div>
          </div>
          <div className="d-flex justify-content-between time">
            <div>Tuesday</div>
            <div>01.00:PM - 06:00PM</div>
          </div>
          <div className="d-flex justify-content-between time">
            <div>Webnesday</div>
            <div>01.00:PM - 06:00PM</div>
          </div>
          <div className="d-flex justify-content-between time">
            <div>Thursday</div>
            <div>01.00:PM - 06:00PM</div>
          </div>
          <div className="d-flex justify-content-between time">
            <div>Friday</div>
            <div>01.00:PM - 06:00PM</div>
          </div>
          <div className="d-flex justify-content-between time">
            <div>Saturaday</div>
            <div>01.00:PM - 06:00PM</div>
          </div>
        </div>

        <div>
          <p className="text-center mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus provident rerum nesciunt, ipsum totam asperiores esse delectus autem
            possimus dolorum repudiandae tenetur. Nemo
          </p>
          <div className="text-container">
            <button className="btn btn-outline-secondary">Reeserve Your Experience</button>
          </div>
        </div>
      </section>
    </div>
  );
}
