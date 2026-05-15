import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";

const bookingApi = "http://localhost:8800/reservations";

export default function Reservation() {
  const queryClient = useQueryClient();
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);

  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
    guestsCount: 1,
    guestName: "",
    phoneNumber: "",
    email: "",
    otherContactId: "",
    selectedMenu: "Daily (Starter)",
    specialNotes: "",
    agreedToTerms: false,
    understandEarly: false,
  });

  // --- အသစ်ထည့်သွင်းလိုက်သော Timer Logic ---
  const startWaitingTimer = () => {
    setIsWaiting(true);

    setTimeout(() => {
      setIsWaiting(false);
      alert("✅ ဘွတ်ကင်တင်ခြင်း အောင်မြင်ပါသည်။ လူကြီးမင်းထံသို့ Admin မှ မကြာမီ ပြန်လည်ဆက်သွယ်ပေးပါမည်။");
      window.location.reload();
    }, 5000); // ၅ စက္ကန့်စောင့်မည်
  };

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected.getDay() === 0) {
      alert("Sunday (တနင်္ဂနွေနေ့) သည် ဆိုင်ပိတ်ရက်ဖြစ်ပါသည်။");
      e.target.value = "";
      return;
    }
    if (selected < today) {
      alert("ယခင်ရက်စွဲများကို ရွေးချယ်၍မရပါ။");
      e.target.value = "";
      return;
    }
    setFormData({ ...formData, bookingDate: e.target.value });
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    const [hours] = time.split(":").map(Number);
    if (hours < 5 || hours >= 22) {
      alert("ဆိုင်ဖွင့်ချိန် (5AM - 10PM) အတွင်းသာ ရွေးချယ်ပေးပါ။");
      e.target.value = "";
      return;
    }
    setFormData({ ...formData, bookingTime: time });
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const bodyFormData = new FormData();
      Object.keys(data).forEach((key) => {
        bodyFormData.append(key, data[key]);
      });
      if (paymentScreenshot) {
        bodyFormData.append("paymentScreenshot", paymentScreenshot);
      }
      const res = await fetch(bookingApi, {
        method: "POST",
        body: bodyFormData,
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Unknown Error" }));
        throw new Error(errorData.message || `Status: ${res.status}`);
      }
      return await res.json();
    },
    onSuccess: (response) => {
      // API အောင်မြင်လျှင် ၅ စက္ကန့် စောင့်ခိုင်းမည်
      startWaitingTimer();
    },
    onError: (error) => {
      alert(`Error Occurred: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms || !formData.understandEarly) {
      alert("စည်းကမ်းချက်များကို သဘောတူညီပေးရန် လိုအပ်ပါသည်။");
      return;
    }
    if (formData.guestsCount >= 6 && !paymentScreenshot) {
      alert("လူဦးရေ ၆ ယောက်နှင့်အထက် ဖြစ်သောကြောင့် ငွေလွှဲမှတ်တမ်း တင်ပေးရန် လိုအပ်ပါသည်။");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="reservation-container container mb-5 position-relative">
      {/* Waiting Overlay - Design မူလအတိုင်း */}
      {isWaiting && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 2000, color: "#ffc107" }}>
          <div className="spinner-border text-warning mb-3" style={{ width: "3rem", height: "3rem" }}></div>
          <h3>Waiting for Admin Confirmation...</h3>
          <p className="text-white-50">လူကြီးမင်း၏ ဘွတ်ကင်ကို Admin မှ စစ်ဆေးနေပါသည်။ ခဏတာ စောင့်ဆိုင်းပေးပါ။</p>
        </div>
      )}

      <h1 className="text-center my-4 text-warning">Reserve Your Experience</h1>
      <div className="row row-cols-1 row-cols-md-2 g-5">
        <div className="col">
          <div className="form-group my-4 text-warning">
            <h3>Reservation Info</h3>
            <div className="row g-3 my-2">
              <div className="col-md-6">
                <label className="small mb-1">Date (Sun Off)</label>
                <input type="date" name="bookingDate" className="form-control py-3" onChange={handleDateChange} required />
              </div>
              <div className="col-md-6">
                <label className="small mb-1">Time (5AM - 10PM)</label>
                <input type="time" name="bookingTime" className="form-control py-3" onChange={handleTimeChange} required />
              </div>
            </div>
            <div className="mt-3">
              <label>Number of Guests</label>
              <input type="number" name="guestsCount" className="form-control py-3" value={formData.guestsCount} onChange={handleChange} min="1" />
            </div>

            <div className="card bg-transparent border-warning mt-4 p-3 text-center ">
              <p className="small text-warning-50 mb-2">Scan the QR code to book via our LINE Official</p>
              <div className="bg-white p-2 d-inline-block mx-auto rounded">
                <img src="https://harlanrestaurant.com/images/LINE.png" alt="LINE QR Code" style={{ width: "150px", height: "150px" }} />
              </div>
              <h4 className="mt-3 fw-bold text-success" style={{ letterSpacing: "2px" }}>
                LINE
              </h4>
            </div>

            {formData.guestsCount >= 6 && (
              <div className="card border-warning bg-dark text-warning my-4 p-3 shadow-lg text-center">
                <h5> 50000 Ks</h5>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KPay-09123456789"
                  alt="QR"
                  className="img-thumbnail my-2 mx-auto"
                  style={{ width: "130px" }}
                />
                <p className="mb-0">KPay: 09123456789</p>
                <input
                  type="file"
                  className="form-control form-control-sm mt-2"
                  accept="image/*"
                  onChange={(e) => setPaymentScreenshot(e.target.files[0])}
                />
              </div>
            )}
          </div>
        </div>

        <div className="col">
          <form className="form-group my-4" onSubmit={handleSubmit}>
            <h3 className="text-warning border-bottom pb-2">Guest Info</h3>
            <div className="row g-3 mt-2 mb-4">
              <div className="col-md-6">
                <input type="text" name="guestName" className="form-control py-3" placeholder="Full Name" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <input type="tel" name="phoneNumber" className="form-control py-3" placeholder="Phone Number" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <input type="email" name="email" className="form-control py-3" placeholder="Email Address" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <input type="text" name="otherContactId" className="form-control py-3" placeholder="Viber/WA (Optional)" onChange={handleChange} />
              </div>
            </div>

            <div className="mb-4 text-warning">
              <label className="mb-2">Selected Menu</label>
              <select name="selectedMenu" className="form-select py-3" onChange={handleChange}>
                <option>Daily (Starter)</option>
                <option>Daily (Main Course)</option>
                <option>Daily (Dessert)</option>
                <option>Wine</option>
              </select>
            </div>

            <div className="mb-4 text-warning">
              <label className="mb-2">Additional Comments</label>
              <textarea
                name="specialNotes"
                className="form-control py-3"
                rows="3"
                placeholder="Allergies or special requests..."
                onChange={handleChange}></textarea>
            </div>

            <div className="mb-4 text-white-50">
              <div className="form-check">
                <input type="checkbox" name="understandEarly" className="form-check-input" id="c1" onChange={handleChange} />
                <label htmlFor="c1" className="ms-2 text-secondary">
                  Must book 2 days in advance
                </label>
              </div>
              <div className="form-check mt-2">
                <input type="checkbox" name="agreedToTerms" className="form-check-input" id="c2" onChange={handleChange} />
                <label htmlFor="c2" className="ms-2 text-secondary">
                  I agree to terms and conditions
                </label>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-warning flex-fill py-2" onClick={() => window.location.reload()}>
                Cancel
              </button>
              <button type="submit" className="btn btn-outline-success flex-fill py-2 fw-bold" disabled={mutation.isPending || isWaiting}>
                {mutation.isPending ?
                  "Sending..."
                : isWaiting ?
                  "Waiting Admin..."
                : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
