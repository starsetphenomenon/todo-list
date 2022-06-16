const inputText = document.getElementById('myText');
const getTextBtn = document.getElementById('addBtn');
const myForm = document.getElementById('myForm');
const myList = document.getElementById('myList');
const deleteItems = document.getElementById('deleteAll');
const checkItems = document.getElementById('checkAll');
const allDeleteBtn = document.getElementsByClassName('elemDelete');
const downBtns = document.querySelector('.downButtons');
const listElements = myList.childNodes;

const createListElem = function () {
    if (inputText.value.trim() !== '') {
        let listElement = document.createElement('li');
        let elementDelete = document.createElement('img');
        elementDelete.setAttribute('id', `elemDelete${listElements.length}`);
        elementDelete.setAttribute('class', 'elemDelete');
        elementDelete.src = 'remove.svg';
        listElement.innerHTML = `<span class='elemText'>${inputText.value}</span>`;
        listElement.appendChild(elementDelete);
        myList.prepend(listElement);
        inputText.value = '';
        elementDelete.addEventListener('click', e => {
            e.target.parentNode.remove();
        });
        listElement.addEventListener('click', e => {
            listElement.classList.toggle('checkedItem');
        });
    }
};

const deleteAll = function () {
    Array.from(myList.children).forEach(el => el.remove());
};
const checkAll = function () {
    Array.from(myList.children).forEach(el => el.classList.add('checkedItem'));
};

deleteItems.addEventListener('click', deleteAll);
checkItems.addEventListener('click', checkAll);
getTextBtn.addEventListener('click', createListElem);
inputText.addEventListener('keyup', e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        createListElem();
    }
});