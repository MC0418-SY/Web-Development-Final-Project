function loadPublishedPosts() {
    const feed = document.getElementById("postsFeed");
    feed.innerHTML = "";
    let posts = JSON.parse(localStorage.getItem("publishedPosts")) || [];

    // Get filter values from the filter bar
    const recency = document.getElementById("recency-filter")?.value || "newest";
    const featuredOnly = document.getElementById("featured-filter")?.checked || false;
    const category = document.getElementById("category-filter")?.value || "all";

    // Filter out posts if "Featured Only" is checked
    if (featuredOnly) {
      posts = posts.filter(post => post.featured); // assumes each post has a boolean "featured" property
    }

    // Filter posts by category if a specific category is selected
    if (category !== "all") {
      posts = posts.filter(post => post.category === category); // assumes each post has a "category" property
    }

    // Sort posts by recency (newest first or oldest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return recency === "newest" ? dateB - dateA : dateA - dateB;
    });

    posts.forEach((post, idx) => {
      const article = document.createElement("article");
      article.className = "post-card";

      const title = document.createElement("h2");
      title.className = "post-title";
      title.textContent = post.title;

      const content = document.createElement("div");
      content.className = "post-content";
      content.innerHTML = post.content;

      // Create the meta container
      const meta = document.createElement("div");
      meta.className = "post-meta";
      meta.innerHTML = `<span>${post.timestamp}</span>`;

      // Create Edit button
      const editBtn = document.createElement("button");
      editBtn.className = "edit-post";
      editBtn.textContent = "✎"; // Use a pencil icon
      editBtn.title = "Edit this post";
      editBtn.addEventListener("click", function () {
        const newTitle = prompt("Edit the post title:", post.title);
        if (newTitle === null) return; // user cancelled
        const newContent = prompt("Edit the post content:", post.content);
        if (newContent === null) return; // user cancelled
        posts[idx].title = newTitle;
        posts[idx].content = newContent;
        localStorage.setItem("publishedPosts", JSON.stringify(posts));
        loadPublishedPosts();
      });

      // Create Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-published";
      deleteBtn.textContent = "🗑";
      deleteBtn.title = "Delete this post";
      deleteBtn.addEventListener("click", function () {
        if (confirm("Delete this post?")) {
          posts.splice(idx, 1);
          localStorage.setItem("publishedPosts", JSON.stringify(posts));
          loadPublishedPosts();
        }
      });

      // Create a container for both buttons and append them side by side
      const actionsContainer = document.createElement("div");
      actionsContainer.className = "post-actions";
      actionsContainer.appendChild(editBtn);
      actionsContainer.appendChild(deleteBtn);

      // Append the actions container to meta, after the timestamp span
      meta.appendChild(actionsContainer);

      // Append meta to the article
      article.appendChild(title);
      article.appendChild(content);
      article.appendChild(meta);
      feed.appendChild(article);
    });
  }

  // Add event listeners to update posts when filters change
  document.addEventListener("DOMContentLoaded", () => {
    loadPublishedPosts();

    const recencyFilter = document.getElementById("recency-filter");
    const featuredFilter = document.getElementById("featured-filter");
    const categoryFilter = document.getElementById("category-filter");

    if (recencyFilter) recencyFilter.addEventListener("change", loadPublishedPosts);
    if (featuredFilter) featuredFilter.addEventListener("change", loadPublishedPosts);
    if (categoryFilter) categoryFilter.addEventListener("change", loadPublishedPosts);

    // New Post button redirect remains unchanged:
    const newPostBtn = document.querySelector(".new-post-btn");
    if (newPostBtn) {
      newPostBtn.addEventListener("click", () => {
        window.location.href = "post.html";
      });
    }
  });