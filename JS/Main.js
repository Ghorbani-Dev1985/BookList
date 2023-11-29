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
function SetLocalStorage(BookLists) {
  localStorage.setItem("BookLists", JSON.stringify(BookLists));
}
function BookListGenerator(BookLists) {
  if (BookLists.length > 0) {
    let TrEle,
      TitleTdEle,
      SubjectTdEle,
      AuthorTdEle,
      EditImg,
      DeleteImg,
      EditTd,
      DeleteTd;
    BookListItemsBody.innerHTML = "";
    BookLists.forEach((BookList) => {
      TrEle = $.createElement("tr");
      TitleTdEle = $.createElement("td");
      SubjectTdEle = $.createElement("td");
      AuthorTdEle = $.createElement("td");
      EditTd = $.createElement("td");
      DeleteTd = $.createElement("td");
      EditImg = $.createElement("img");
      DeleteImg = $.createElement("img");
      EditImg.setAttribute("src", "./Assets/Images/edit.svg");
      DeleteImg.setAttribute("src", "./Assets/Images/trash.svg");
      EditImg.addEventListener("click", () => EditBookListItems(BookList.id));
      DeleteImg.addEventListener("click", () =>
        DeleteBookListItem(BookList.id, BookList.BookTitle)
      );
      EditTd.append(EditImg);
      DeleteTd.append(DeleteImg);
      TitleTdEle.textContent = BookList.BookTitle;
      SubjectTdEle.textContent = BookList.BookSubject;
      AuthorTdEle.textContent = BookList.BookAuthor;
      TrEle.append(TitleTdEle, SubjectTdEle, AuthorTdEle, EditTd, DeleteTd);
      BookListItemsBody.append(TrEle);
      BookListTable.style.display = "block";
    });
  } else {
    NullBookList.textContent = "هیچ کتابی تاکنون ثبت نگردیده است.";
  }
}
function EditBookListItems(id) {
  scrollTo(0, 0);
  let localStorageBookLists = JSON.parse(localStorage.getItem("BookLists"));
  BookListItems = localStorageBookLists;
  BookListItems.forEach((BookListItem) => {
    if (BookListItem.id === id) {
      AddBookBtn.classList.add("hidden");
      EditBookBtn.classList.remove("hidden");
      BookTitleInput.value = BookListItem.BookTitle;
      BookSubjectInput.value = BookListItem.BookSubject;
      BookAuthorInput.value = BookListItem.BookAuthor;
      EditBookBtn.addEventListener("click", () => {
        let BookTitleInputValue = BookTitleInput.value.trim();
        let BookSubjectInputValue = BookSubjectInput.value.trim();
        let BookAuthorInputValue = BookAuthorInput.value.trim();
        if (
          BookTitleInputValue ||
          BookSubjectInputValue ||
          BookAuthorInputValue
        ) {
          BookListItem.BookTitle = BookTitleInputValue;
          BookListItem.BookSubject = BookSubjectInputValue;
          BookListItem.BookAuthor = BookAuthorInputValue;
          console.log(BookAuthorInputValue);
          SetLocalStorage(BookListItems);
          BookListGenerator(BookListItems);
          GreenAlert();
          BookListAlert.innerHTML = `یادداشت با عنوان (${BookListItem.BookTitle}) با موفقیت ویرایش گردید.`;
          RemoveAlert();
          AddBookBtn.classList.remove("hidden");
          EditBookBtn.classList.add("hidden");
          ClearInputs();
        } else {
          RedAlert();
          BookListAlert.innerHTML = `لطفا همه موارد را وارد نمایید.`;
          RemoveAlert();
        }
      });
    }
  });
}
function DeleteBookListItem(id, title) {
  let getBookLists = JSON.parse(localStorage.getItem("BookLists"));
  BookListItems = getBookLists;
  let deleteBookListItem = BookListItems.findIndex((BookListItem) => {
    return BookListItem.id === id;
  });
  BookListItems.splice(deleteBookListItem, 1);
  SetLocalStorage(BookListItems);
  BookListGenerator(BookListItems);
  RedAlert();
  BookListAlert.innerHTML = `یادداشت با عنوان ${title} حذف گردید.`;
  RemoveAlert();
}