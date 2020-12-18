var app = new Vue (
  {
    el:'.root',
    data: {
      films:[],
      filmTitle:"",
      address:"https://image.tmdb.org/t/p/w220_and_h330_face/"
    },
    methods: {
      searchfilm: function() {
      axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '1e26c6a15aa1b1d7e6be784af83e54ac',
          query: this.filmTitle
        }
      })
      .then((result) => {
        this.films = result.data.results;
        console.log(this.films[0].id);
      });
      console.log(this.filmTitle);
    }
   }
  }
);
