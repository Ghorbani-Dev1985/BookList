let $ = document;
let Header = $.querySelector("#Header");
let ScrollUpBtn = $.querySelector(".ScrollUpBtn");
let BookListForm = $.querySelector("#BookListForm");
let BookListAlert = $.querySelector("#BookListAlert");
let BookTitleInput = $.querySelector("#BookTitleInput");
let BookSubjectInput = $.querySelector("#BookSubjectInput");
let BookAuthorInput = $.querySelector("#BookAuthorInput");
let AddBookBtn = $.querySelector(".AddBookBtn");
let EditBookBtn = $.querySelector(".EditBookBtn");
let BookListTable = $.querySelector(".BookListTable");
let BookListItemsBody = $.querySelector(".BookListItemsBody");
let NullBookList = $.querySelector(".NullBookList");
let BookListItems = [];


function AddNewBookList() {
  let BookTitleInputValue = BookTitleInput.value.trim();
  let BookSubjectInputValue = BookSubjectInput.value.trim();
  let BookAuthorInputValue = BookAuthorInput.value.trim();
  if (BookTitleInputValue || BookSubjectInputValue || BookAuthorInputValue) {
    let NewBookListObj = {
      id: BookListItems.length + 1,
      BookTitle: BookTitleInputValue,
      BookSubject: BookSubjectInputValue,
      BookAuthor: BookAuthorInputValue,
    };
    GreenAlert();
    BookListAlert.innerHTML = `کتاب با عنوان ${BookTitleInputValue} با موفقیت ثبت گردید.`;
    RemoveAlert();
    ClearInputs();
    BookListItems.push(NewBookListObj);
    SetLocalStorage(BookListItems);
    BookListGenerator(BookListItems);
    BookTitleInput.focus();
  } else {
    RedAlert();
    BookListAlert.innerHTML = `لطفا همه موارد را وارد نمایید.`;
    RemoveAlert();
  }
}