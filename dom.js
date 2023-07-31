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

    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', advancedModify);

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDeleteBtn');
    element.addEventListener('click', safeDelete);

    element = document.getElementById('selectorDeleteBtn');
    element.addEventListener('click', deleteBySelector);

    element = document.getElementById('cloneBtn');
    element.addEventListener('click', basicClone);

    element = document.getElementById('advancedCloneBtn');
    element.addEventListener('click', advancedClone);
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
    printNode(node, textArea, level);

    for (const child of node.children) {
        treeDFS(child, textArea, level + 1);
    }
}

function printNode(node, textArea, level) {
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
        //  Print information into the textarea
        textArea.innerHTML += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n-----\n`;
    }
    else {
        throw Error(`clearOutput: textArea is ${textArea}!`);
    }
}

function clearOutput(textArea) {

    //  Wipe text area contents
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

function advancedModify() {
    let h1Element = document.querySelector('h1');

    //  Update h1 text
    h1Element.innerText = 'DOM Manipulation is Fun!';

    //  Update h1 color to a random darkcolor
    let randomValue = Math.ceil(Math.random() * 6);

    h1Element.style.color = `var(--darkcolor${randomValue})`;

    //  Update p1's class
    let p1Element = document.querySelector('#p1');

    p1Element.classList.toggle('shmancy');
}

function add() {
    //  Get output tag
    let outputElement = document.querySelector('output');

    //  Get form data
    let nodeType = document.getElementById('node-type').value;
    let nodeContent = document.getElementById('node-content').value;

    let newNode, date;

    if (nodeType == 'Element') {
        //  Node content must be a valid element name - check using the DOM Parser
        //  Idea from this Stack Overflow answer: https://stackoverflow.com/questions/15458876/check-if-a-string-is-html-or-not#answer-15458968

        //  Create a DOMParser
        let domParser = new DOMParser();

        //  Create an HTML document with only this element
        let htmlWithElement = domParser.parseFromString(`<${nodeContent}>`, 'text/html');

        //  Get this element (document --> html --> body --> element)
        let newElement = htmlWithElement.firstChild.lastChild.firstChild;

        if (HTMLUnknownElement.prototype.isPrototypeOf(newElement)) {
            //  Element is unknown - throw an error!
            throw Error(`add: Unknown element ${nodeContent}!`);
        }

        //  Element is valid, so create it
        newNode = document.createElement(nodeContent);

        //  Fill element with default text
        date = new Date();

        newNode.innerText = `New Element ${date.toLocaleString()}`;
    }
    else {
        //  If node content is empty, add an empty string
        date = new Date();

        if (!nodeContent) {
            nodeContent = `New ${nodeType} ${date.toLocaleString()}`;
        }

        //  Create new Text Node or Comment
        if (nodeType == 'Text Node') {
            newNode = document.createTextNode(nodeContent);
        }
        else {
            //  Create a comment
            newNode = document.createComment(nodeContent);
        }
    }

    //  Add new element to the output tag
    outputElement.appendChild(newNode);
}

// function add() {
//     //  Get output tag
//     let outputElement = document.querySelector('output');

//     //  Get form data
//     let nodeType = document.getElementById('node-type').value;
//     let nodeContent = document.getElementById('node-content').value;

//     //  Create new node of the specified type with the specified content
//     let newNode;
//     let tagType;

//     if (!nodeContent && nodeType == 'Element') {
//         //  Node type is an element, but not tag type was specified
//         throw Error('add: Must specify a tag type if creating an element!');
//     }
//     else if (nodeType == 'Element') {
//         //  Specify tag type for element
//         tagType = nodeContent;

//         //  Empty out nodeContent
//         nodeContent = '';
//     }
    
//     if (!nodeContent)
//     {
//         //  If node content is empty, fill with default
//         let date = new Date();
//         nodeContent = `New ${nodeType} ${date.toLocaleString()}`;
//     }

//     switch (nodeType) {
//         case 'Text Node':
//             newNode = document.createTextNode(nodeContent);
//             break;
//         case 'Comment':
//             newNode = document.createComment(nodeContent);
//             break;
//         case 'Element':
//             newNode = document.createElement('p');
//             newNode.innerText = nodeContent;
//             break;
//     }

//     //  Add new element to the output tag
//     outputElement.appendChild(newNode);
// }

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
    //  Get last child of the body
    let lastChild = document.body.lastChild;

    if (lastChild.id == 'controls') {
        lastChild = lastChild.previousSibling;
    }

    //  If no child before the controls section exists
    if (!lastChild)
    {
        throw Error("no more nodes to safely delete!");
    }

    document.body.removeChild(lastChild);
}

function deleteBySelector() {
    //  Get selector value
    let selector = document.getElementById('selectorDeleteField').value;

    let matchingElements = document.querySelectorAll(selector);

    for (const element of matchingElements) {
        // console.log(element);
        element.parentNode.removeChild(element);
    }
}

function basicClone() {
    //  Get output tag
    let outputElement = document.querySelector('output');

    //  Get #p1 element
    let p1Element = document.getElementById('p1');
    let clone = p1Element.cloneNode(true);

    //  Remove id from clone
    clone.removeAttribute('id');

    outputElement.appendChild(clone);
}

function advancedClone() {
    //  Get output tag
    let outputElement = document.querySelector('output');

    if (!outputElement.dataset['numCards'])
    {
        outputElement.dataset['numCards'] = 1;
    } else {
        outputElement.dataset['numCards']++;
    }

    let numCards = outputElement.dataset['numCards'];

    //  Get template
    let template = document.querySelector('#card');

    //  Clone template
    let newCard = template.content.cloneNode(true);

    //  Set title
    let title = newCard.querySelector('p');
    title.innerHTML = `Example Card ${numCards}`;

    //  Set image
    let images = [
        {
            url: '/assets/images/communicator.jpg',
            credit: 'Photo by <a href="https://unsplash.com/@stefanbc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Stefan Cosma</a> on <a href="https://unsplash.com/photos/qa9EuWPsgFU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
        },
        {
            url: '/assets/images/enterprise.jpg',
            credit: 'Photo by <a href="https://unsplash.com/@stefanbc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Stefan Cosma</a> on <a href="https://unsplash.com/photos/YGzV2u31o9Q?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
        },
        {
            url: '/assets/images/chronicles_logo_small.jpg',
            credit: 'Photo taken from <a href="https://www.vintagecomputing.com/index.php/archives/354/watch-the-computer-chronicles-online">Vintage Computing</a>'
        }
    ]

    let image = newCard.querySelector('img');

    //  Choose a random image from the list
    let chosenImage = images[Math.floor(Math.random() * (images.length))];
    image.src = chosenImage.url;

    //  Set paragraph text
    let paragraph = newCard.querySelector('picture + p');
    paragraph.innerHTML = `Oh yes, lovely - paragraph text. ${chosenImage.credit} And look! <em>More</em> paragraph text.`;

    //  Set link
    let link = newCard.querySelector('info-card > a');
    link.href = "#";
    link.innerText = "Card link";

    outputElement.appendChild(newCard);
}

window.addEventListener('DOMContentLoaded', init);