import React, { useEffect, useMemo, useState } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { useTranslation } from "react-i18next";

import BackendHeader from "./DashboardComponents/BackendHeader";
import PostCard from "./DashboardComponents/EachAcceptedPost";
import EditPostModal from "./DashboardComponents/EachEditingAccpetpost";
import {
  listPosts,
  deletePostById,
  updatePostById,
  deletePostImagesBulk,
  deletePostImageById,
  deletePostImageByUrl
} from "../../api/post";

// ... (imports)

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");
const toAbs = (u) => {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  return u.startsWith("/") ? `${API_BASE}${u}` : `${API_BASE}/${u}`;
};


 const CITY_DISTRICTS = {
    Erbil: ["Hawler", "Soran", "Shaqlawa", "Mergasor", "Choman", "Koye", "Rwanduz", "Dashti Hawler"],
    Sulaimani: ["Sulaimani", "Bazyan", "Penjwen", "Qaradax", "Sharbazher", "Dukan", "Ranya", "Pashadar", "Penjwin", "Chemchemal"],
    Duhok: ["Duhok", "Akre", "Zakho", "Amadiya", "Simele", "Bardarash", "Shekhan"],
    Halabja: ["Halbja", "Khurmal", "Byara", "Tawella"],
  };

export default function AcceptedPosts() {
  const { t } = useTranslation();
  const [all, setAll] = useState([]);
  const [city, setCity] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setErr("");
      const data = await listPosts({ status: "accepted", city: city || undefined });
      if (!Array.isArray(data)) throw new Error("Invalid API response format");

      const sorted = data.slice().sort(
        (a, b) =>
          new Date(b.acceptedAt || b.createdAt || 0) -
          new Date(a.acceptedAt || a.createdAt || 0)
      );
      setAll(sorted);
    } catch (e) {
      console.error("List posts error:", e);
      // Detailed error reporting
      const status = e?.response?.status;
      const msg = e?.response?.data?.error || e?.message || "Failed to load accepted posts";
      setErr(status ? `Error ${status}: ${msg}` : msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [city]);

  // Filter view data by city (keeps sort)
  const data = useMemo(() => all.filter((p) => (city ? p.city === city : true)), [all, city]);

  // Bind GLightbox to currently-rendered DOM
  useEffect(() => {
    let lb;
    try {
      lb = GLightbox({ selector: ".glightbox", loop: true });
    } catch (e) {
      console.warn("GLightbox init failed:", e);
    }
    return () => {
      if (lb) {
        try { lb.destroy(); } catch { /* ignore */ }
      }
    };
  }, [data]);

  const onDelete = async (id) => {
    try {
      await deletePostById(id);
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || "Failed to delete");
    }
  };

  return (
    <>
      <div className="container-fluid mt-5 pt-5">
        <BackendHeader showCityFilter onCityChange={setCity} />

        {loading && <div className="alert alert-info">{t("admin.login.loading")}</div>}
        {err && <div className="alert alert-danger">{err}</div>}

        {data.length === 0 ? (
          <div className="alert alert-light border">{t("admin.accepted.noMatch")}</div>
        ) : (
          <div className="row g-3">
            {data.map((p) => (
              <div className="col-12 col-md-6 col-lg-4 pt-1" key={p.id}>
                <PostCard
                  post={p}
                  toAbs={toAbs}
                  onEdit={(post) =>
                    setEditing({
                      ...post,
                      name: post.name ?? post.uploaderName ?? "",
                      email: post.email ?? "",
                      district: post.district ?? "",
                      location: post.location ?? "",
                    })
                  }
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <EditPostModal
        open={!!editing}
        post={editing}
        onClose={() => setEditing(null)}
        CITY_DISTRICTS={CITY_DISTRICTS}
        imageUrlFor={toAbs}
        onSave={async (patch, { removeImageIds = [], removeImageUrls = [] }) => {
          if (!editing) return;
          try {
            await updatePostById(editing.id, patch);

            // Prefer single bulk call; fall back to per-image if not supported
            if (removeImageIds.length || removeImageUrls.length) {
              try {
                await deletePostImagesBulk(editing.id, {
                  ids: removeImageIds,
                  urls: removeImageUrls,
                });
              } catch (innerErr) {
                console.warn("Bulk delete failed, trying individual:", innerErr);
                await Promise.all([
                  ...removeImageIds.map((id) => deletePostImageById(editing.id, id)),
                  ...removeImageUrls.map((url) => deletePostImageByUrl(editing.id, url)),
                ]);
              }
            }

            setEditing(null);
            await load();
          } catch (e) {
            console.error("Update failed:", e);
            alert("Update failed: " + (e?.response?.data?.error || e.message));
          }
        }}
      />
    </>
  );
}
