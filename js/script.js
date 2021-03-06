var app = new Vue (
  {
    el:'.root',
    data: {
      films:[],
      series:[],
      votes:[],
      votesserie:[],
      characters: [],
      charactersserie: [],
      filmTitle:"",
      idfilms: [],
      newFilms:[],
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
          for (var i = 0; i < result.data.results.length; i++) {
            this.votes.push((Math.ceil(this.films[i].vote_average/2)));
            this.idfilms.push(result.data.results[i].id);
          }
        });
    },
      searchseries: function() {
        axios
        .get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: '1e26c6a15aa1b1d7e6be784af83e54ac',
            query: this.filmTitle,
            language:'it-IT'
          }
        })
        .then((result) => {
          this.series = result.data.results;
          for (var i = 0; i < result.data.results.length; i++) {
            this.votesserie.push((Math.ceil(this.series[i].vote_average/2)));
          }
        });
    },
      callfilmseries: function () {
        this.searchfilm();
        this.searchseries();
        // this.searchcharacter();
    },
      setflag: function (film) {
        let flag="";
        if(film.original_language=='en')
        {
          flag="https://lonampio.files.wordpress.com/2014/08/bandiera-inglese.png";
        }else if(film.original_language=='it') {
          flag="https://images.squarespace-cdn.com/content/v1/523f1037e4b00600a82f8a21/1379871564605-ZGERRZDCXL6E34QN1514/ke17ZwdGBToddI8pDm48kHhlTY0to_qtyxq77jLiHTtZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7T-j82ScS_xjTqFYGqFrT72qZ_E0ELtHpOZiWcSG1QwIMeEVreGuQ8F95X5MZTW1Jw/Italy-256.png";
        }else if (film.original_language=='es') {
          flag="https://www.mondosportivo.it/home/wp-content/uploads/2017/06/Flag_of_Spain.png";
        }
        return flag;
    },
      searchcharacter: function(film) {
        axios
        .get(`https://api.themoviedb.org/3/movie/ ${film.id}/credits`, {
          params: {
            api_key: '1e26c6a15aa1b1d7e6be784af83e54ac',
            language:'en-US'
          }
        })
        .then((result) => {
          if (result.data.cast.length <= 5) {
            this.characters = result.data.cast;
          }
          else {
            this.characters = [];
            for (let i = 0; i < 5; i++) {
                this.characters.push(result.data.cast[i]);
              }
            }
          //   this.newFilms = this.films.map(
          //   (element) => {
          //     let char = this.characters;
          //
          //     const newFilmObj = {
          //       ...element,
          //       char
          //     };
          //
          //     return newFilmObj;
          //   }
          // )
        });
      },
      searchcharacterserie: function(serie) {
        axios
        .get(`https://api.themoviedb.org/3/tv/${serie.id}/credits`, {
          params: {
            api_key: '1e26c6a15aa1b1d7e6be784af83e54ac',
            language:'en-US'
          }
        })
        .then((result) => {
          if (result.data.cast.length <= 5) {
            this.charactersserie = result.data.cast;
          }
          else {
            this.charactersserie = [];
            for (let i = 0; i < 5; i++) {
                this.charactersserie.push(result.data.cast[i]);
              }
            }
        });
      }
    }
  }
);
