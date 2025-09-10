import React from "react";

export default function PostCard({ post: p, toAbs, onEdit, onDelete }) {
  const cover = Array.isArray(p.images) && p.images[0]?.url ? toAbs(p.images[0].url) : null;

  return (
    <div className="card h-100 shadow-sm">
      {cover ? (
        <a
          href={cover}
          className="glightbox"
          data-type="image"
          data-gallery={`post-${p.id}`}
        >
          <img
            src={cover}
            alt=""
            className="card-img-top"
            style={{ height: 180, objectFit: "cover" }}
            loading="lazy"
            decoding="async"
          />
        </a>
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

        <ul className="small text-muted list-unstyled mb-0">
          {(p.name || p.uploaderName) && <li>Name: {p.name || p.uploaderName}</li>}
          {p.email && <li>Email: {p.email}</li>}
          {p.location && <li>Location: {p.location}</li>}
        </ul>
      </div>

      <div className="card-footer d-flex justify-content-end gap-2 py-3">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() =>
            onEdit({
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
          onClick={() => onDelete(p.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
