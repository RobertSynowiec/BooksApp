//const { data } = require("autoprefixer");

const select = {
    templateOf: {
      listProduct: '#template-book',

    },
    containerOf: {
        list: '.books-list',
    },
    bookProduct: {
        image: '.book__image',
    },
}
const templates = {
    listProduct: Handlebars.compile(document.querySelector(select.templateOf.listProduct).innerHTML),
  };


const dataSourceBooks = dataSource.books
console.log(dataSourceBooks);

/* Start render books */

function render(){


    for (const elem of dataSourceBooks){

        /* generate HTML based on temaplte */
        const generatedHTML = templates.listProduct(elem);
        console.log(generatedHTML);

        /* create element using utilies.createElementFromHTML*/
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        console.log(generatedDOM);

        /* find list book container */
        const listConatainer = document.querySelector(select.containerOf.list);
        console.log(listConatainer);

        /* add generatedDOM to listConatainer */
        listConatainer.appendChild(generatedDOM);
    }
}
render();

/* End render books */

/* Start add favorite Books*/
function initAction() {

    let favoriteBooks = [];

    const allBooksImage = document.querySelectorAll(select.bookProduct.image);

    for (let bookImage of allBooksImage ){

        /* add event listener to clickable image on event dbclick */
        bookImage.addEventListener('click', function(event) {

        /* prevent default action for event */
        event.preventDefault();

        /* add class favorite */
        bookImage.classList.add('favorite')

        /* get data-id */
        const dataId = bookImage.dataset.id;
        console.log('dataId ', dataId);


        let elementToCheck = dataId;

        /* check if there is dataId in the table, if so, remove it */

        if (favoriteBooks.includes(elementToCheck)) {
           let indexToRemove = favoriteBooks.indexOf(elementToCheck);
           favoriteBooks.splice(indexToRemove, 1);

           console.log("The item was found and deleted.");

           /* remove id to favoriteBooks */
           bookImage.classList.remove('favorite');

        } else {
            console.log("The element was not found in the array.");

            /* add class favorite */
            bookImage.classList.add('favorite');
            /* add id to favoriteBooks */
            favoriteBooks.push(dataId);
        }
        console.log('favoriteBooks ', favoriteBooks );
    });
    }



}
initAction();

/* End add favorite Books*/