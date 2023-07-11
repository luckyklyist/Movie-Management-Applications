const movieMenu = document.querySelector(".main_movie");

// getting movies to show in the page
const movies = async () => {
  const data = await fetch("http://localhost:3000/movies");
  const movieData = await data.json();
  movieData.forEach(movie => {
    const movieName = document.createElement("div");
    movieName.className = "movie m-2 col-md-3 p-3 d-flex align-items-center justify-content-center";

    movieName.innerHTML =
      `
    <div class="card" style="width: 18rem;">
  <img src="${movie.img_url}" class="card-img-top" height="300" alt="...">
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text fst-italic">Release Date:${movie.year}</p>
    <p class="card-text font-small">${movie.director}</p>
    <div class"movie_btn flex justify-content-around">
    <a href="#" class="btn btn-sm btn-primary">Update</a>
    <a href="#" class="btn btn-sm btn-danger">Delete</a>
    </div>
  </div>
</div>
    `;
    movieMenu.append(movieName);
  });
};

// adding movies on json server with post req
const addMovies = async () => {
  console.log("running add movies");
  const id = document.querySelector("#id").value;
  const title = document.querySelector("#movieName").value;
  const year = document.querySelector("#Year").value;
  console.log(id, movieName, year)

  // create a obj containing the mathi ko key 
  const obj = {
    id,
    title,
    director: "xfcgvh",
    year
  }


  await fetch("http://localhost:3000/movies", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
};

const updateMovie = async () => {
  console.log("updateMovie")
  const name = prompt("Enter the ID you want to update:")
  const title = prompt("Enter the title of movie:")
  const obj = {
    id: name,
    title
  }
  await fetch(`http://localhost:3000/movies/${name}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
};

const deleteMovies = async (id) => {
  await fetch(`http://localhost:3000/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
document.querySelector("#update").addEventListener("click", updateMovie);
document.querySelector("#add").addEventListener("click", addMovies);


movies().then(() => {
  console.log(document.querySelectorAll(".main_movie .movie").length);

  const movieDelBtn = document.querySelectorAll(".main_movie .movie button");

  movieDelBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      deleteMovies(this.id)
    })
  })



});