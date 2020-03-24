"use strict";

// =========== Loader functionality =========== //

function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}




// const url = "https://api.cederdorff.com/wp-json/wp/v2/posts";
// const url = "https://api.cederdorff.com/wp-json/wp/v2/posts?_embed";
const url = "http://majanorbjerg.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=5&per_page=100";

let _filmPosts = [];

function getMovies() {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (posts) {
      shuffle(posts);
      _filmPosts = posts;
      placeToPut = "content";
      appendPosts(posts);
      setTimeout(function () {
        showLoader(false);
      }, 200);
    });
}
getMovies();

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}



let categoryLine = "";

let placeToPut = "content";



function appendPosts(posts) {
  let htmlTemplate = "";

  for (const post of posts) {

    categoryLine = ""
    for (let category of post.categories) {

      let action = 8;
      let critics = 9;
      let drama = 7;
      let comedy = 6;
      let mindTwist = 10;
      let singAlong = 11;
      console.log(_categories)
      if (category == action) {
        categoryLine += `| Action `;
      } else if (category == critics) {
        categoryLine += `| Critics `;
      } else if (category == drama) {
        categoryLine += `| Drama `;
      } else if (category == comedy) {
        categoryLine += `| Comedy `;
      } else if (category == mindTwist) {
        categoryLine += `| Mind Twisting `;
      } else if (category == singAlong) {
        categoryLine += `| Sing Along `;
      }
    }
    categoryLine += `|`
    htmlTemplate += `
  <article>
    <h2>${post.title.rendered} (${post.acf.year})</h2>
    ${categoryLine}
    <br>
    <a id="${post.id}" href="#detailView" onclick="detailView(this.id)"> 
    <img src="${getFeaturedImageUrl(post)}"></a>
    </article>`
  }
  document.querySelector(`#${placeToPut}`).innerHTML = htmlTemplate;
}

let songTitle = "";


function detailView(element) {
  let htmlTemplateDetail = "";
  // for (const post of _filmPosts) {

  _filmPosts.map(post => {



    if (post.categories[0] == 11 || post.categories[1] == 11 || post.categories[2] == 11 || post.categories[3] == 11) {
      songTitle = "";

      for (let i = 0; i < post.acf.songs.length; i++) {
        console.log(post.acf.songs[i].value)
        songTitle += `<br>${post.acf.songs[i].label} <br>

        <iframe width="420" height="225" src="https://www.youtube.com/embed/${post.acf.songs[i].value}">
</iframe> <br>`;
      }

    } else {
      songTitle = "";
    }
    let numberOfStars = "";
    for (let i = 0; i < post.acf.stars; i++) {
      numberOfStars += "&#8902;"
    }



    if (element == post.id) {
      htmlTemplateDetail += `<a class="goBack" onclick="navigateTo(moviesTab.id)">Go back</a>
 <article class="detail">
 <img src="${getFeaturedImageUrl(post)}">
 <div>
    <h2>${post.title.rendered} (${post.acf.year})</h2>  
    <span class="stars">${numberOfStars}</span>
   <p>${post.acf.description}</p>
<iframe width="420" height="225" src="https://www.youtube.com/embed/${post.acf.trailer}">
</iframe>

<article>
<h3>${songTitle}</h3>
</article>
</div>
    </article>`
    }
  })

  // }
  document.querySelector("#detailView").innerHTML = htmlTemplateDetail;
}




// get the featured image url
function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}


// //Search
function search(searchValue) {

  searchValue = searchValue.toLowerCase();
  let filteredTitles = [];
  for (const post of _filmPosts) {
    let title = post.title.rendered.toLowerCase();
    let actors = post.acf.actors;
    console.log(actors)
    for (let i = 0; i < actors.length; i++) {
      let actorName = actors[i].toLowerCase();

      if (actorName.includes(searchValue)) {
        filteredTitles.push(post);
      }
    }
    if (title.includes(searchValue)) {
      filteredTitles.push(post);
    }
  }
  let unique = [...new Set(filteredTitles)];
  placeToPut = "content";
  appendPosts(unique);
}

let _categories = [];


// fetch all genres / categories from WP
function getGenres() {
  fetch('http://majanorbjerg.dk/wordpress/wp-json/wp/v2/categories')
    .then(function (response) {
      return response.json();
    })
    .then(function (categories) {
      _categories = categories;
      appendGenres(categories);
      console.log(categories);
    });
}

getGenres();

// append all genres as select options (dropdown)
function appendGenres(genres) {
  let htmlTemplates = "";
  for (let genre of genres) {

    if (genre.id == 3 || genre.id == 4 || genre.id == 1) {
      htmlTemplates += "";
    } else {
      htmlTemplates += `
      <button class="check" type="button" value="${genre.id}" onclick="checkCategories(this.value)">${genre.name}</button>
    `;
    }
  }
  document.querySelector("#select-genre").innerHTML += htmlTemplates;
}

function checkCategories(genreID) {
  if (genreID) {
    // for (let post of _filmPosts) {
    //   // console.log(filteredCategories);

    //   if (post.categories[0] == genreID || post.categories[1] == genreID || post.categories[2] == genreID || post.categories[3] == genreID) {
    //     filteredCategories.push(post);


    //   }
    //   // navigateTo(moviesTab.id);
    //   placeToPut = "movieCategories";
    //   appendPosts(filteredCategories);
    //   console.log(filteredCategories)
    // }


    showLoader(true);
    fetch(`http://majanorbjerg.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=${genreID}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (movies) {

        placeToPut = "movieCategories";
        appendPosts(movies);
        showLoader(false);
      });

  } else {
    document.querySelector('#movies-by-genre-container').innerHTML = `
      <p>Please, select genre</p>
    `;
  }
}


function yearSearch(years) {
  let filteredByYear = [];
  if (years.length === 4) {
    for (const post of _filmPosts) {
      console.log(post);
      if (post.acf.year <= years) {
        filteredByYear.push(post);
      }
    }
    document.getElementById("pYear").innerHTML = "";
    placeToPut = "newMovies";
    appendPosts(filteredByYear);

    if (filteredByYear.length == 0) {
      document.getElementById("pYear").innerHTML = "There are no movies from this year until today";
    }
  } else if (years.length == 0) {
    document.getElementById("pYear").innerHTML = "";
    appendPosts(filteredByYear);
  } else {
    document.getElementById("pYear").innerHTML = "The year must be a 4 didget number";
  }

}


function newReleases() {
  _filmPosts.sort((a, b) => {
    return (a.acf.year < b.acf.year) ? 1 : -1
  })
  placeToPut = "newMovies";
  appendPosts(_filmPosts);
}