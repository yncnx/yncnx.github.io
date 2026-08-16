var posts=["posts/4a17b156/","posts/91851bc6/","posts/d04fe4f1/","posts/b8d26614/","posts/c71308be/","posts/a839bc6b/","posts/9a435a5a/","posts/a1c374f3/","posts/d2ab7f2a/","posts/bf2f1bbe/","posts/ca093fb9/","posts/d224e079/","posts/588ed204/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };