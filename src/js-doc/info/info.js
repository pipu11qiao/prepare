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
  /**
   * 获取书本标题
   * @return {string|*}
   */
  getTitle: function () {
    return this.title;
  },
  /**
   * 设置书本的页数
   * @param pageNum {number} 页数
   */
  setPageNum: function (pageNum) {
    this.pageNum = pageNum
  }
}