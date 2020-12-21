var app = new Vue (
  {
    el:'.root',
    data: {
      films:[],
      a:0,
      filmTitle:"",
      numberstar:[],
      numeromancante:5,
      address:"https://image.tmdb.org/t/p/w220_and_h330_face/"
    },
    methods: {
      searchfilm: function() {
      axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '1e26c6a15aa1b1d7e6be784af83e54ac',
          query: this.filmTitle,
          language:'it-IT'
        }
      })
      .then((result) => {
        this.films = result.data.results;
        this.a=result.data.results.length;
        for (var i = 0; i < this.a; i++) {
          this.numberstar.push(this.films[i].vote_average);
        }
        // this.numberstar=Math.ceil(this.films[i].vote_average/2);
        console.log(this.numberstar);
        this.numeromancante-=this.numberstar;
      });
    },
    starFilm: function () {
       this.a = this.films.length;
    }
   }
  }
);
