import React, { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";

const PostForm = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      toast.error("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/posts/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Post updated");
      } else {
        await axios.post("/posts", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Post created");
      }
      setForm({ title: "", body: "" });
      setEditId(null);
      fetchPosts();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, body: post.body });
    setEditId(post._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Post deleted");
      fetchPosts();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">
        {editId ? "Edit Post" : "Create Post"}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="input"
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Post"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Your Posts</h2>
        {posts.map((post) => (
          <div key={post._id} className="border p-4 mb-3 rounded">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.body}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-600 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostForm;
