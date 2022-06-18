const inputText = document.getElementById('myText');
const getTextBtn = document.getElementById('addBtn');
const myForm = document.getElementById('myForm');
const myList = document.getElementById('myList');
const deleteItems = document.getElementById('deleteAll');
const checkItems = document.getElementById('checkAll');
const allDeleteBtn = document.getElementsByClassName('elemDelete');
const downBtns = document.querySelector('.downButtons');
const storageElements = document.querySelectorAll('.changeMonitor');
const listElements = myList.childNodes;

// LOCAL STORAGE
const addStorage = function () {
    localStorage.setItem(`elem`, myList.innerHTML);
    localStorage.setItem('listCount', myList.childElementCount);
};

//Get the story if it's not empty
(function () {
    if (localStorage.getItem('listCount') >= 1) {
        myList.innerHTML = localStorage.getItem(`elem`);
    }
})();

const onRemove = function (e) {
    if (e.target.classList.contains('elemDelete')) {
        e.target.parentNode.classList.add('deleteAnim');
        setTimeout(function () {
            e.target.parentNode.remove();
            addStorage();
        }, 600);
    }
};

myList.addEventListener('click', onRemove);

const onCheck = function (e) {
    e.currentTarget.classList.toggle('checkedItem');
    addStorage();
};

Array.from(myList.childNodes).forEach(elem => {
    elem.addEventListener('click', onCheck);
});

// Dynamicly create list element
const createListElem = function () {
    if (inputText.value.trim() !== '') {
        let listElement = document.createElement('li');
        let elementDelete = document.createElement('img');
        elementDelete.setAttribute('id', `elemDelete${listElements.length}`);
        elementDelete.setAttribute('class', 'elemDelete changeMonitor');
        listElement.setAttribute('class', 'changeMonitor listElem');
        listElement.setAttribute('name', `elem${myList.childNodes.length}`);
        elementDelete.src = 'remove.svg';
        listElement.innerHTML = `<span class='elemText'>${inputText.value}</span>`;
        listElement.appendChild(elementDelete);
        myList.prepend(listElement);
        inputText.value = '';
        elementDelete.addEventListener('click', onRemove);
        listElement.addEventListener('click', onCheck);
        // LOCAL STORAGE
        localStorage.setItem(`elem`, myList.innerHTML);
        localStorage.setItem('listCount', myList.childElementCount);

    }
};

//Delete all elements on button
const deleteAll = function () {
    Array.from(myList.children).forEach(el => {
        el.classList.add('deleteAnim');
        setTimeout(function () {
            el.remove();
            addStorage();
        }, 600);
    });
};

//Check all elements on button
const checkAll = function () {
    Array.from(myList.children).forEach(el => {
        el.classList.add('checkedItem');
    });
    addStorage();
};

const onEnterPress = function (e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        createListElem();
    }
};

deleteItems.addEventListener('click', deleteAll);
checkItems.addEventListener('click', checkAll);
getTextBtn.addEventListener('click', createListElem);
inputText.addEventListener('keyup', onEnterPress);