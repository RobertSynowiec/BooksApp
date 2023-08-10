
const select = {
    templateOf: {
      listProduct: '#template-book',

    },
    containerOf: {
        list: '.books-list',
      },
}
const templates = {
    listProduct: Handlebars.compile(document.querySelector(select.templateOf.listProduct).innerHTML),
  };


const dataSourceBooks = dataSource.books
console.log(dataSourceBooks);



function render(){


    for (const elem of dataSourceBooks){

        /* generate HTML based on temaplte */
        const generatedHTML = templates.listProduct(elem);
        console.log(generatedHTML);

        /* create element using utilies.createElementFromHTML*/
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        console.log(generatedDOM);

            /* find list book container */
        const menuConatainer = document.querySelector(select.containerOf.list);
        console.log(menuConatainer);

            /* add element to menu */
            menuConatainer.appendChild(generatedDOM);
    }
}
render();