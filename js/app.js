var studentList = $(".student-list");
var studentCount = $(".student-list li").length;
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
}

