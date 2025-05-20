import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Service from '../src/services/conf.js';

function BlogInfo() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [blogInformation, setBlogInformation] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await Service.getBlogsDetails(id);
        console.log('data:', data);
        setBlogInformation(data);
      } catch (error) {
        console.error('Failed to fetch blog details:', error);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleUpdateCategory = () => {
    navigate(`/update-blog/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      try {
        await Service.DeleteBlog(id); 
        alert('Blog deleted!');
        navigate('/'); 
      } catch (error) {
        console.error('Failed to delete blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  if (!blogInformation) {
    return <p className="text-center text-zinc-400 mt-10">Loading blog details...</p>;
  }

  return (
    <div className="flex justify-center px-4 py-10 bg-zinc-900 min-h-screen">
      <div className="bg-zinc-800 shadow-xl rounded-2xl max-w-xl w-full p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-white mb-6">{blogInformation.name}</h1>
        <img
          src={blogInformation.image}
          alt="Blog"
          className="w-full max-h-96 object-cover rounded-lg mb-6"
        />
        <p className="text-zinc-200 mb-6 whitespace-pre-line">{blogInformation.description}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleUpdateCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Update Blog
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogInfo;
