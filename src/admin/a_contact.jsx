import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, MailOpen, Trash2, Check, Clock, User, MessageSquare } from "lucide-react";
import api from "../services/axiosInstance";

export default function ContactDashboard() {
  const queryClient = useQueryClient();

  // 1. Fetch Messages
  const { data: messages, isLoading } = useQuery({
    queryKey: ["contactMessages"],
    queryFn: () => api.get("/contacts").then((res) => res.data),
  });

  // 2. Mark as Read Mutation
  const readMutation = useMutation({
    mutationFn: (id) => api.patch(`/contacts/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries(["contactMessages"]);
    },
  });

  // 3. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/contacts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["contactMessages"]);
    },
  });

  if (isLoading) return <div className="text-center p-5">Loading Messages...</div>;

  const unreadCount = messages?.filter((m) => !m.isRead).length || 0;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold m-0 text-dark">Customer Inquiries</h2>
          <p className="text-muted m-0">Manage and respond to customer messages</p>
        </div>
        <div className="text-end">
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm">{unreadCount} Unread Messages</span>
        </div>
      </div>

      <div className="row g-4">
        {messages?.length === 0 ?
          <div className="col-12 text-center py-5">
            <Mail className="text-muted mb-3" size={48} />
            <p className="text-muted">No messages found yet.</p>
          </div>
        : messages.map((msg) => (
            <div className="col-12" key={msg.id}>
              <div className={`card border-0 shadow-sm rounded-4 overflow-hidden ${!msg.isRead ? "border-start border-warning border-4" : ""}`}>
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-3 border-end">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <User size={16} className="text-muted" />
                        <span className="fw-bold text-dark">{msg.userName}</span>
                      </div>
                      <div className="text-muted small mb-2 text-truncate">
                        <Mail size={14} className="me-1" /> {msg.userEmail}
                      </div>
                      <div className="text-muted smaller d-flex align-items-center gap-1">
                        <Clock size={14} />
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="col-md-6 px-md-4 py-3 py-md-0">
                      <h6 className="fw-bold text-dark mb-1">{msg.subject}</h6>
                      <p className="text-muted mb-0 small text-wrap" style={{ lineHeight: "1.6" }}>
                        {msg.message}
                      </p>
                    </div>

                    <div className="col-md-3 text-md-end">
                      {!msg.isRead && (
                        <button
                          className="btn btn-sm btn-light text-success border-0 me-2"
                          title="Mark as read"
                          onClick={() => readMutation.mutate(msg.id)}
                          disabled={readMutation.isPending}>
                          <Check size={18} /> Mark Read
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-light text-danger border-0"
                        title="Delete message"
                        onClick={() => window.confirm("ဖျက်မှာ သေချာလား?") && deleteMutation.mutate(msg.id)}
                        disabled={deleteMutation.isPending}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
