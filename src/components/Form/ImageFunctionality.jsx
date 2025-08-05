import React from "react";

function ImageUploader({ images, setImages, warning, setWarning }) {
  const MAX_IMAGES = 8;
  const MAX_SIZE_MB = 5;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(file => file.size < MAX_SIZE_MB * 1024 * 1024);

    if (validFiles.length !== files.length) {
      setWarning(`Some files were too large. Max allowed is ${MAX_SIZE_MB}MB.`);
    } else {
      setWarning("");
    }

    setImages((prev) => {
      const combined = [...prev, ...validFiles];
      if (combined.length > MAX_IMAGES) {
        setWarning(`Only ${MAX_IMAGES} images are allowed.`);
        return combined.slice(0, MAX_IMAGES);
      }
      return combined;
    });
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setWarning("");
  };

  return (
    <div className="mb-3">
      <label htmlFor="image" className="form-label">Upload Images</label>
      <input
        className="form-control"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
        key={images.length} // to reset input
      />
      <small className="text-muted">
        You can select multiple images. Max {MAX_IMAGES}, each under {MAX_SIZE_MB}MB.
      </small>

      <div className="d-flex flex-wrap gap-3 mt-3">
        {images.map((img, i) => (
          <div key={i} className="image-wrapper position-relative">
            <img src={URL.createObjectURL(img)} alt={`Preview ${i}`} />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeImage(i)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {warning && <div className="text-danger mt-2">{warning}</div>}
    </div>
  );
}

export default ImageUploader;
