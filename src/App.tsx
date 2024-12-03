import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
interface MoviesApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Movie {
  adult: boolean;
  backdrop: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const apiKey = "cc14d62b76a205387bd8b77c651a5e4a";

const App = () => {
  const [year, setYear] = useState("2022");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<MoviesApiResponse[]>([]);
  const [page, setPage] = useState<number>(1);

  const youtubeUrl = "https://www.youtube.com/results?search_query= ";
  const urlPoster = "https://image.tmdb.org/t/p/w500/";

  const fetchMovies = async (selectedYear: string, selectedPage: number) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&year=${selectedYear}&page=${selectedPage}`;
    try {
      const res = await axios.get(url);
      setMovies(res.data.results);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const handleYearChang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectYear = event.target.value;
    setYear(selectYear);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    fetchMovies(year, page);
  }, [page, year]);


  return (
    <div className="m-auto  ">
      <nav className="navbar bg-base-100 m-auto px-20 shadow-md">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold">Movie APP</a>
        </div>
        <select
          name=""
          id="year"
          className="select select-bordered w-24 font-semibold"
          onChange={handleYearChang}
          value={year}
        >
          {[...Array(200).keys()].map((index) => {
            const yearValue = 2024 - index;
            return (
              <option
                key={yearValue}
                value={yearValue.toString()}
                className="bg-base-100 rounded-t-none p-2 "
              >
                {yearValue}
              </option>
            );
          })}
        </select>
      </nav>

      <div className="px-20 py-10">
        <div
          className=" grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10"
          id=""
        >
          {movies ? (
            movies.map((item, i) => (
              <a
                key={i}
                href={`${youtubeUrl}${item.title} full movie พากย์ไทย`}
              >
                <div className="card bg-base-100 shadow-xl">
                  <figure>
                    <img
                      src={`${urlPoster}${item.poster_path}`}
                      alt={item.title}
                      className="relative"
                    />
                    <div className="absolute top-2 left-2 text-yellow-400 px-2 py-1 rounded-lg bg-black shadow-lg font-bold text-sm ">
                      {item.vote_average.toFixed(1)}
                    </div>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title line-clamp-1">{item.title}</h2>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      <div className="">
        <Pagination totalPages={10} onPagesChange={handlePageChange} page={page} setPage={setPage}/> 
      </div>
      </div>
    </div>
  );
};

export default App;
