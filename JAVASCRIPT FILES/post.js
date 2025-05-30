// Text editor
document.getElementById("bold").addEventListener("click", () => {
  document.execCommand("bold", false, null);
});

document.getElementById("italic").addEventListener("click", () => {
  document.execCommand("italic", false, null);
});

document.getElementById("underline").addEventListener("click", () => {
  document.execCommand("underline", false, null);
});

document.getElementById("bullet").addEventListener("click", () => {
  document.execCommand("insertUnorderedList", false, null);
});

document.getElementById("indent").addEventListener("click", () => {
  document.execCommand("indent", false, null);
});

document.getElementById("outdent").addEventListener("click", () => {
  document.execCommand("outdent", false, null);
});

// Delete contents
document.getElementById("delete-post").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete the current content?") == true) {
    document.querySelector(".content").innerHTML = "";
    document.getElementById("postTitle").value = "";
    document.getElementById("postTags").value = "";
    document.getElementById("tagsList").innerHTML = "";
  }
});

// Attach images
document.getElementById("attach-img").addEventListener("click", () => {
  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/jpeg,image/png,image/gif";

  fileInput.onchange = (event) => {
    let file = event.target.files[0];
    if (file && file.size <= 50 * 1024 * 1024) {
      let reader = new FileReader();
      reader.onload = (e) => {
        document.execCommand("insertImage", false, e.target.result);
        document.querySelectorAll(".content img").forEach((img) => {
          img.style.maxWidth = "45%";
          img.style.height = "auto";
          img.style.display = "inline-block";
          img.style.margin = "5px";
          img.style.verticalAlign = "top";
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("File is too large or invalid format.");
    }
  };

  fileInput.click();
});

// Change Text Size
document.getElementById("textSize").addEventListener("change", function () {
  document.execCommand("formatBlock", false, this.value);
});

// Handle Hashtags
let tags = [];
const tagsInput = document.getElementById("postTags");
const tagsList = document.getElementById("tagsList");

function renderTags() {
  tagsList.innerHTML = "";
  tags.forEach((tag, index) => {
    const tagEl = document.createElement("span");
    tagEl.className = "tag";
    tagEl.textContent = tag;
    const removeBtn = document.createElement("span");
    removeBtn.className = "tag-remove";
    removeBtn.textContent = "×";
    removeBtn.onclick = () => {
      tags.splice(index, 1);
      renderTags();
      tagsInput.focus();
    };
    tagEl.appendChild(removeBtn);
    tagsList.appendChild(tagEl);
  });
}

tagsInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  if (value.includes(" ") || value.includes(",")) {
    const newTags = value.split(/[\s,]+/).filter(tag => tag.startsWith("#") && tag.length > 1);
    newTags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    e.target.value = "";
    renderTags();
  }
});

tagsInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.value.trim()) {
    const tag = e.target.value.trim();
    if (tag.startsWith("#") && tag.length > 1 && !tags.includes(tag)) {
      tags.push(tag);
      e.target.value = "";
      renderTags();
    }
  }
});

// Save drafts
document.getElementById("saveDraftBtn").addEventListener("click", function () {
  let titleElement = document.getElementById("postTitle");
  let contentElement = document.querySelector(".content");
  let titleText = titleElement.value.trim();
  let contentText = contentElement.innerHTML.trim();

  if (!titleText && !contentText && !tags.length) {
    alert("Cannot save an empty draft.");
    return;
  }

  let drafts = JSON.parse(localStorage.getItem("drafts")) || [];
  let newDraft = {
    title: titleText || "Untitled",
    content: contentText,
    tags: tags,
    timestamp: new Date().toLocaleString()
  };

  drafts.push(newDraft);
  localStorage.setItem("drafts", JSON.stringify(drafts));
  alert("Draft saved!");
});

// Show Drafts
document.getElementById("draftsBtn").addEventListener("click", function () {
  showDraftsPanel();
});

// Function to show drafts panel
function showDraftsPanel() {
  document.getElementById("draftsPanel").style.display = "block";
  let draftsList = document.getElementById("draftsList");
  draftsList.innerHTML = "";

  let savedDrafts = JSON.parse(localStorage.getItem("drafts")) || [];

  if (savedDrafts.length === 0) {
    draftsList.innerHTML = "<li>No drafts available.</li>";
  } else {
    savedDrafts.forEach((draft, index) => {
      let li = document.createElement("li");
      li.className = "draft-item";

      let textDiv = document.createElement("div");
      textDiv.className = "draft-text";
      let titleSpan = document.createElement("span");
      titleSpan.className = "draft-title";
      titleSpan.textContent = draft.title;
      let metaSpan = document.createElement("span");
      metaSpan.className = "draft-meta";
      metaSpan.textContent = draft.timestamp;
      textDiv.appendChild(titleSpan);
      textDiv.appendChild(metaSpan);

      let actionsDiv = document.createElement("div");
      actionsDiv.className = "draft-actions";
      let openBtn = document.createElement("button");
      openBtn.className = "open-draft";
      openBtn.textContent = "📝";
      openBtn.title = "Load Draft";
      openBtn.addEventListener("click", () => {
        document.getElementById("draftsPanel").style.display = "none";
        document.getElementById("postTitle").value = draft.title;
        document.querySelector(".content").innerHTML = draft.content;
        tags = draft.tags || [];
        renderTags();
        document.querySelectorAll(".content img").forEach((img) => {
          img.style.maxWidth = "45%";
          img.style.height = "auto";
          img.style.display = "inline-block";
          img.style.margin = "5px";
          img.style.verticalAlign = "top";
        });
      });

      let deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-draft";
      deleteBtn.textContent = "🗑";
      deleteBtn.title = "Delete this draft";
      deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this draft?") == true) {
          savedDrafts.splice(index, 1);
          localStorage.setItem("drafts", JSON.stringify(savedDrafts));
          showDraftsPanel();
        }
      });

      actionsDiv.appendChild(openBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(textDiv);
      li.appendChild(actionsDiv);
      draftsList.appendChild(li);
    });
  }
}

// Close drafts panel
document.getElementById("closeDrafts").addEventListener("click", () => {
  document.getElementById("draftsPanel").style.display = "none";
});

// Publish post
document.getElementById("publishBtn").addEventListener("click", function () {
  let titleText = document.getElementById("postTitle").value.trim();
  let contentText = document.querySelector(".content").innerHTML.trim();

  if (!titleText) {
    alert("A title is required to publish the post.");
    return;
  }
  if (!contentText) {
    alert("Content cannot be empty when publishing.");
    return;
  }

  let publishedPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];
  let newPost = {
    title: titleText,
    content: contentText,
    tags: tags,
    timestamp: new Date().toLocaleString()
  };

  publishedPosts.push(newPost);
  localStorage.setItem("publishedPosts", JSON.stringify(publishedPosts));
  alert("Post published successfully!");
  document.getElementById("postTitle").value = "";
  document.querySelector(".content").innerHTML = "";
  tags = [];
  renderTags();
  window.location.href = "dashboard.html"; // Redirect to dashboard
});