import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzI1YjMyNTFhMzIyMWYxOWNmZmQyY2QyNzc5NDM1ZSIsInN1YiI6IjY1ZTljMmE4MzM5NmI5MDE4Njg0YWU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TIYrrovWv_4jt1AHFpL4amNYduyu33Ka3AVm22n_XL0'
      }
});

export default instance