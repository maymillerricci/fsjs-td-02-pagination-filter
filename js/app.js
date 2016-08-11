var studentList = $(".student-list");
var studentListItems = $(".student-list li");
var studentCount = studentListItems.length;
var perPageCount = 10;

function getPageCount(total, perPage) {
  return Math.ceil(total / perPage);
}

var pageCount = getPageCount(studentCount, perPageCount);

function paginate() {
  studentList.after("<div class='pagination'></div>");
  for (var i = 1; i <= pageCount; i++) {
    $(".pagination").append("<li><a href='#'>" + i + "</a></li>");
  }
}

if (pageCount > 1) {
  paginate();
  goToPage(1)
}

$(".pagination a").on("click", function(e) {
  e.preventDefault();
  var pageNumber = $(this).text();
  goToPage(pageNumber);
});

function goToPage(pageNumber) {
  var startIndex = perPageCount * (pageNumber - 1)
  var endIndex = perPageCount * pageNumber
  var studentsToShow = studentListItems.slice(startIndex, endIndex)
  studentListItems.hide();
  studentsToShow.show();
}
  
