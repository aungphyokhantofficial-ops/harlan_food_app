import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check, X, Trash2, Calendar, Clock, User, Users, Image as ImageIcon } from "lucide-react";

const API = "http://localhost:8800/reservations";

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  // ၁။ ဒေတာများ ခေါ်ယူခြင်း
  const {
    data: list,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin_reservations"],
    queryFn: () => axios.get(API).then((res) => res.data),
  });

  // ၂။ Status ပြောင်းလဲခြင်း (Confirm/Reject)
  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => axios.patch(`${API}/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_reservations"]);
    },
  });

  // ၃။ Delete လုပ်ခြင်း
  const deleteBooking = useMutation({
    mutationFn: (id) => axios.delete(`${API}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_reservations"]);
    },
  });

  if (isLoading) return <div className="p-5 text-center text-warning">Loading Reservations...</div>;
  if (isError) return <div className="p-5 text-center text-danger">Error fetching data.</div>;

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
        <h2 className="fw-bold text-dark m-0">Reservation Dashboard</h2>
        <span className="badge bg-dark rounded-pill px-3 py-2">Total: {list?.length} Bookings</span>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th className="ps-4 py-3">Customer</th>
                <th>Schedule</th>
                <th className="text-center">Guests</th>
                <th>Payment Slip</th>
                <th>Status</th>
                <th className="pe-4 text-end">Manage</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item) => (
                <tr key={item.id} className="border-bottom">
                  {/* Customer Info */}
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="avatar bg-warning bg-opacity-10 text-warning rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px" }}>
                        <User size={18} />
                      </div>
                      <div>
                        <div className="fw-bold text-dark">{item.guestName}</div>
                        <div className="small text-muted">{item.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Schedule */}
                  <td>
                    <div className="d-flex flex-column small">
                      <span>
                        <Calendar size={13} className="me-1 text-primary" /> {item.bookingDate}
                      </span>
                      <span className="text-muted">
                        <Clock size={13} className="me-1" /> {item.bookingTime}
                      </span>
                    </div>
                  </td>

                  {/* Guests */}
                  <td className="text-center">
                    <span className="badge bg-secondary-subtle text-secondary rounded-pill border px-3">
                      <Users size={12} className="me-1" /> {item.guestsCount}
                    </span>
                  </td>

                  {/* Payment Slip (ပြင်ဆင်ထားသော အပိုင်း) */}
                  <td>
                    {item.paymentScreenshot ?
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.paymentScreenshot}
                          alt="slip"
                          className="rounded border shadow-sm"
                          style={{ width: "45px", height: "45px", objectFit: "cover", cursor: "pointer" }}
                          onClick={() => window.open(item.paymentScreenshot, "_blank")}
                        />
                        <a
                          href={item.paymentScreenshot}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none small fw-medium text-primary">
                          View Full
                        </a>
                      </div>
                    : <span className="text-muted small italic">No Deposit</span>}
                  </td>

                  {/* Badges for Status */}
                  <td>
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Actions */}
                  <td className="pe-4 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      {item.status === "pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-success rounded-3 px-3 shadow-sm"
                            onClick={() => updateStatus.mutate({ id: item.id, status: "confirmed" })}>
                            <Check size={16} className="me-1" /> Accept
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-3 px-3 shadow-sm"
                            onClick={() => updateStatus.mutate({ id: item.id, status: "rejected" })}>
                            <X size={16} className="me-1" /> Reject
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-sm btn-light text-danger border-0 rounded-3"
                        onClick={() => window.confirm("ဖျက်မှာ သေချာလား?") && deleteBooking.mutate(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  const config = {
    pending: { bg: "bg-warning-subtle text-warning border-warning", label: "Pending Review" },
    confirmed: { bg: "bg-success-subtle text-success border-success", label: "Confirmed" },
    rejected: { bg: "bg-danger-subtle text-danger border-danger", label: "Cancelled" },
  };

  const current = config[status] || config.pending;

  return (
    <span className={`badge rounded-pill border px-3 py-2 fw-semibold ${current.bg}`} style={{ fontSize: "0.75rem" }}>
      {current.label.toUpperCase()}
    </span>
  );
}
