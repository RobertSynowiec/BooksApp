//const { data } = require("autoprefixer");
// eslint-disable-line no-unused-vars
{
  ("use strict");

  const select = {
    templateOf: {
      listProduct: "#template-book",
      filtersBook: ".filters",
    },
    containerOf: {
      list: ".books-list",
    },
  };
  const classBookImage = {
    singleBook: ".book__image",
  };
  const classFor = {
    singleBook: "book__image",
  };
  const search = {
    attributes: {
      bookId: "data-id",
    },
  };
  const classNames = {
    favoriteBook: "favorite",
  };
  const templates = {
    listProduct: Handlebars.compile(
      document.querySelector(select.templateOf.listProduct).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];

      this.initData();
      this.bookList = document.querySelector(select.containerOf.list);
      this.render();

      this.booksList = document.querySelectorAll(classBookImage.singleBook);
      this.elemFilter = document.querySelector(select.templateOf.filtersBook);

      this.initAction();
      this.filterBooks();
    }

    initData() {
      this.data = dataSource.books;
    }

    render() {
      for (let elem of this.data) {
        elem.ratingBgc = this.determineRatingBgc(elem.rating);
        elem.ratingWidth = elem.rating * 10;
        const generatedHTML = templates.listProduct(elem);
        const generatedElementDOM = utils.createDOMFromHTML(generatedHTML);
        this.bookList.appendChild(generatedElementDOM);
      }
    }

    initAction() {
      console.log(this.booksList);
      for (let elem of this.booksList) {
        console.log({ elem });
        elem.addEventListener("dblclick", function (event) {
          event.preventDefault();

          const containerImages = event.target.offsetParent;

          if (containerImages.classList.contains(classFor.singleBook)) {
            const id = containerImages.getAttribute(search.attributes.bookId);
            containerImages.classList.toggle(classNames.favoriteBook);
            const idInFavoriteTable = this.favoriteBooks.indexOf(id);

            if (idInFavoriteTable == -1) {
              elem.classList.add("favorite");
              this.favoriteBooks.push(id);
            } else {
              this.favoriteBooks.splice(idInFavoriteTable, 1);
              this.elem.classList.remove("favorite");
            }
          }
        });
        const thisBooksList = this;
        this.elemFilter.addEventListener("click", function (event) {
          const clickedElement = event.target;

          if (
            clickedElement.tagName == "INPUT" &&
            clickedElement.type == "checkbox" &&
            clickedElement.name == "filter"
          ) {
            if (clickedElement.checked) {
              thisBooksList.filters.push(clickedElement.value);
            } else {
              const valueArray = thisBooksList.filters.indexOf(
                clickedElement.value
              );
              thisBooksList.filters.splice(valueArray, 1);
            }
          }
          thisBooksList.filterBooks();
        });
      }
    }
    filterBooks() {
      for (let book of this.data) {
        let shouldBeHidden = false;

        const bookSelector = document.querySelector(
          '[data-id="' + book.id + '"]' //
        );

        for (let filter of this.filters) {
          if (book.details[filter] == true) {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden == true) {
          if (!bookSelector.classList.contains("hidden")) {
            bookSelector.classList.add("hidden");
          }
        } else {
          if (bookSelector.classList.contains("hidden")) {
            bookSelector.classList.remove("hidden");
          }
        }
      }
    }
    determineRatingBgc(rating) {
      let styleColorRating;

      if (rating < 6) {
        styleColorRating =
          "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
      } else if (rating > 6 && rating <= 8) {
        styleColorRating =
          "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
      } else if (rating > 8 && rating <= 9) {
        styleColorRating =
          "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
      } else if (rating > 9) {
        styleColorRating =
          "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
      }
      return styleColorRating;
    }
  }
  const app = new BooksList();
  console.log(app);
}
