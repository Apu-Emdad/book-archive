const search = document.getElementById("search");
const searchResult = document.getElementById("search-result");

const searchBook = () => {
  //   console.log("clicked");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  search.style.display = "none";
  searchResult.textContent = "";

  //   load data
  url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data));
};
const displaySearchResult = (books) => {
  //   getting the number of result
  const searchCount = books.numFound;
  if (searchCount === 0) {
    search.innerText = "";
    search.innerText = "No result found";
    search.style.display = "block";
  } else {
    search.style.display = "block";

    document.getElementById(
      "search-count"
    ).innerText = `Search Result : ${searchCount}`;

    //   showing the result
    const booklist = books.docs;
    // console.log(booklist);
    booklist.forEach((book) => {
      // console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");

      div.innerHTML = `
    <div class="card h-100">
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top"
                            alt="No image found">
      <div class="card-body">
        <h3 class="card-title">Book Name:${book.title}</h3>
        
        <p class="card-text fw-bold">Author:<span class='fw-normal'>${book.author_name}</span>.</p>
        
        <p class="card-text fw-bold ">Publisher:<span class='fw-normal'>${book.publisher}</span>.</p>
        
        <p class="card-text fw-bold">First publication Year:<span class='fw-normal'>${book.first_publish_year}</span>.</p>
        
        
      </div>
  </div>
    `;

      searchResult.appendChild(div);
    });
  }
};
