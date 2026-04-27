export default function Contact() {
  return (
    <div className="contact-container">
      <div>
        <h1 className="text-center fw-bold display-3 contact-title text-white">Contact Us</h1>
      </div>

      <div className="bg-dark text-white">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 py-5 ">
            <div className="col">
              <div>
                <h2 className="text-warning">Harlan's Pattaya</h2>
                <h4>Address:</h4>
                <p>Harlan's Pattaya, 47/72, Soi Welcome Town, Central Pattaya Road, Welcome Town, Pattaya Klang, Chon Buri, Bang Lamung, Thailand</p>
              </div>
              <h4>Phone</h4>
              <p>0811613248</p>

              <h4>Email:</h4>
              <p>harlan.chef@gmail.com</p>

              <img src="https://harlanrestaurant.com/images/LINE.png" alt="" className="contact-image" />
            </div>
            <div className="col">
              <div>
                <form className="bg-white p-4 rounded-3 shadow-sm">
                  <h3 className="text-warning">Send Us a Message</h3>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Your name" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Email " />
                  </div>

                  <div>
                    <textarea className="form-control" placeholder="Your message"></textarea>
                  </div>

                  <button type="submit" className="btn btn-warning full-width mt-3">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.123!2d96.155!3d16.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQ4JzAwLjAiTiA5NsKwMDknMTguMCJF!5e0!3m2!1sen!2smm!4v123456789"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"></iframe>
      </div>
    </div>
  );
}
