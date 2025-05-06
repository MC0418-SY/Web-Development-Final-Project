const postForm = document.getElementById("post-form");
const postsContainer = document.getElementById("posts-container");

postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  const mediaInput = document.getElementById("post-media").files[0];

  const post = document.createElement("div");
  post.classList.add("post");

  const postTitle = document.createElement("h3");
  postTitle.textContent = title;

  const postContent = document.createElement("p");
  postContent.textContent = content;

  post.appendChild(postTitle);
  post.appendChild(postContent);

  if (mediaInput) {
    const mediaElement = document.createElement(
      mediaInput.type.startsWith("video") ? "video" : "img"
    );
    mediaElement.src = URL.createObjectURL(mediaInput);
    if (mediaElement.tagName === "VIDEO") mediaElement.controls = true;
    post.appendChild(mediaElement);
  }

  postsContainer.prepend(post);

  postForm.reset();
});