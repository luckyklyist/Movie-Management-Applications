// const mainMovie = document.querySelector(".main_movie");
const movieMenu=document.querySelector(".main_movie");





const movies = async () => {
    const data = await fetch("http://localhost:3000/movies");
    const movieData=await data.json();


  movieData.forEach(movie => {
    const movieName=document.createElement("div");
    movieName.innerHTML=`${movie.title}`;
    movieMenu.append(movieName);
  });



  };
  
  const addMovies = async () => {
    console.log("running add movies");
    const id=document.querySelector("#id").value;
    const title=document.querySelector("#movieName").value;
    const year=document.querySelector("#Year").value;
    console.log(id,movieName,year)

    // create a obj containing the mathi ko key 
    const obj={
      id,
      title,
      director:"xfcgvh",
      year
    }


    await fetch("http://localhost:3000/movies", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });movieName
  };
  
  document.querySelector("#add").addEventListener("click", addMovies);
  movies();
  
  



  /*
array method

map 
foreach
filter
reduce
some


  */