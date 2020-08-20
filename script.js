const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

//Fetch Posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

//Fetch Photos from another API
async function getPhoto(photo) {
  const res = await fetch(`https://randomuser.me/api`);
  const data = await res.json();
  photo = data.results[0].picture.thumbnail;
  return photo;
}

//Show items in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach(async (post) => {
    const pic = await getPhoto();
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">
          <img class="profile-pic" src="${pic}" alt="user photo" />
        </div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
           ${post.body}
          </p>
        </div>
      </div>
      `;

    postsContainer.appendChild(postEl);
  });
}

//Show loader and fetch more posts

function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 1000);
  }, 300);
}

//Show initial posts

showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
