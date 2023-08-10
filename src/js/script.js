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
//console.log(dataSourceBooks);

/* Start render books */

function render(){


    for (const elem of dataSourceBooks){

        /* generate HTML based on temaplte */
        const generatedHTML = templates.listProduct(elem);
       // console.log(generatedHTML);

        /* create element using utilies.createElementFromHTML*/
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
       // console.log(generatedDOM);

        /* find list book container */
        const listConatainer = document.querySelector(select.containerOf.list);

        /* add generatedDOM to listConatainer */
        listConatainer.appendChild(generatedDOM);
    }
}
render();

/* End render books */

/* Start add favorite Books*/
function initAction() {

    let favoriteBooks = [];

    const listConatainer = document.querySelector(select.containerOf.list);

        /* add event listener to clickable image on event dbclick */
        listConatainer.addEventListener('dblclick', function(event) {

        /* prevent default action for event */
        event.preventDefault();

        if(event.target.offsetParent.classList.contains('book__image')) {

            const clickedItem = event.target.offsetParent;

            /* get data-id */
            const dataId = clickedItem.dataset.id;

            let elementToCheck = dataId;

            /* check if there is dataId in the table, if so, remove it */
            if (favoriteBooks.includes(elementToCheck)) {
            let indexToRemove = favoriteBooks.indexOf(elementToCheck);
            favoriteBooks.splice(indexToRemove, 1);

                /* remove id to favoriteBooks */
                clickedItem.classList.remove('favorite');

                } else {

                    /* add class favorite */
                    clickedItem.classList.add('favorite');
                    /* add id to favoriteBooks */
                    favoriteBooks.push(dataId);
                }
                console.log('favoriteBooks ', favoriteBooks );
            }
        });
    }
initAction();

/* End add favorite Books*/