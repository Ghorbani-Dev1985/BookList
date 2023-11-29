const $ = document;
const Header = $.querySelector("#Header")
const ScrollUpBtn = $.querySelector(".ScrollUpBtn")
const BookListForm = $.querySelector("#BookListForm")
const BookListAlert = $.querySelector("#BookListAlert")
const BookTitleInput = $.querySelector("#BookTitleInput")
const BookSubjectInput = $.querySelector("#BookSubjectInput")
const BookAuthorInput = $.querySelector("#BookAuthorInput")
const AddBookBtn = $.querySelector(".AddBookBtn")
const EditBookBtn = $.querySelector(".EditBookBtn")
const BookListTable = $.querySelector(".BookListTable")
const BookListItemsBody = $.querySelector(".BookListItemsBody")
const NullBookList = $.querySelector(".NullBookList")
const DeleteModal = $.querySelector('.DeleteModal')
const Overlay = $.querySelector('.Overlay')
const DeleteModalYesBtn = $.querySelector('#DeleteModal__YesBtn')
const DeleteModalNoBtn = $.querySelector('#DeleteModal__NoBtn')
let BookListItems = [];


function AddNewBookList() {
  let BookTitleInputValue = BookTitleInput.value.trim();
  let BookSubjectInputValue = BookSubjectInput.value.trim();
  let BookAuthorInputValue = BookAuthorInput.value.trim();
  NullBookList.innerHTML = ""
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
    BookLists.forEach(({id , BookTitle , BookSubject , BookAuthor}) => {
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
      EditImg.addEventListener("click", () => EditBookListItems(id));
      DeleteImg.addEventListener("click", () =>
      OpenModal()
      );
      DeleteModal.innerHTML = `  <div class="DeleteModal__Header">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#be123c" width="30px" height="30px">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>          
      <h2>آیا برای حذف مطمعن هستید؟</h2>
   </div>
   <div class="DeleteModal__Btns">
      <button id="DeleteModal__YesBtn" onClick="DeleteBookListItem(id , title)">بله</button>
      <button id="DeleteModal__NoBtn" onClick="CloseModal()">خیر</button>
   </div>`
      EditTd.append(EditImg);
      DeleteTd.append(DeleteImg);
      TitleTdEle.textContent = BookTitle;
      SubjectTdEle.textContent = BookSubject;
      AuthorTdEle.textContent = BookAuthor;
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
function OpenModal(){
  DeleteModal.style.display = 'block'
  Overlay.style.display = 'block'
}
function CloseModal(){
  DeleteModal.style.display = 'none'
  Overlay.style.display = 'none'
}
function DeleteBookListItem(id, title) {
  let getBookLists = JSON.parse(localStorage.getItem("BookLists"));
  BookListItems = getBookLists;
  console.log(typeof BookListItems);
  let deleteBookListItem = BookListItems.findIndex((BookListItem) => {
    return BookListItem.id === id;
  });
  BookListItems.splice(deleteBookListItem, 1);
  SetLocalStorage(BookListItems);
  BookListGenerator(BookListItems);
  RedAlert();
  BookListAlert.innerHTML = `یادداشت با عنوان ${title} حذف گردید.`;
  if(BookListItems.length === 0){
  window.location.reload();
  }
  RemoveAlert();
  CloseModal()
}
function GetLocalStorage() {
  let getBookLists = JSON.parse(localStorage.getItem("BookLists"));
  if (getBookLists) {
    BookListItems = getBookLists;
  } else {
    BookListItems = [];
  }
  BookListGenerator(BookListItems);
}
function RedAlert() {
  BookListAlert.style.visibility = "visible";
  BookListAlert.style.opacity = 1;
  BookListAlert.style.color = "#f43f5e";
}
function GreenAlert() {
  BookListAlert.style.visibility = "visible";
  BookListAlert.style.opacity = 1;
  BookListAlert.style.color = "#22c55e";
}
function RemoveAlert() {
  setTimeout(() => {
    BookListAlert.style.visibility = "hidden";
    BookListAlert.style.opacity = 0;
  }, 2000);
}
function ClearInputs() {
  BookTitleInput.value = "";
  BookSubjectInput.value = "";
  BookAuthorInput.value = "";
}
// EventListener


Overlay.addEventListener('click' , CloseModal)
$.addEventListener("scroll", () => {
  if ($.documentElement.scrollTop > 0) {
    Header.classList.add("GlassBg");
  }
  if ($.documentElement.scrollTop >= 200) {
    ScrollUpBtn.style.visibility = "visible";
    ScrollUpBtn.style.opacity = 1;
  } else {
    Header.classList.remove("GlassBg");
    ScrollUpBtn.style.visibility = "hidden";
    ScrollUpBtn.style.opacity = 0;
  }
});

ScrollUpBtn.addEventListener("click", () => {
  scrollTo(0, 0);
});
BookListForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
AddBookBtn.addEventListener("click", AddNewBookList);
window.addEventListener("load", GetLocalStorage);