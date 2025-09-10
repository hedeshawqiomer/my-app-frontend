import React from "react";

export default function PendingPostRow({ index, post, toAbs, onAccept, onDelete }) {
  return (
    <tr>
      <td>{index + 1}</td>

      {/* Images with horizontal scroller + GLightbox anchors */}
      <td style={{ width: 460 }}>
        <div
          className="image-scroll-container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            overflowX: "auto",
            maxWidth: 420,
            padding: "6px 4px",
            scrollbarWidth: "thin",
          }}
        >
          {(post.images || []).map((img, i) => (
            <a
              key={i}
              href={toAbs(img.url)}
              className="glightbox"
              data-type="image"
              data-gallery={`post-${post.id}`}
              style={{ flex: "0 0 auto" }}
            >
              <img
                src={toAbs(img.url)}
                alt={`img-${i}`}
                style={{
                  width: 110,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block",
                }}
                loading="lazy"
                decoding="async"
              />
            </a>
          ))}
        </div>
      </td>

      <td>{post.name || post.uploaderName || "-"}</td>
      <td>{post.email || "-"}</td>
      <td>{post.city || "-"}</td>
      <td>{post.district || "-"}</td>

      <td className="text-center">
        <a
          href={`https://maps.google.com?q=${encodeURIComponent(post.location || "")}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-success btn-sm"
        >
          📍 On Map
        </a>
      </td>

      <td className="text-center">
        <div className="d-grid gap-2 gap-md-1">
          <button className="btn btn-success btn-sm" onClick={onAccept}>Accept</button>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
        </div>
      </td>
    </tr>
  );
}
