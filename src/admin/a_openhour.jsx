import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Clock, Save, Edit2, AlertCircle, CheckCircle2, X } from "lucide-react";
import api from "../services/axiosInstance";

export default function OpeningHoursDashboard() {
  const queryClient = useQueryClient();
  const [editingDay, setEditingDay] = useState(null);
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    openTime: "",
    closeTime: "",
    isClosed: false,
  });

  // 12-hour format ပြောင်းပေးသည့် helper function
  const formatTime12 = (timeString) => {
    if (!timeString || timeString === "---") return "---";

    try {
      const [hours, minutes] = timeString.split(":");
      let hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12; // 0 ကို 12 လို့ပြောင်းပြီး ၁၃ ကို ၁ လို့ပြောင်းပေးတာပါ

      return `${hour}:${minutes} ${ampm}`;
    } catch (e) {
      return timeString; // Error တက်ရင် နဂိုအတိုင်းပဲ ပြမယ်
    }
  };

  // Fetch Data
  const { data: hours, isLoading } = useQuery({
    queryKey: ["openingHours"],
    queryFn: () => api.get("/hours").then((res) => res.data),
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: (data) => api.patch("/update", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["openingHours"]);
      setEditingDay(null);
      // alert အစား ပိုကောင်းတဲ့ UI သုံးနိုင်သော်လည်း လက်ရှိတွင် logic အမှန်ဖြစ်အောင်ထားသည်
    },
    onError: (err) => alert(err.response?.data?.message || "ပြင်ဆင်၍မရပါ"),
  });

  const handleEditClick = (item) => {
    setEditingDay(item.dayOfWeek);
    setFormData({
      dayOfWeek: item.dayOfWeek,
      openTime: item.openTime || "09:00",
      closeTime: item.closeTime || "21:00",
      isClosed: item.isClosed,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-warning"></div>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-warning p-2 rounded-3 shadow-sm">
            <Clock className="text-white" size={28} />
          </div>
          <h2 className="fw-bold m-0 text-dark">Opening Hours</h2>
        </div>
      </div>

      <div className="row g-4">
        {/* စာရင်းပြသသည့်အပိုင်း */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table align-middle m-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 py-3 border-0">Day</th>
                    <th className="border-0">Timing</th>
                    <th className="border-0">Status</th>
                    <th className="text-end pe-4 border-0">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hours?.map((item) => (
                    <tr key={item.id} className={editingDay === item.dayOfWeek ? "bg-warning bg-opacity-10" : ""}>
                      <td className="ps-4 fw-bold">{item.dayOfWeek}</td>
                      <td>
                        {item.isClosed ?
                          <span className="text-muted">---</span>
                        : <span className="fw-medium text-dark">
                            {formatTime12(item.openTime)} - {formatTime12(item.closeTime)}
                          </span>
                        }
                      </td>
                      <td>
                        {item.isClosed ?
                          <span className="badge rounded-pill bg-danger-subtle text-danger px-3">Closed</span>
                        : <span className="badge rounded-pill bg-success-subtle text-success px-3">Open</span>}
                      </td>
                      <td className="text-end pe-4">
                        <button
                          className={`btn btn-sm rounded-circle ${editingDay === item.dayOfWeek ? "btn-warning" : "btn-outline-secondary border-0"}`}
                          onClick={() => handleEditClick(item)}>
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ပြင်ဆင်သည့် Form အပိုင်း */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top" style={{ top: "100px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0 text-primary">{editingDay ? `Editing: ${editingDay}` : "Select a day to edit"}</h5>
              {editingDay && (
                <button className="btn btn-sm btn-light rounded-circle" onClick={() => setEditingDay(null)}>
                  <X size={18} />
                </button>
              )}
            </div>

            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Shop Status</label>
                <div
                  className={`form-check form-switch p-3 rounded-3 d-flex justify-content-between align-items-center transition-all ${formData.isClosed ? "bg-danger bg-opacity-10" : "bg-success bg-opacity-10"}`}>
                  <span className={`ms-5 fw-bold ${formData.isClosed ? "text-danger" : "text-success"}`}>
                    {formData.isClosed ? "CLOSED" : "OPEN FOR BUSINESS"}
                  </span>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={!formData.isClosed}
                    onChange={(e) => setFormData({ ...formData, isClosed: !e.target.checked })}
                  />
                </div>
              </div>

              {!formData.isClosed && (
                <div className="row g-3 mb-4 slide-in">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Opening At</label>
                    <input
                      type="time"
                      className="form-control form-control-lg border-0 bg-light focus-ring"
                      value={formData.openTime}
                      onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Closing At</label>
                    <input
                      type="time"
                      className="form-control form-control-lg border-0 bg-light focus-ring"
                      value={formData.closeTime}
                      onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-warning w-100 py-3 fw-bold shadow-sm rounded-3"
                disabled={!editingDay || updateMutation.isPending}>
                {updateMutation.isPending ?
                  <span className="spinner-border spinner-border-sm me-2"></span>
                : <>
                    <Save size={18} className="me-2" /> Save Changes
                  </>
                }
              </button>

              {editingDay && <p className="text-center mt-3 mb-0 small text-muted">Last updated via control panel</p>}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .transition-all { transition: all 0.3s ease; }
        .focus-ring:focus { box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25); border: none; }
        .slide-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
