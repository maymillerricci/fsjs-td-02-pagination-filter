var studentList = $(".student-list");
var studentListItems = $(".student-list li");
var perPage = 10;

addSearchBar();
var studentCount = studentListItems.length;
var pageCount = getPageCount(studentCount, perPage);
if (pageCount > 1) {
  paginate(pageCount);
  goToPage(1);
}

$(".student-search button").on("click", function() {
  var searchTerm = $(this).prev().val().toLowerCase();
  search(searchTerm);
});

$(".pagination a").on("click", function(e) {
  e.preventDefault();
  var pageNumber = $(this).text();
  goToPage(pageNumber);
  $(".pagination a").removeClass("active");
  $(this).addClass("active");
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

function paginate(pageCount) {
  studentList.after("<div class='pagination'><ul></ul></div>");
  for (var i = 1; i <= pageCount; i++) {
    $(".pagination ul").append("<li><a href='#'>" + i + "</a></li>");
  }
  $(".pagination a").first().addClass("active");
}

function goToPage(pageNumber) {
  var startIndex = perPage * (pageNumber - 1);
  var endIndex = perPage * pageNumber;
  var studentsToShow = studentListItems.slice(startIndex, endIndex);
  studentListItems.hide();
  studentsToShow.show();
}
 
