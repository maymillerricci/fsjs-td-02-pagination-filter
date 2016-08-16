var studentListItems = $(".student-list li");
var perPage = 10;

addSearchBar();
paginate(studentListItems);

// bind search function to search bar button clicks
$(".student-search button").on("click", function() {
  search();
});

// bind search function to typing in search bar
$(".student-search input").on("keyup", function() {
  search();
});

// bind going to page number function to page number link clicks
$(document).on("click", ".pagination a", function(e) {
  e.preventDefault();
  var pageNumber = $(this).text();
  goToPage(pageNumber, studentListItems);
});

// dynamically add the search bar
function addSearchBar() {
  var searchBar = "<div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>";
  $(".page-header").append(searchBar);
}

// perform search for search term and re-paginate based on visible results from search
function search() {
  $(".pagination").remove();
  $(".no-results").remove();
  var searchTerm = $(".student-search input").val().toLowerCase();
  showSearchResults(searchTerm);
  studentListItems = $(".student-list li:visible");
  if (studentListItems.length > 0) {
    paginate(studentListItems);
  } else {
    $(".student-list").append("<p class='no-results'>Your search returned no results.</p>");
  }
}

// loop through students showing just the ones that match the input search term
function showSearchResults(searchTerm) {
  studentListItems.hide();
  $.each($(".student-details"), function() {
    if ($(this).text().toLowerCase().match(searchTerm)) {
      $(this).parent().show();
    }
  });
}

// add page number links for each page and start off going to page 1
function paginate(studentListItems) {
  var studentCount = studentListItems.length;
  var pageCount = getPageCount(studentCount, perPage);
  if (pageCount > 1) {
    $(".student-list").after("<div class='pagination'><ul></ul></div>");
    for (var i = 1; i <= pageCount; i++) {
      $(".pagination ul").append("<li><a href='#'>" + i + "</a></li>");
    }
    goToPage(1, studentListItems);
  }
}

// round up total divided by how many you want to show per page to get number of pages
function getPageCount(total, perPage) {
  return Math.ceil(total / perPage);
}

// show just students on that page
function goToPage(pageNumber, studentListItems) {
  var startIndex = perPage * (pageNumber - 1);
  var endIndex = perPage * pageNumber;
  var studentsToShow = studentListItems.slice(startIndex, endIndex);
  studentListItems.hide();
  studentsToShow.fadeIn(1000);
  highlightSelectedPage(pageNumber);
}

// remove css highlighting selected page number link from all links
// and add it to currently selected link
function highlightSelectedPage(pageNumber) {
  $(".pagination a").removeClass("active");
  $(".pagination a").eq(pageNumber - 1).addClass("active");
}
 
