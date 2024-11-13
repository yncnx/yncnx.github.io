var posts=["posts/91851bc6/","posts/c71308be/","posts/d04fe4f1/","posts/b8d26614/","posts/588ed204/","posts/9a435a5a/","posts/a1c374f3/","posts/bf2f1bbe/","posts/ca093fb9/","posts/d224e079/","posts/a839bc6b/","posts/d2ab7f2a/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };