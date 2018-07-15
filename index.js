import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  //Get started Here
  const searchTerm = searchInput.value;
  console.log(searchTerm);
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  //Get the limit

  const searchLimit = document.getElementById('limit').value;


  //clear input
  searchInput.value = " ";

  //search Reddit here
  reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
      let output = '<div class="card-panel">';
      results.forEach(post => {
        //check for Image
        const image = post.preview ? post.preview.images[0].source.url : 'https://www.affiliatemarketertraining.com/wp-content/uploads/2015/01/Reddit.jpg';

        output += ` <div class="jumbotron">
      <div >
        <div class="">
          <div align=center class="card-image">
            <img style="width:100%;height:100%" src="${image}">
          
          </div>
          <div class="card-content">
          <span class="card-title">${post.title}</span>
            <p>${truncateText(post.selftext, 100)}</p>
          </div>
          <div class="card-action">
            <a href="${post.url}" target=_blank > Read more</a>
          </div>
          </div>
        </div>
     
    </div>
      `
      });
      output += '</div>';
      document.getElementById('results').innerHTML = output;
    });


  e.preventDefault();

});


//truncate tect

function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
};