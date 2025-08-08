import React, { useEffect, useState } from "react";
import GLightbox from "glightbox";
import { getPosts, acceptPost, deletePost } from "../../utills/postStore.js";

function Pendingposts() {
  const [pendingPosts, setPendingPosts] = useState([]);

  useEffect(() => {
    const lightbox = GLightbox({ selector: ".glightbox" });

    // Fetch and set pending posts
    const loadPosts = () => {
      const allPosts = getPosts();
      setPendingPosts(allPosts.filter((p) => p.status === "pending"));
    };
    loadPosts();

    // Cleanup
    return () => lightbox.destroy();
  }, []);

  const handleAccept = (id) => {
    acceptPost(id);
    setPendingPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDelete = (id) => {
    deletePost(id);
    setPendingPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="table-responsive bg-white p-4 rounded shadow">
      <table className="table table-bordered align-middle">
        <thead className="table-success text-center">
          <tr>
            <th>#</th>
            <th style={{ minWidth: "250px" }}>Images</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>District</th>
            <th>Location</th>
   
          </tr>
        </thead>
        <tbody id="submissionTable">
          {pendingPosts.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center text-muted">No pending posts.</td>
            </tr>
          ) : (
            pendingPosts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td className="ps-3 justify-content-center">
                  <div className="image-scroll-container">
                    {post.images.map((img, i) => (
                      <a
                        key={i}
                        href={img}
                        className="glightbox"
                        data-gallery={`post-${post.id}`}
                      >
                        <img src={img} alt={`img-${i}`} />
                      </a>
                    ))}
                  </div>
                </td>
                <td>{post.name}</td>
                <td>{post.email}</td>
                <td>{post.city}</td>
                <td>{post.district}</td>
                <td>
<a
  href={`https://maps.google.com?q=${encodeURIComponent(post.location)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-outline-success btn-sm "
>
  📍 On Map
</a>

                </td>
                <td className="text-center">
                  <div className="d-flex flex-column gap-2">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handleAccept(post.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDelete(post.id)}
                    >
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
  );
}

export default Pendingposts;
