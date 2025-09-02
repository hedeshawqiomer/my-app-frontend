import React from "react";
function ImageUploader({ images, setImages, warning, setWarning }) {
  const MAX_IMAGES = 8;
  const MAX_SIZE_MB = 100;

  const handleImageChange = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;

    const maxBytes = MAX_SIZE_MB * 1024 * 1024;
    const valid = [];
    const tooBig = [];

    for (const f of picked) {
      if (f.size <= maxBytes) valid.push(f);
      else tooBig.push(f);
    }

    // Merge with previous and cap
    setImages((prev) => {
      const merged = [...prev, ...valid].slice(0, MAX_IMAGES);
      // Compose a friendly message if we dropped anything
      const droppedForSize = tooBig.length;
      const droppedForCap = prev.length + valid.length > MAX_IMAGES
        ? prev.length + valid.length - MAX_IMAGES
        : 0;

      const messages = [];
      if (droppedForSize) messages.push(`${droppedForSize} file(s) > ${MAX_SIZE_MB}MB were skipped`);
      if (droppedForCap)  messages.push(`Only ${MAX_IMAGES} images allowed; extras were ignored`);
      setWarning(messages.join(". "));

      return merged;
    });

    // ✅ allow picking the same files again and re-trigger onChange
    e.target.value = null;
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setWarning("");
  };

  return (
    <div className="mb-3">
      <label className="form-label">Upload Images</label>
      <input
        className="form-control"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      {/* Max size {MAX_SIZE_MB}MB each. Selected: {images.length}/{MAX_IMAGES}. Min 4 images. */}
      <small className="text-muted d-block mt-1">
        Select at least 4 images. 
      </small>

      <div className="d-flex flex-wrap gap-3 mt-3">
        {images.map((file, i) => (
          <div key={i} className="image-wrapper position-relative">
            <img src={URL.createObjectURL(file)} alt={`Preview ${i}`} />
            <button type="button" className="remove-btn" onClick={() => removeImage(i)}>×</button>
          </div>
        ))}
      </div>

      {warning && <div className="text-danger mt-2">{warning}</div>}
    </div>
  );
}


export default ImageUploader;


    // You can select multiple images. Max {MAX_IMAGES}, each under {MAX_SIZE_MB}MB.
