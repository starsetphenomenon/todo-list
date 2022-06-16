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
if (localStorage.getItem('listCount') >= 1) {
    myList.innerHTML = localStorage.getItem(`elem`);
}

const addStorage = function () {
    localStorage.setItem(`elem`, myList.innerHTML);
    localStorage.setItem('listCount', myList.childElementCount);
};

const getStorage = function () {
    if (localStorage.getItem('listCount') >= 1) {
        myList.innerHTML = localStorage.getItem(`elem`);
    }
};

Array.from(allDeleteBtn).forEach(elem => {
    elem.addEventListener('click', e => {
        e.target.parentNode.remove();
        addStorage();
        getStorage();
    });
});
Array.from(myList.childNodes).forEach(elem => {
    elem.addEventListener('click', e => {
        e.target.classList.toggle('checkedItem');
        addStorage();
        getStorage();
    });
});

const createListElem = function () {
    if (inputText.value.trim() !== '') {
        let listElement = document.createElement('li');
        let elementDelete = document.createElement('img');
        elementDelete.setAttribute('id', `elemDelete${listElements.length}`);
        elementDelete.setAttribute('class', 'elemDelete changeMonitor');
        listElement.setAttribute('class', 'changeMonitor');
        listElement.setAttribute('name', `elem${myList.childNodes.length}`);
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
        // LOCAL STORAGE
        localStorage.setItem(`elem`, myList.innerHTML);
        localStorage.setItem('listCount', myList.childElementCount);

    }
};

const deleteAll = function () {
    Array.from(myList.children).forEach(el => {
        el.remove();
    });
};
const checkAll = function () {
    Array.from(myList.children).forEach(el => el.classList.add('checkedItem'));
};

deleteItems.addEventListener('click', e => {
    deleteAll();
    addStorage();
    getStorage();

});
checkItems.addEventListener('click', e => {
    checkAll();
    Array.from(myList.childNodes).forEach(elem => {
        elem.addEventListener('click', e => {
            e.target.classList.toggle('checkedItem');
            addStorage();
            getStorage();
        });
    });
    addStorage();
    getStorage();
});
getTextBtn.addEventListener('click', createListElem);
inputText.addEventListener('keyup', e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        createListElem();
    }
});