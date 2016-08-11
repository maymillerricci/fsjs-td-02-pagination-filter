var studentList = $(".student-list");
var studentListItems = $(".student-list li");
var perPage = 10;

var studentCount = studentListItems.length;
var pageCount = getPageCount(studentCount, perPage);
if (pageCount > 1) {
  paginate(pageCount);
  goToPage(1);
}

$(".pagination a").on("click", function(e) {
  e.preventDefault();
  var pageNumber = $(this).text();
  goToPage(pageNumber);
});

function getPageCount(total, perPage) {
  return Math.ceil(total / perPage);
}

function paginate(pageCount) {
  studentList.after("<div class='pagination'></div>");
  for (var i = 1; i <= pageCount; i++) {
    $(".pagination").append("<li><a href='#'>" + i + "</a></li>");
  }
}

function goToPage(pageNumber) {
  var startIndex = perPage * (pageNumber - 1);
  var endIndex = perPage * pageNumber;
  var studentsToShow = studentListItems.slice(startIndex, endIndex);
  studentListItems.hide();
  studentsToShow.show();
}
 
