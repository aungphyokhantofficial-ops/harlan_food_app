import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Edit3, Trash2, Plus, Save, Video, Image as ImageIcon } from "lucide-react";
import api from "../services/axiosInstance";

// Backend URL သတ်မှတ်ချက်
const API_BASE_URL = "http://localhost:8800";

export default function GalleryDashboard() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ title: "", category: "General" });

  // 1. Fetch Data
  const { data: items, isLoading } = useQuery({
    queryKey: ["gallerys"],
    queryFn: () => api.get("/gallery").then((res) => res.data),
  });

  // Helper function for Media URL
  const getMediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    // URL ရဲ့ အစမှာ / ပါနေရင် ထပ်မထည့်အောင် စစ်ပါသည်
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  // 2. Mutations
  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries(["gallerys"]);
      resetForm();
    },
    onError: (err) => alert(err.response?.data?.message || "လုပ်ဆောင်ချက် မအောင်မြင်ပါ"),
  };

  const uploadMutation = useMutation({
    mutationFn: (data) => api.post("/gallery", data),
    ...mutationOptions,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => api.put(`/gallery/${editingId}`, data),
    ...mutationOptions,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/gallery/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["gallerys"]),
  });

  // 3. Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    if (file) data.append("file", file);

    if (editingId) {
      updateMutation.mutate(data);
    } else {
      if (!file) return alert("ဖိုင်ရွေးချယ်ပေးပါ");
      uploadMutation.mutate(data);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", category: "General" });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0 text-dark">Gallery Management</h2>
        {editingId && (
          <button className="btn btn-sm btn-secondary" onClick={resetForm}>
            Add New Mode
          </button>
        )}
      </div>

      {/* Form Section */}
      <div className="card border-0 shadow-sm mb-5 rounded-4 overflow-hidden">
        <div className={`card-header ${editingId ? "bg-info text-white" : "bg-dark text-white"} py-3`}>
          <h6 className="m-0">{editingId ? "Edit Item" : "Add New Media"}</h6>
        </div>
        <form className="card-body p-4" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold">Title</label>
              <input
                type="text"
                className="form-control shadow-none bg-light border-0"
                placeholder="Media title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Upload File</label>
              <input
                type="file"
                className="form-control shadow-none bg-light border-0"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Category</label>
              <select
                className="form-select shadow-none bg-light border-0"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="General">General</option>
                <option value="Event">Event</option>
                <option value="Party">Party</option>
                <option value="Birthday">Birthday</option>
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                type="submit"
                className={`btn ${editingId ? "btn-info" : "btn-warning text-dark"} w-100 fw-bold py-2`}
                disabled={uploadMutation.isPending || updateMutation.isPending}>
                {uploadMutation.isPending || updateMutation.isPending ?
                  <span className="spinner-border spinner-border-sm"></span>
                : editingId ?
                  <>
                    <Save size={18} className="me-2" /> Update
                  </>
                : <>
                    <Plus size={18} className="me-2" /> Create
                  </>
                }
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="table-responsive bg-white rounded-4 shadow-sm border">
        <table className="table table-hover align-middle m-0">
          <thead className="table-light">
            <tr>
              <th className="px-4 py-3" style={{ width: "120px" }}>
                Media
              </th>
              <th className="py-3">Details</th>
              <th className="py-3 text-end px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ?
              <tr>
                <td colSpan="3" className="text-center py-5 text-muted">
                  Loading data...
                </td>
              </tr>
            : items?.map((item) => (
                <tr key={item.id}>
                  <td className="px-4">
                    {item.type === "VIDEO" ?
                      <div
                        className="bg-light rounded d-flex align-items-center justify-content-center shadow-sm"
                        style={{ width: "60px", height: "45px" }}>
                        <Video size={20} className="text-primary" />
                      </div>
                    : <img
                        src={getMediaUrl(item.url)}
                        width="60"
                        height="45"
                        className="rounded shadow-sm object-fit-cover"
                        alt=""
                        onError={(e) => (e.target.src = "https://via.placeholder.com/60x45?text=Error")}
                      />
                    }
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{item.title}</div>
                    <span className="badge bg-light text-muted fw-normal border">{item.category}</span>
                  </td>
                  <td className="text-end px-4">
                    <button
                      className="btn btn-sm btn-outline-primary border-0 me-1"
                      onClick={() => {
                        setEditingId(item.id);
                        setFormData({ title: item.title, category: item.category });
                        window.scrollTo(0, 0); // Form ဆီသို့ ပြန်တက်သွားရန်
                      }}>
                      <Edit3 size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger border-0"
                      onClick={() => window.confirm("ဖျက်မှာလား?") && deleteMutation.mutate(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
