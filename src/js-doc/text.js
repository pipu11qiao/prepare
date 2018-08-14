/**
 * Book类，代表一个书本
 * @param title
 * @param author
 * @constructor
 */
function Book(title,author){
  this.title = title;
  this.author = author;
}
Book.prototype = {
  constructor: Book,
  getTitle: function () {
    return this.title;
  },
  setPageNum: function (pageNum) {
    this.pageNum = pageNum
  }
}