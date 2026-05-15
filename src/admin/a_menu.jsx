import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8800";
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("categories");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", image: "", price: "", categoryId: "" });

  // Dropdown အတွက် Category ID ကို သိမ်းဖို့ State
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: [activeTab],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/${activeTab}`);
      return res.data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (newData) => {
      if (editId) return axios.put(`${API_URL}/${activeTab}/${editId}`, newData, getAuthHeader());
      return axios.post(`${API_URL}/${activeTab}`, newData, getAuthHeader());
    },
    onSuccess: () => {
      queryClient.invalidateQueries([activeTab]);
      handleCloseModal();
    },
    onError: () => alert("လုပ်ဆောင်ချက် မအောင်မြင်ပါ"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}/${activeTab}/${id}`, getAuthHeader()),
    onSuccess: () => queryClient.invalidateQueries([activeTab]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "items" && !formData.categoryId) {
      alert("Category တစ်ခုကို ရွေးချယ်ပေးပါ");
      return;
    }
    const payload =
      activeTab === "categories" ?
        { name: formData.name, image: formData.image }
      : {
          name: formData.name,
          image: formData.image,
          price: Number(formData.price),
          categoryId: Number(formData.categoryId),
        };
    saveMutation.mutate(payload);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ name: "", image: "", price: "", categoryId: "" });
  };

  const toggleDropdown = (id) => {
    setOpenCategoryId(openCategoryId === id ? null : id);
  };

  return (
    <div className="container mt-5 pb-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-0">Harlan Admin</h2>
          <p className="text-muted small">Manage your restaurant menu and categories</p>
        </div>
        <button className="btn btn-primary btn-lg rounded-pill shadow-sm px-4" onClick={() => setShowModal(true)}>
          + Add {activeTab === "categories" ? "Category" : "Item"}
        </button>
      </div>

      {/* Tabs Design */}
      <ul className="nav nav-pills mb-4 bg-white p-2 rounded-pill shadow-sm border" style={{ width: "fit-content" }}>
        <li className="nav-item">
          <button
            className={`nav-link rounded-pill px-4 ${activeTab === "categories" ? "active" : "text-dark"}`}
            onClick={() => {
              setActiveTab("categories");
              setOpenCategoryId(null);
            }}>
            📁 Categories
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link rounded-pill px-4 ${activeTab === "items" ? "active" : "text-dark"}`}
            onClick={() => {
              setActiveTab("items");
              setOpenCategoryId(null);
            }}>
            🍔 Menu Items
          </button>
        </li>
      </ul>

      {/* Table Section */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <table className="table align-middle mb-0">
          <thead className="bg-light">
            <tr className="text-secondary small fw-bold">
              <th className="ps-4">DETAILS</th>
              {activeTab === "items" && <th>PRICE</th>}
              {activeTab === "categories" && <th>ITEMS COUNT</th>}
              <th className="text-end pe-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ?
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                  Loading data...
                </td>
              </tr>
            : data?.map((item) => (
                <React.Fragment key={item.id}>
                  {/* Category Row (Clickable for Dropdown) */}
                  <tr
                    onClick={() => activeTab === "categories" && toggleDropdown(item.id)}
                    style={{ cursor: activeTab === "categories" ? "pointer" : "default" }}
                    className={openCategoryId === item.id ? "table-light" : ""}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center">
                        <img src={item.image} className="rounded-3 shadow-sm me-3" style={{ width: "55px", height: "55px", objectFit: "cover" }} />
                        <div>
                          <div className="fw-bold text-dark">{item.name}</div>
                          <div className="text-muted" style={{ fontSize: "12px" }}>
                            ID: #{item.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {activeTab === "items" && (
                      <td>
                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">{item.price} MMK</span>
                      </td>
                    )}

                    {activeTab === "categories" && (
                      <td>
                        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                          {item._count?.menuItems || 0} Items {openCategoryId === item.id ? "▲" : "▼"}
                        </span>
                      </td>
                    )}

                    <td className="text-end pe-4">
                      <button
                        className="btn btn-sm btn-outline-info rounded-pill px-3 me-2"
                        onClick={(e) => {
                          e.stopPropagation(); // Dropdown မပွင့်အောင်တားတာ
                          setEditId(item.id);
                          setFormData({ name: item.name, image: item.image, price: item.price || "", categoryId: item.menuCategoryId || "" });
                          setShowModal(true);
                        }}>
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("ဖျက်မှာ သေချာလား?")) deleteMutation.mutate(item.id);
                        }}>
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* Item Dropdown List under Category */}
                  {activeTab === "categories" && openCategoryId === item.id && (
                    <tr>
                      <td colSpan="4" className="bg-light p-0 border-0">
                        <div className="px-5 py-3 animate__animated animate__fadeIn">
                          <div className="d-flex flex-wrap gap-2">
                            {item.menuItems?.length > 0 ?
                              item.menuItems.map((menu) => (
                                <div
                                  key={menu.id}
                                  className="bg-white border rounded-3 p-2 shadow-sm d-flex align-items-center"
                                  style={{ minWidth: "200px" }}>
                                  <img src={menu.image} className="rounded me-2" style={{ width: "35px", height: "35px", objectFit: "cover" }} />
                                  <div className="flex-grow-1">
                                    <div className="small fw-bold">{menu.name}</div>
                                    <div className="text-success small" style={{ fontSize: "11px" }}>
                                      {menu.price} MMK
                                    </div>
                                  </div>
                                </div>
                              ))
                            : <div className="text-muted small">No items in this category yet.</div>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Modal - နဂို Logic အတိုင်းပါပဲ */}
      {showModal && (
        <div className="modal d-block show" style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 pt-4 px-4">
                <h5 className="fw-bold">
                  {editId ? "Update" : "Add New"} {activeTab === "categories" ? "Category" : "Item"}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">NAME</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">IMAGE URL</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                  {activeTab === "items" && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold small text-muted">PRICE (MMK)</label>
                        <input
                          type="number"
                          className="form-control bg-light border-0 py-2"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold small text-muted">CATEGORY ID</label>
                        <input
                          type="number"
                          className="form-control bg-light border-0 py-2"
                          required
                          value={formData.categoryId}
                          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer border-0 p-4">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4 shadow" disabled={saveMutation.isPending}>
                    {saveMutation.isPending ? "Saving..." : "Save Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
