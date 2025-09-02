import React from "react";
function ImageUploader({ images, setImages, warning, setWarning }) {
  const MAX_IMAGES = 8;
  const MAX_SIZE_MB = 1000;
  const SUPPORTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

  const handleImageChange = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;

    const maxBytes = MAX_SIZE_MB * 1024 * 1024;
    const valid = [];
    const tooBig = [];
    const unsupported = [];

    for (const f of picked) {
      if (!SUPPORTED_TYPES.has(f.type)) {
        unsupported.push(f);
        continue;
      }
      if (f.size <= maxBytes) valid.push(f);
      else tooBig.push(f);
    }

    setImages(prev => {
      const withPreviews = valid.map(f => ({ file: f, previewUrl: URL.createObjectURL(f) }));
      const merged = [...prev, ...withPreviews].slice(0, MAX_IMAGES);

      const droppedForSize = tooBig.length;
      const droppedForCap = prev.length + withPreviews.length > MAX_IMAGES
        ? prev.length + withPreviews.length - MAX_IMAGES
        : 0;

      const msgs = [];
      if (unsupported.length) msgs.push(`${unsupported.length} file(s) skipped (unsupported format). Use JPG/PNG.`);
      if (droppedForSize) msgs.push(`${droppedForSize} file(s) > ${MAX_SIZE_MB}MB were skipped`);
      if (droppedForCap)  msgs.push(`Only ${MAX_IMAGES} images allowed; extras were ignored`);
      setWarning(msgs.join(". "));

      return merged;
    });

    e.target.value = null;
  };

  const removeImage = (index) => {
    setImages(prev => {
      const item = prev[index];
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
    setWarning("");
  };

  React.useEffect(() => {
    return () => {
      // Revoke all previews on unmount
      images.forEach(item => item?.previewUrl && URL.revokeObjectURL(item.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-3">
      <label className="form-label">Upload Images</label>
      <input
        className="form-control"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleImageChange}
      />
      <small className="text-muted d-block mt-1">
        Use JPG/PNG (WebP ok). Select at least 4 images.
      </small>

      <div className="d-flex flex-wrap gap-3 mt-3">
        {images.map((item, i) => (
          <div key={i} className="image-wrapper position-relative">
            <img src={item.previewUrl} alt={`Preview ${i}`} loading="lazy" />
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
