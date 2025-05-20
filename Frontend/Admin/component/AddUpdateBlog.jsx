import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../src/services/conf";

const BlogForm = ({ isUpdateMode = false, blogData = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (isUpdateMode && blogData) {
      setValue("name", blogData.name || "");
      setValue("description", blogData.description || "");
      setPreviewImage(blogData.image || null);
    }
  }, [isUpdateMode, blogData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (isUpdateMode) {
        await Service.updateBlog(data, id);
      } else {
        await Service.addBlog(data);
      }

      navigate("/");
    } catch (err) {
      console.error("Error saving blog:", err.response?.data || err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-zinc-800 p-6 sm:p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          {isUpdateMode ? "Update Blog" : "Add New Blog"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-5">
          <div>
            <label className="block text-white mb-2 text-sm sm:text-base">Title</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-white mb-2 text-sm sm:text-base">Description</label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              className="w-full p-3 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog description"
            ></textarea>
          </div>

          <div>
            <label className="block text-white mb-2 text-sm sm:text-base">Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="h-40 w-full object-cover rounded-lg shadow-md"
            />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition duration-200"
          >
            {isUpdateMode ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
