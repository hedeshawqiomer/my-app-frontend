import React, { useEffect, useState, useRef } from "react";
import "glightbox/dist/css/glightbox.min.css";
import { listPosts, acceptPost, deletePostById } from "../../api/post"; // fixed module
import PendingPostRow from "./DashboardComponents/EachPenddingpost";         // unified name
import DashboardHeader from "./DashboardComponents/BackendHeader";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith("/") ? `${API_BASE}${u}` : u || "");

function Pendingposts() {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const lbRef = useRef(null);

  // (Re)initialize GLightbox whenever rows change
  useEffect(() => {
    (async () => {
      // destroy old instance
      if (lbRef.current) {
        try { lbRef.current.destroy(); } catch {
            //
        }
        lbRef.current = null;
      }
      // only init if anchors are present
      if (!document.querySelector(".glightbox")) return;
      const { default: GLightbox } = await import("glightbox");
      lbRef.current = GLightbox({ selector: ".glightbox", loop: true });
    })();

    return () => {
      if (lbRef.current) {
        try { lbRef.current.destroy(); } catch {
            //
        }
        lbRef.current = null;
      }
    };
  }, [pendingPosts]);

  const load = async () => {
    try {
      setLoading(true);
      setErr("");
      const data = await listPosts({ status: "pending", city: cityFilter || undefined });
      setPendingPosts(data || []);
    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.error || "Failed to load pending posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [cityFilter]);

  const onAccept = async (id) => { await acceptPost(id); await load(); };
  const onDelete = async (id) => { await deletePostById(id); await load(); };

  return (
    <>
      <div className="container-fluid mt-1 pt-2">
        <DashboardHeader showCityFilter onCityChange={setCityFilter} />
      </div>

      <div className="bg-white pt-3 pe-3 ps-3 p-md-4 rounded shadow">
        {loading && <div className="alert alert-info mb-3">Loading…</div>}
        {err && <div className="alert alert-danger mb-3">{err}</div>}

        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-success text-center">
              <tr>
                <th>#</th>
                <th style={{ minWidth: 260 }}>Images</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>District</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingPosts?.length ? (
                pendingPosts.map((post, idx) => (
                  <PendingPostRow
                    key={post.id}
                    index={idx}
                    post={post}
                    toAbs={toAbs}
                    onAccept={() => onAccept(post.id)}
                    onDelete={() => onDelete(post.id)}
                  />
                ))
              ) : (
                !loading && !err && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">
                      No pending posts.
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Pendingposts;
