//const { data } = require("autoprefixer");
{
  'use strict';

  const select = {
    templateOf: {
      listProduct: '#template-book',
      filtersBook: '.filters',
    },
    containerOf: {
      list: '.books-list',
    },
  };
  const classBookImage = {
    singleBook: '.book__image',
  };
  const classFor = {
    singleBook: 'book__image',
  };
  const search = {
    attributes: {
      bookId: 'data-id',
    },
  };
  const classNames = {
    favoriteBook: 'favorite',
  };
  const templates = {
    listProduct: Handlebars.compile(document.querySelector(select.templateOf.listProduct).innerHTML),
  };

  const favoriteBooks = [];

  const filters = [];

  const bookList = document.querySelector(select.containerOf.list);

  const render = function (){

    for (let elem of dataSource.books){

      elem.ratingBgc = determineRatingBgc(elem.rating);
      elem.ratingWidth = elem.rating*10;
      const generatedHTML = templates.listProduct(elem);
      const generatedElementDOM = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(generatedElementDOM);
    }
  };
  render();

  const initAction = function() {

    const bookList = document.querySelectorAll(classBookImage.singleBook);

    for(let elem of bookList){

      elem.addEventListener('dblclick', function(event) {

        event.preventDefault();

        const containerImages = event.target.offsetParent;

        if (containerImages.classList.contains(classFor.singleBook)){

          const id = containerImages.getAttribute(search.attributes.bookId);
          containerImages.classList.toggle(classNames.favoriteBook);
          const idInFavoriteTable = favoriteBooks.indexOf(id);

          if(idInFavoriteTable == -1){

            elem.classList.add('favorite');
            favoriteBooks.push(id);

          } else {

            favoriteBooks.splice(idInFavoriteTable , 1);
            elem.classList.remove('favorite');
          }
        }
      });

      const elemFilter = document.querySelector(select.templateOf.filtersBook);

      elemFilter.addEventListener('click' , function(event){
        const clickedElement = event.target;

        if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter'){

          if (clickedElement.checked){

            filters.push(clickedElement.value);
          }
          else {
            const valueArray = filters.indexOf(clickedElement.value);
            filters.splice(valueArray, 1);
          }
        }
        filterBooks();
      });
    }
  };
  initAction();

  const filterBooks = function(){

    for (let book of dataSource.books){

      let shouldBeHidden = false;

      const bookSelector = document.querySelector('[data-id="' + book.id + '"]');

      for(let filter of filters){

        if(book.details[filter] == true){

          shouldBeHidden = true;
          break;
        }
      }

      if (shouldBeHidden == true){

        if (!bookSelector.classList.contains('hidden')){
          bookSelector.classList.add('hidden');
        }
      }

      else{
        if (bookSelector.classList.contains('hidden')){
          bookSelector.classList.remove('hidden');
        }
      }
    }
  };
  function determineRatingBgc(rating){

    let styleColorRating;

    if(rating < 6){

      styleColorRating = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    else if(rating > 6 && rating <= 8){

      styleColorRating = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }

    else if(rating > 8 && rating <= 9){

      styleColorRating = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    else if(rating > 9){

      styleColorRating = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return styleColorRating;
  }
}
