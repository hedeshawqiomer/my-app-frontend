import React from "react";

function Pendingposts(){
return (
        <div className="table-responsive bg-white p-4 rounded shadow">
          <table className="table table-bordered align-middle">
            <thead className="table-success text-center">
              <tr>
                <th>#</th>
                <th style={{ minWidth: "250px" }}>Images</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>District</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="submissionTable">
              <tr>
                <td>1</td>
                <td>
                  <div className="image-scroll-container">
                    <a href="../pictures/1.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/1.jpg" alt="img1" />
                    </a>
                    <a href="../pictures/2.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/2.jpg" alt="img2" />
                    </a>
                    <a href="../pictures/3.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/3.jpg" alt="img3" />
                    </a>
                    <a href="../pictures/4.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/4.jpg" alt="img4" />
                    </a>
                    <a href="../pictures/5.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/5.jpg" alt="img5" />
                    </a>
                    <a href="../pictures/6.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/6.jpg" alt="img6" />
                    </a>
                  </div>
                </td>
                <td>Ali Hama</td>
                <td>ali@example.com</td>
                <td>0750 123 4567</td>
                <td>Sulaimani</td>
                <td>Bakhtiari</td>
                <td>
                  <a
                    href="https://maps.google.com?q=36.1911,44.0099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-success btn-sm ms-3"
                  >
                    📍 On Map
                  </a>
                </td>
                <td className="text-center">
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-success w-100">Accept</button>
                    <button className="btn btn-danger w-100">Delete</button>
                  </div>
                </td>
              </tr>
                            <tr>
                <td>1</td>
                <td>
                  <div className="image-scroll-container">
                    <a href="../pictures/1.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/1.jpg" alt="img1" />
                    </a>
                    <a href="../pictures/2.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/2.jpg" alt="img2" />
                    </a>
                    <a href="../pictures/3.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/3.jpg" alt="img3" />
                    </a>
                    <a href="../pictures/4.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/4.jpg" alt="img4" />
                    </a>
                    <a href="../pictures/5.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/5.jpg" alt="img5" />
                    </a>
                    <a href="../pictures/6.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/6.jpg" alt="img6" />
                    </a>
                  </div>
                </td>
                <td>Ali Hama</td>
                <td>ali@example.com</td>
                <td>0750 123 4567</td>
                <td>Duhok</td>
                <td>Bakhtiari</td>
                <td>
                  <a
                    href="https://maps.google.com?q=36.1911,44.0099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-success btn-sm ms-3"
                  >
                    📍 On Map
                  </a>
                </td>
                <td className="text-center">
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-success w-100">Accept</button>
                    <button className="btn btn-danger w-100">Delete</button>
                  </div>
                </td>
              </tr>
                            <tr>
                <td>1</td>
                <td>
                  <div className="image-scroll-container">
                    <a href="../pictures/1.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/1.jpg" alt="img1" />
                    </a>
                    <a href="../pictures/2.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/2.jpg" alt="img2" />
                    </a>
                    <a href="../pictures/3.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/3.jpg" alt="img3" />
                    </a>
                    <a href="../pictures/4.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/4.jpg" alt="img4" />
                    </a>
                    <a href="../pictures/5.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/5.jpg" alt="img5" />
                    </a>
                    <a href="../pictures/6.jpg" className="glightbox" data-gallery="post1">
                      <img src="../pictures/6.jpg" alt="img6" />
                    </a>
                  </div>
                </td>
                <td>Ali Hama</td>
                <td>ali@example.com</td>
                <td>0750 123 4567</td>
                <td>Erbil</td>
                <td>Bakhtiari</td>
                <td>
                  <a
                    href="https://maps.google.com?q=36.1911,44.0099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-success btn-sm ms-3"
                  >
                    📍 On Map
                  </a>
                </td>
                <td className="text-center">
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-success w-100">Accept</button>
                    <button className="btn btn-danger w-100">Delete</button>
                  </div>
                </td>
              </tr>
              {/* Add more rows dynamically if needed */}
            </tbody>
          </table>
        </div>
)

}
export default Pendingposts