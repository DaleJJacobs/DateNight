$(document).ready(function () {
  // const movieKey = "0f7f62d0583a0d9508daf930c4335a1f"

  // const restKey = "666f168d388a5c838dfea43abdd5d6a4"

  // const yelpKey = "8e74JR0lRhurKR3BR0IjLkRghG7LDl5g79BsDgLPudborA7HM55Txehiu07i5vGoELrTv3Pae39bDZC24BU0L1dacn5GF45VO8SZpHDrRWwj4_fxE0hk8jccPGcTYHYx"

  var searchTitle;

  $("#submit").on("click", function () {
    console.log("inside submit");

    searchTitle = $("input").val();
    console.log($("input").val());

    let titleSearch = $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=0f7f62d0583a0d9508daf930c4335a1f&language=en-US&query=${searchTitle}&include_adult=false`,

      method: "GET",
    }).then(function (moviename) {
      console.log("movie name", moviename);
      for (var i = 0; i < moviename.results.length; i++) {
        console.log(moviename.results[i]);
        var img = document.createElement("img");
        var posterPath = moviename.results[i].poster_path;
        console.log("this is posterPath:", posterPath);

        img.setAttribute("id", `poster-${i + 1}`);
        img.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w185/${posterPath}`
        );
        document.getElementById("poster").appendChild(img);
      }
      console.log("calling movie api");
    });
  });
  var searchName;

  $("#actor").on("click", function () {
    console.log("inside actor");

    searchName = $("#name").val();
    console.log($("#name").val());

    let actorSearch = $.ajax({
      url: `https://api.themoviedb.org/3/search/person?api_key=0f7f62d0583a0d9508daf930c4335a1f&language=en-US&query=${searchName}&page=1&include_adult=false`,

      method: "GET",
    }).then(function (actorname) {
      console.log(actorname);
      for (var i = 0; i < actorname.results.length; i++) {
        console.log(actorname.results[i]);
        var actorimg = document.createElement("img");
        var profilePath = actorname.results[i].profile_path;
        var actorID = actorname.results[i].id;
        console.log("This is the actor's ID:", actorID);
        actorimg.setAttribute("id", `${actorID}`);
        actorimg.setAttribute("class", "actors");
        actorimg.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w185/${profilePath}`
        );
        document.getElementById("poster").appendChild(actorimg);
      }

      $(".actors").on(
        "click",
        function () {
          var headshotID = $(".actors").attr("id");
          console.log("actor headshot clicked", headshotID);
          $("#poster").empty();
          // gettingActorMovies(headshotID);
          let actorMovieSearch = $.ajax({
            url: `https://api.themoviedb.org/3/person/${headshotID}/movie_credits?api_key=0f7f62d0583a0d9508daf930c4335a1f&language=en-US`,

            method: "GET",
          }).then(function (actormovies) {
            console.log("This is actor movies results:", actormovies);
            var actorMovie = actormovies.cast;
            for (var i = 0; i < actorMovie.length; i++) {
              // console.log(actormovies.results[i]);
              if (actorMovie[i].poster_path) {
                var actorPosterPath = actorMovie[i].poster_path;
                // console.log(actorPosterPath);
                var imgel = document.createElement("img");
                imgel.setAttribute(
                  "src",
                  `https://image.tmdb.org/t/p/w185/${actorPosterPath}`
                );
                imgel.height = "50";
                imgel.width = "50";
                // imgel.style.backgroundSize = "50px 50px";
                // imgel.css({
                //   width: "100px",
                //   height: "100px",
                // });
                document.getElementById("poster").appendChild(imgel);
                console.log("loop finsihed");
              }
              // var w = window.open();
              // $(w.document.body).html("<img></img>");
              // var img = document.createElement("img");

              // console.log("this is posterPath:", actorPosterPath);
            }
          });
        }

        //  gettingActorMovies = function (headshotID) {
        //   console.log(headshotID);
      );
    });
  });

  $("#yelpbutton").on("click", function () {
    console.log("inside yelp");

    searchRest = $("#yelp").val();
    console.log($("#yelp").val());

    var myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchRest}&location=philadelphia`;

    $.ajax({
      url: myurl,
      headers: {
        Authorization:
          "Bearer 8e74JR0lRhurKR3BR0IjLkRghG7LDl5g79BsDgLPudborA7HM55Txehiu07i5vGoELrTv3Pae39bDZC24BU0L1dacn5GF45VO8SZpHDrRWwj4_fxE0hk8jccPGcTYHYx",
      },
      method: "GET",
      dataType: "json",
      success: function (data) {
        var totalresults = data.total;
        var a = document.createElement("a");

        if (totalresults > 0) {
          $("#restaurant").append(
            "<h5>We discovered " + totalresults + " results!</h5>"
          );
          $.each(data.businesses, function (i, item) {
            var id = item.id;
            // var alias = item.alias;
            var phone = item.display_phone;
            var image = item.image_url;
            var name = item.name;
            var rating = item.rating;
            var reviewcount = item.review_count;
            var address = item.location.address1;
            var city = item.location.city;
            var state = item.location.state;
            var url = item.url;
            $("#restaurant").append(
              `<style="margin-top:50px;margin-bottom:50px;">
              <br><img src="${image}" style="width:200px;height:150px;">
              <br>Check out ---> <b>${name}</b>
              <br>Located at: ${address} ${city}, ${state}
              <br>The phone number for ${name} is: ${phone}
              <br>${name} has a rating of ${rating} with ${reviewcount} reviews.
              <br>The Yelp URL is -->${url}`
            );
          });
        } else {
          $("#results").append("<h5>We discovered no results!</h5>");
        }
      },
    });
  });
});
