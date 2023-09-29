import React, { useState, useEffect } from 'react';

const Blog = ({ blogParent }) => {

  const [blog, setBlog] = useState({});

  // [blogParent] ==> Whenever the "blogParent" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (blogParent.body != null)
      setBlog(blogParent.body.blog);
  }, [blogParent]);

  return (
    <></>
  )
}

export default Blog;