export default function Reservation() {
  return (
    <div className="reservation-container container  mb-5">
      <h1 className="text-center">Reservation Your Experience</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-5">
        <div className="col">
          <form className="form-group my-4">
            <h3 className="text-warning">Reservation Info</h3>
            <div className="row row-cols-1 row-cols-md-2 my-4">
              <div className="col">
                <label htmlFor="date" className="form-label text-warning">
                  Date
                </label>
                <input type="date" className="form-control py-3" />
              </div>

              <div className="col">
                <label htmlFor="date" className="form-label text-warning">
                  What time would you like to book?
                </label>
                <input type="time" className="form-control py-3" />
              </div>
            </div>

            <div>
              <label htmlFor="number" className="text-warning">
                Number of Guests
              </label>
              <input type="number" className="form-control py-3" />
            </div>
          </form>
          <div>
            <img src="https://harlanrestaurant.com/images/LINE.png" alt="" className="line-image" />

            <p className="text-danger fw-bold">*** Reservations will open from April 21, 2026.</p>
            <p className="text-danger fw-bold">*** Kindly note that we currently do not accept credit card payments.</p>
          </div>
        </div>

        <div className="col">
          <form className="form-group my-4">
            <h3 className="text-warning">Guest Info</h3>

            <div className="row row-cols-1 row-cols-lg-2 my-4">
              <div className="col">
                <label htmlFor="name" className="form-label text-warning">
                  Name
                </label>
                <input type="text" className="form-control py-3" placeholder="Name" />
              </div>
              <div className="col">
                <label htmlFor="phone" className="form-label text-warning">
                  Phone
                </label>
                <input type="tel" className="form-control py-3" placeholder="Phone" />
              </div>
              <div className="col">
                <label htmlFor="email" className="text-warning">
                  Email
                </label>
                <input type="email" className="form-control py-3" placeholder="Email" />
              </div>
              <div className="col">
                <label htmlFor="Other Contact ID" className="text-warning">
                  Other Contact ID
                </label>
                <input type="text" className="form-control py-3" placeholder="Viber/Line/WhatsApp(Optional)" />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="form-label text-warning">
                Which menu would you like?
              </label>
              <select className="form-select py-3">
                <option>Daily (Starter)</option>
                <option>Daily (Main Course)</option>
                <option>Daily (Dessert)</option>
                <option>Wine</option>
                <option>Wine</option>
              </select>
            </div>
            <div>
              <label htmlFor="text" className="form-label text-warning my-2">
                Additional Comments
              </label>
              <textarea className="form-control py-3" placeholder="Additional Comments"></textarea>
            </div>

            <div className="my-3">
              <div>
                <input type="checkbox" />
                <label htmlFor="checkbox" className="form-label ms-2">
                  I understand reservation must be made at least 2 days prior
                </label>
              </div>
              <div>
                <input type="checkbox" />
                <label htmlFor="checkbox" className="form-label ms-2">
                  I agree to the terms and conditions for reservation
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-start my-3">
              <button className="btn btn-outline-warning me-3">Cancel</button>
              <button className="btn btn-outline-success">Confirm Reservation</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
