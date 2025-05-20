import React from "react";
import { AddUpdateBlog } from "../component";

function AddBlog() {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <AddUpdateBlog isUpdateMode={false} />
    </div>
  );
}

export default AddBlog;
