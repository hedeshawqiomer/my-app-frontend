import React, { useEffect, useMemo, useState } from "react";

export default function EditPostModal({
  open,
  post,
  onClose,
  onSave,                 // (patch, { removeImageUrls, removeImageIds })
  CITY_DISTRICTS,
  imageUrlFor,           // optional normalizer
}) {
  const [form, setForm] = useState({
    name: "", email: "", location: "", city: "", district: "",
  });

  const originalImages = useMemo(
    () => (Array.isArray(post?.images) ? post.images : []),
    [post]
  );
  const [removed, setRemoved] = useState(() => new Set());
  const [locating, setLocating] = useState(false);
  const [locErr, setLocErr] = useState("");

  useEffect(() => {
    if (!post) return;
    setForm({
      name: post.name ?? post.uploaderName ?? "",
      email: post.email ?? "",
      location: post.location ?? "",
      city: post.city ?? "",
      district: post.district ?? "",
    });
    setRemoved(new Set());
    setLocErr("");
    setLocating(false);
  }, [post]);

  const urlOf = (img) =>
    imageUrlFor
      ? imageUrlFor(img)
      : (() => {
          const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");
          const u = typeof img === "string" ? img : (img?.url ?? img?.path ?? "");
          if (!u) return "";
          if (/^https?:\/\//i.test(u)) return u;
          return u.startsWith("/") ? `${API_BASE}${u}` : `${API_BASE}/${u}`;
        })();

  const toggleRemove = (idx) =>
    setRemoved((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });

  const clearRemovals = () => setRemoved(new Set());

  const handleCity = (nextCity) => {
    const allowed = CITY_DISTRICTS[nextCity] || [];
    const keep = allowed.includes(form.district) ? form.district : "";
    setForm((s) => ({ ...s, city: nextCity, district: keep }));
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocErr("Geolocation not supported in this browser.");
      return;
    }
    setLocErr("");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setForm((s) => ({ ...s, location: `${lat},${lng}` }));
        setLocating(false);
      },
      (err) => {
        setLocErr(err?.message || "Failed to get location.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!post) return;

    const patch = {
      name: form.name,
      email: form.email,
      location: form.location,
      city: form.city,
      district: form.district,
    };

    const removeImageUrls = [...removed]
      .map((i) => {
        const x = originalImages[i];
        return typeof x === "string" ? x : (x?.url ?? x?.path ?? "");
      })
      .filter(Boolean);

    const removeImageIds = [...removed]
      .map((i) => {
        const x = originalImages[i];
        return x?.id ?? x?._id ?? null;
      })
      .filter(Boolean);

    await onSave(patch, { removeImageUrls, removeImageIds });
  };

  return (
    <div
      className={`modal fade ${open ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: open ? "rgba(0,0,0,.6)" : "transparent" }}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-content">
          <form onSubmit={submit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Post</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              {!post ? (
                <div className="text-muted small">No post selected.</div>
              ) : (
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Your Name</label>
                    <input
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Your Email (Optional)</label>
                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Your Current Location (lat,lng)</label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        placeholder="e.g. 36.153348,44.064575"
                        value={form.location}
                        onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
                      />
                      <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={getLocation}
                        disabled={locating}
                        title="Use current GPS location"
                      >
                        {locating ? "Locating…" : "Get Location"}
                      </button>
                    </div>
                    {locErr && <div className="text-danger small mt-1">{locErr}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">City</label>
                    <select
                      className="form-select"
                      value={form.city}
                      onChange={(e) => handleCity(e.target.value)}
                    >
                      <option value="">Choose city…</option>
                      {Object.keys(CITY_DISTRICTS).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">District</label>
                    <select
                      className="form-select"
                      value={form.district}
                      onChange={(e) => setForm((s) => ({ ...s, district: e.target.value }))}
                      disabled={!form.city}
                    >
                      <option value="">Choose district…</option>
                      {(CITY_DISTRICTS[form.city] || []).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label d-flex justify-content-between align-items-center">
                      <span>Images</span>
                      {[...removed].length > 0 && (
                        <button type="button" className="btn btn-link p-0 small" onClick={clearRemovals}>
                          Undo all removals ({[...removed].length})
                        </button>
                      )}
                    </label>

                    {originalImages.length === 0 ? (
                      <div className="text-muted small">No images attached.</div>
                    ) : (
                      <div className="d-flex align-items-center gap-2 flex-wrap" style={{ rowGap: 8 }}>
                        {originalImages.map((img, i) => {
                          const isRemoved = removed.has(i);
                          return (
                            <div key={i} className="position-relative" style={{ width: 90, height: 80 }}>
                              <img
                                src={urlOf(img)}
                                alt={`img-${i}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: 8,
                                  filter: isRemoved ? "grayscale(100%) blur(1px) brightness(0.6)" : "none",
                                  opacity: isRemoved ? 0.6 : 1,
                                }}
                                loading="lazy"
                                decoding="async"
                              />
                              <button
                                type="button"
                                onClick={() => toggleRemove(i)}
                                className={`btn btn-sm position-absolute top-0 end-0 ${isRemoved ? "btn-secondary" : "btn-danger"}`}
                                style={{ transform: "translate(30%, -30%)", borderRadius: "50%" }}
                                title={isRemoved ? "Restore image" : "Remove image"}
                              >
                                {isRemoved ? "↺" : "✕"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={!post}>Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
