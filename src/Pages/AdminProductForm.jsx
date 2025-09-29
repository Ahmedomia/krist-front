import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function AdminProductForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    price: "",
    oldPrice: "",
    colors: "",
    sizes: "",
    image: "",
    image2: "",
    description: "",
    stock: "",
  });
  const [saving, setSaving] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = form.image;
      let image2Url = form.image2;
      if (file1 || file2) {
        const fd = new FormData();
        if (file1) fd.append("image", file1);
        if (file2) fd.append("image2", file2);
        const { data: upload } = await api.post("/admin/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = upload.image || imageUrl;
        image2Url = upload.image2 || image2Url;
      }
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
        stock: Number(form.stock) || 0,
        colors: form.colors ? form.colors.split(",").map((c) => c.trim()) : [],
        sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()) : [],
        image: imageUrl,
        image2: image2Url,
      };
      await api.post("/admin/products", payload);
      navigate("/admin/products");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          className="border p-2"
          required
        />
        <input
          name="brand"
          value={form.brand}
          onChange={onChange}
          placeholder="Brand"
          className="border p-2"
        />
        <input
          name="category"
          value={form.category}
          onChange={onChange}
          placeholder="Category"
          className="border p-2"
        />
        <input
          name="subcategory"
          value={form.subcategory}
          onChange={onChange}
          placeholder="Subcategory"
          className="border p-2"
        />
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="Price"
          type="number"
          className="border p-2"
          required
        />
        <input
          name="oldPrice"
          value={form.oldPrice}
          onChange={onChange}
          placeholder="Old Price"
          type="number"
          className="border p-2"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={onChange}
          placeholder="Stock"
          type="number"
          className="border p-2"
        />
        <input
          name="colors"
          value={form.colors}
          onChange={onChange}
          placeholder="Colors (comma-separated)"
          className="border p-2"
        />
        <input
          name="sizes"
          value={form.sizes}
          onChange={onChange}
          placeholder="Sizes (comma-separated)"
          className="border p-2"
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium">Image</label>
          <label className=" cursor-pointer text-gray-60 hover:text-blue-600 transition">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile1(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          {file1 && (
            <p className="text-sm text-gray-500">Selected: {file1.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Second Image</label>
          <label className="cursor-pointer text-gray-600  hover:text-blue-600 transition">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile2(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          {file2 && (
            <p className="text-sm text-gray-500">Selected: {file2.name}</p>
          )}
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Description"
          className="border p-2 md:col-span-2"
        />
        <div className="md:col-span-2 flex gap-2">
          <button
            className="px-4 py-2 border"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button className="px-4 py-2 border" disabled={saving} type="submit">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductForm;
