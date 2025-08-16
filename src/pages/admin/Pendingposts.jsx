import React, { useEffect, useState } from "react";
import GLightbox from "glightbox";
import { getPendingPosts, acceptPost, deletePost } from "../../utills/postStore.js";
import DashboardHeader from "./DashboardComponents/BackendHeader";
import "glightbox/dist/css/glightbox.min.css";

function Pendingposts() {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [cityFilter, setCityFilter] = useState("");

  const handleCityChange = (city) => setCityFilter(city);

const load = () => {
  const all = getPendingPosts();
  setPendingPosts(cityFilter ? all.filter(p => p.city === cityFilter) : all);
};


  useEffect(() => { load(); }, [cityFilter]);

  useEffect(() => {
    const lb = GLightbox({ selector: ".glightbox" });
    return () => lb.destroy();
  }, [pendingPosts]);

  const handleAccept = (id) => { acceptPost(id); load(); };
  const handleDelete = (id) => { deletePost(id); load(); };

  return (
    <>
      <DashboardHeader
        showCityFilter
        onCityChange={handleCityChange}
      />

      <div className="bg-white p-3 p-md-4 rounded shadow">
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-success text-center">
              <tr>
                <th>#</th>
                <th style={{ minWidth: "260px" }}>Images</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>District</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="submissionTable">
              {pendingPosts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">No pending posts.</td>
                </tr>
              ) : (
                pendingPosts.map((post, index) => (
                  <tr key={post.id}>
                    <td className="text-nowrap">{index + 1}</td>
                    <td>
                      <div className="image-scroll-container">
                        {(post.images || []).map((img, i) => (
                          <a
                            key={i}
                            href={img}
                            className="glightbox"
                            data-type="image"
                            data-gallery={`post-${post.id}`}
                          >
                            <img src={img} alt={`img-${i}`} />
                          </a>
                        ))}
                      </div>
                    </td>
                    <td className="text-break">{post.name}</td>
                    <td className="text-break">{post.email || "-"}</td>
                    <td className="text-nowrap">{post.city}</td>
                    <td className="text-nowrap">{post.district}</td>
                    <td>
                      <a
                        href={`https://maps.google.com?q=${encodeURIComponent(post.location || "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-success btn-sm"
                      >
                        📍 On Map
                      </a>
                    </td>
                    <td className="text-center">
                      <div className="d-grid gap-2 gap-md-1">
                        <button className="btn btn-success btn-sm" onClick={() => handleAccept(post.id)}>
                          Accept
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Pendingposts;
