import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Service from "../src/services/conf";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await Service.getAllBlogs();
        setBlogs(data.data);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-zinc-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          All Blogs
        </h1>

        {loading && (
          <p className="text-white text-center text-lg">Loading blogs...</p>
        )}
        {error && (
          <p className="text-red-500 text-center text-lg">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog?._id}
              to={`/blog-information/${blog?._id}`}
              className="block rounded-xl bg-zinc-800 border border-zinc-700 shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Read more about ${blog?.title}`}
            >
              <img
                src={blog?.image}
                alt={blog?.title}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {blog?.title}
                </h2>
                <p className="text-zinc-300 text-sm mb-3">
                  {blog?.description?.slice(0, 100)}...
                </p>
                <span className="text-blue-400 text-sm font-medium hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {!loading && blogs.length === 0 && !error && (
          <p className="text-center text-zinc-400 mt-8">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
