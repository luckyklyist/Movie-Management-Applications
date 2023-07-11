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
    <button class="btn btn-sm btn-primary update" id="${movie.id}">Update</button>
    <button class="btn btn-sm btn-danger delete" id="${movie.id}">Delete</button>
    </div>
  </div>
</div>
    `;
    movieMenu.append(movieName);
  });
};

// adding movies on json server with post req
const addMovies = async () => {
  const id = document.querySelector("#id").value;
  const title = document.querySelector("#movieName").value;
  const year = document.querySelector("#year").value;
  const director = document.querySelector("#director").value;
  const img_url = document.querySelector("#img_url").value;

  // await fetch("http://localhost:3000/movies", {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ id, title, year, director, img_url }),
  // });


  let xhr = new XMLHttpRequest()
  xhr.open('POST', "http://localhost:3000/movies", true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
  xhr.send(JSON.stringify({ id, title, year, director, img_url }));
  xhr.onload = function () {
    if (xhr.status === 201) {
      movies();
      console.log("Post successfully created!")
    }
  }
};


// updating the movies on json server using the put req
const updateMovie = async (id) => {
  const title = prompt("Name of the movie")
  const year = prompt("Enter release date of the movie")
  const director = prompt("Name of the director of the movie")
  const img_url = prompt("Img of the movie")
  await fetch(`http://localhost:3000/movies/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, title, year, director, img_url }),
  })
};

// deleting the movies on json server using the delete req
const deleteMovies = async (id) => {
  await fetch(`http://localhost:3000/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

// updating the movie from the DOM
const getUpdateData = async (id) => {
  const data = await fetch(`http://localhost:3000/movies/${id}`);
  const movieData = await data.json();
  console.log(movieData.title);
  document.querySelector(".updateMovieName").value = movieData.title
}

// Event listener to make a post req to add the movie
document.querySelector("#add").addEventListener("click", addMovies);

// after the movie call it will start working with movieDelBtn
movies().then(() => {
  console.log(document.querySelectorAll(".main_movie .movie").length);
  const movieDelBtn = document.querySelectorAll(".delete");

  // sending the id of the movie to delete 
  movieDelBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      deleteMovies(this.id)
    })
  })

  //sending the id of the movie to update 
  const movieUpdateBtn = document.querySelectorAll(".update")
  movieUpdateBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log(this.id, "id number");
      // getUpdateData(this.id)
      updateMovie(this.id);
    })
  })
});