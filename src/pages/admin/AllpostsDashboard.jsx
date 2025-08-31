// src/pages/admin/AcceptedPosts.jsx
import React, { useEffect, useMemo, useState } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import DashboardHeader from "./DashboardComponents/BackendHeader";;
import PostCard from "./DashboardComponents/EachAcceptedPost";
import EachEditingAccpetpost from "./DashboardComponents/EachEditingAccpetpost";
import { listPosts, updatePostById, deletePostById  } from "../../api/post";
import {
  deletePostImagesBulk,           // ← preferred
  deletePostImageById,
  deletePostImageByUrl,
} from "../../api/post";
import { imgUrl } from "../../utills/URL";


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith("/") ? `${API_BASE}${u}` : u || "");

const CITY_DISTRICTS = {
  Erbil: ["Soran", "Shaqlawa", "Mergasor", "Koya"],
  Sulaimani: ["Chamchamal", "Tasluja", "Penjwen", "Qaladze"],
  Duhok: ["Akre", "Zakho", "Amadiya", "Simele"],
  Halabja: ["Byara", "Tawella"],
  Kirkuk: ["Daquq", "Tuz Khurmatu"],
};

export default function AcceptedPosts() {
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
      const sorted = (data || []).slice().sort(
        (a, b) =>
          new Date(b.acceptedAt || b.createdAt || 0) -
          new Date(a.acceptedAt || a.createdAt || 0)
      );
      setAll(sorted);
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to load accepted posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [city]);

  // bind lightbox to currently rendered items (depend on data, not all)
  const data = useMemo(() => all.filter((p) => (city ? p.city === city : true)), [all, city]);

  useEffect(() => {
    const lb = GLightbox({ selector: ".glightbox" });
    return () => lb.destroy();
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
  <div className="container-fluid mt-5 pt-4">
        <DashboardHeader
          showCityFilter
          onCityChange={setCity}
        />

        {loading && <div className="alert alert-info">Loading…</div>}
        {err && <div className="alert alert-danger">{err}</div>}

        {data.length === 0 ? (
          <div className="alert alert-light border">No posts match.</div>
        ) : (
          <div className="row g-3">
            {data.map((p) => (
              <div className="col-12 col-md-6 col-lg-4" key={p.id}>
                <PostCard
                  post={p}
                  toAbs={toAbs}
                  onEdit={(post) => setEditing({
                    ...post,
                    name: post.name ?? post.uploaderName ?? "",
                    email: post.email ?? "",
                    district: post.district ?? "",
                    location: post.location ?? "",
                  })}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div> {}

<EachEditingAccpetpost
  open={!!editing}
  post={editing}
  onClose={() => setEditing(null)}
  CITY_DISTRICTS={CITY_DISTRICTS}
    imageUrlFor={imgUrl}      
  onSave={async (patch, { removeImageIds = [], removeImageUrls = [] }) => {
    await updatePostById(editing.id, patch);

    // Prefer one bulk call (fast):
    if (removeImageIds.length || removeImageUrls.length) {
      try {
        await deletePostImagesBulk(editing.id, {
          ids: removeImageIds,
          urls: removeImageUrls,
        });
      } catch {
        // Fallback to one-by-one if bulk not available yet
        await Promise.all([
          ...removeImageIds.map((id) => deletePostImageById(editing.id, id)),
          ...removeImageUrls.map((url) => deletePostImageByUrl(editing.id, url)),
        ]);
      }
    }

    setEditing(null);
    await load();
  }}
/>
    </>
  );
}
