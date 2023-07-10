// const mainMovie = document.querySelector(".main_movie");
const movieMenu = document.querySelector(".main_movie");
const movies = async () => {
  const data = await fetch("http://localhost:3000/movies");
  const movieData = await data.json();
  movieData.forEach(movie => {
    const movieName = document.createElement("div");
    movieName.innerHTML = `${movie.title} : ${movie.id}`;
    movieMenu.append(movieName);
  });
};
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
    id:name,
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

const deleteMovies = async () => {
  const wish = prompt("Enter the Id of the movie you want to remove:")
  await fetch(`http://localhost:3000/movies/${wish}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
document.querySelector("#update").addEventListener("click", updateMovie);
document.querySelector("#add").addEventListener("click", addMovies);
document.querySelector("#del").addEventListener("click", deleteMovies);
movies();
/*
array method

map 
foreach
filter
reduce
some


*/