/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advancedWalkBtn');
    element.addEventListener('click', advancedWalk);

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });
}

function walk() {
    let el;

    //  Initialize text area element (find + clear contents)
    let textArea = getTextArea();

    el = document.getElementById('p1');
    showNode(el, textArea);

    el = el.firstChild;
    showNode(el, textArea);

    el = el.nextSibling;
    showNode(el, textArea);

    el = el.lastChild;
    showNode(el, textArea);

    el = el.parentNode.parentNode.parentNode;
    showNode(el, textArea);

    el = el.querySelector('section > *');
    showNode(el, textArea);
}

function advancedWalk() {
    //  Initialize text area element (find + clear contents)
    let textArea = getTextArea();

    //  Begin at the top of the document root
    let root = document.lastChild;

    //  Begin a DFS traversal of the tree
    treeDFS(root, textArea, 0);
}

function treeDFS(node, textArea, level) {
    printNode(node, level, textArea);

    // for (const child of node.childNodes) {
    for (const child of node.children) {
        treeDFS(child, textArea, level + 1);
    }
}

function printNode(node, level, textArea) {
    let nodeName = node.nodeName;
    
    let message = '';
    for (let i = 0; i < level; i++)
    {
        message += "    ";
    }

    if (level > 0) {
        message += "|- ";
    }

    message += nodeName + "\n";

    textArea.innerHTML += message;
}

function getTextArea() {
    //  Find textarea element
    let textArea = document.querySelector('fieldset > textarea');

    //  Clear textarea contents
    clearOutput(textArea);

    return textArea;
}

function showNode(el, textArea) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    
    if (textArea) {
        //  Print information into the textarea field
        textArea.innerHTML += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n-----\n`;
    }
    else {
        throw Error(`clearOutput: textArea is ${textArea}!`);
    }
    
}

function clearOutput(textArea) {

    // Wipe text area contents
    if (textArea)
    {
        textArea.innerHTML = '';
    }
    else {
        throw Error(`clearOutput: textArea is ${textArea}!`);
    }
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

window.addEventListener('DOMContentLoaded', init);