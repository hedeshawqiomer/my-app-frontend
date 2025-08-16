// src/components/AcceptedPosts.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getAcceptedPosts, updatePost, deletePost } from "../../utills/postStore";
import DashboardHeader from "./DashboardComponents/BackendHeader";

const CITY_DISTRICTS = {
  Erbil: ["Soran", "Shaqlawa", "Mergasor", "Koya"],
  Sulaimani: ["Chamchamal", "Tasluja", "Penjwen", "Qaladze"],
  Duhok: ["Akre", "Zakho", "Amadiya", "Simele"],
  Halabja: ["Byara", "Tawella"],
  Kirkuk: ["Daquq", "Tuz Khurmatu"],
};

export default function AllpostsDashboard() {
  const [all, setAll] = useState([]);
  const [city, setCity] = useState("");
  const [editing, setEditing] = useState(null);

  const load = () => {
    const sorted = getAcceptedPosts()
      .slice()
      .sort(
        (a, b) =>
          new Date(b.acceptedAt || b.createdAt || 0) -
          new Date(a.acceptedAt || a.createdAt || 0)
      );
    setAll(sorted);
  };

  useEffect(() => { load(); }, []);

  const handleCityChange = (value) => setCity(value);

  const data = useMemo(() => {
    return all.filter((p) => (city ? p.city === city : true));
  }, [all, city]);

  const onSave = (e) => {
    e.preventDefault();
    if (!editing) return;

    const patch = {
      name: editing.name ?? editing.uploaderName ?? "",
      email: editing.email ?? "",
      location: editing.location ?? "",
      city: editing.city ?? "",
      district: editing.district ?? "",
      uploaderName: editing.name ?? editing.uploaderName ?? "",
    };

    updatePost(editing.id, patch);
    setEditing(null);
    load();
  };

  return (
    <div className="container-fluid mt-3">
      <DashboardHeader
        showCityFilter
        onCityChange={handleCityChange}
      />

      {data.length === 0 ? (
        <div className="alert alert-light border">No posts match.</div>
      ) : (
        <div className="row g-3">
          {data.map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
              <div className="card h-100 shadow-sm">
                {Array.isArray(p.images) && p.images[0] ? (
                  <img
                    src={p.images[0]}
                    alt=""
                    className="card-img-top"
                    style={{ height: 180, objectFit: "cover" }}
                  />
                ) : (
                  <div className="bg-light" style={{ height: 180 }} />
                )}

                <div className="card-body">
                  <div className="d-flex gap-2 mb-2">
                    <span className="badge bg-primary-subtle text-primary">
                      {p.city || "City"}
                    </span>
                    {p.district && (
                      <span className="badge bg-secondary-subtle text-secondary">
                        {p.district}
                      </span>
                    )}
                  </div>

                  <h5 className="card-title mb-1">{p.title || p.location || "Untitled"}</h5>

                  <ul className="small text-muted list-unstyled mb-0">
                    {(p.name || p.uploaderName) && (
                      <li>Name: {p.name || p.uploaderName}</li>
                    )}
                    {p.email && <li>Email: {p.email}</li>}
                    {p.district && <li>District: {p.district}</li>}
                    {p.location && <li>Location: {p.location}</li>}
                  </ul>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() =>
                      setEditing({
                        ...p,
                        name: p.name ?? p.uploaderName ?? "",
                        email: p.email ?? "",
                        district: p.district ?? "",
                        location: p.location ?? "",
                      })
                    }
                  >
                    Alter
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      deletePost(p.id);
                      load();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className={`modal fade ${editing ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ background: editing ? "rgba(0,0,0,.6)" : "transparent" }}
        onClick={() => setEditing(null)}
      >
        <div
          className="modal-dialog modal-md modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <form onSubmit={onSave}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Post</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditing(null)}
                />
              </div>

              <div className="modal-body">
                {editing && (
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Your Name</label>
                      <input
                        className="form-control"
                        placeholder="eg: Ahmed Muhammed"
                        value={editing.name ?? editing.uploaderName ?? ""}
                        onChange={(e) =>
                          setEditing((s) => ({
                            ...s,
                            name: e.target.value,
                            uploaderName: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">
                        Your Email <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="eg: ahmad.muhamed@gmail.com"
                        value={editing.email ?? ""}
                        onChange={(e) => setEditing((s) => ({ ...s, email: e.target.value }))}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Your Current Location</label>
                      <input
                        className="form-control"
                        value={editing.location ?? ""}
                        onChange={(e) => setEditing((s) => ({ ...s, location: e.target.value }))}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">City</label>
                      <select
                        className="form-select"
                        value={editing.city ?? ""}
                        onChange={(e) => {
                          const nextCity = e.target.value;
                          setEditing((s) => {
                            const allowed = CITY_DISTRICTS[nextCity] || [];
                            const keep = allowed.includes(s?.district) ? s.district : "";
                            return { ...s, city: nextCity, district: keep };
                          });
                        }}
                      >
                        <option value="">Choose city…</option>
                        {Object.keys(CITY_DISTRICTS).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label">District</label>
                      <select
                        className="form-select"
                        value={editing.district ?? ""}
                        onChange={(e) => setEditing((s) => ({ ...s, district: e.target.value }))}
                        disabled={!editing.city}
                      >
                        <option value="">Choose district…</option>
                        {(CITY_DISTRICTS[editing.city] || []).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
