var studentListItems = $(".student-list li");
var perPage = 10;

addSearchBar();
paginate(studentListItems);

$(".student-search button").on("click", function() {
  $(".pagination").remove();
  var searchTerm = $(this).prev().val().toLowerCase();
  search(searchTerm);
  studentListItems = $(".student-list li:visible")
  paginate(studentListItems);
});

$(document).on("click", ".pagination a", function(e) {
  e.preventDefault();
  var pageNumber = $(this).text();
  goToPage(pageNumber, studentListItems);
});

function addSearchBar() {
  var searchBar = "<div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>"
  $(".page-header").append(searchBar);
}

function search(searchTerm) {
  studentListItems.hide();
  $.each($(".student-details"), function() {
    if ($(this).text().toLowerCase().match(searchTerm)) {
      $(this).parent().show();
    }
  });
}

function getPageCount(total, perPage) {
  return Math.ceil(total / perPage);
}

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

function goToPage(pageNumber, studentListItems) {
  var startIndex = perPage * (pageNumber - 1);
  var endIndex = perPage * pageNumber;
  var studentsToShow = studentListItems.slice(startIndex, endIndex);
  studentListItems.hide();
  studentsToShow.show();
  highlightSelectedPage(pageNumber);
}

// remove css highlighting selected page number link from all links
// and add it to currently selected link
function highlightSelectedPage(pageNumber) {
  $(".pagination a").removeClass("active");
  $(".pagination a").eq(pageNumber - 1).addClass("active");
}
 
