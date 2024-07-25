'use strict';

let maxIntento = 25;

const img = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

const state = {
    arrayProducts: [],
};

class Products {
    constructor(name, route) {
        this.name = name;
        this.route = route;
        this.vote = 0;
        this.views = 0;
        this.renderVotes();
    }

    renderVotes() {
        if (this.vote != 0) {
            const liItem = document.getElementById(this.name);
            if (liItem) {
                liItem.textContent = `${this.name} votes: ${this.vote} `;
            }
        } else {
            const liItem = document.getElementById(this.name);
            if (liItem) {
                liItem.textContent = `${this.name} votes: 0`;
            }
        }
    }
};

function fileMaker() {
    for (let i = 0; i < img.length; i++) {
        let file = new Products(img[i], `./img/${img[i]}.jpg`);
        if (img[i] === `sweep`) {
            let file2 = new Products(img[i], `./img/${img[i]}.png`);
            state.arrayProducts.push(file2)
        } else {
            state.arrayProducts.push(file);
        }
    }
};

function imgShow() {
    const calls = []
    let leftImg = state.arrayProducts[Math.floor(Math.random() * img.length)];
    let midImg = state.arrayProducts[Math.floor(Math.random() * img.length)];
    let rightImg = state.arrayProducts[Math.floor(Math.random() * img.length)];
    if (leftImg != midImg && midImg != rightImg && leftImg != rightImg) {
        calls.push(leftImg);
        calls.push(midImg);
        calls.push(rightImg);
    } else {
        return imgShow();
    }
    return calls;
}

function objRender() {
    const call = imgShow();
    for (let i = 0; i < 3; i++) {
        const id = document.getElementById(`opcion${i + 1}`);
        const images = call[i].route;
        const name = call[i].name;
        if (id) {
            id.src = images;
            id.alt = name;
        }
        call[i].views++;
    }
}

function handleClick() {
    for (let i = 0; i < 3; i++) {
        const imgElement = document.getElementById(`opcion${i + 1}`);
        imgElement.addEventListener('click', function () {
            if (maxIntento != 0) {
                maxIntento--;
                const imgName = imgElement.alt;
                const index = img.indexOf(imgName)
                state.arrayProducts[index].vote++
                state.arrayProducts[index].renderVotes();
                objRender();
            }
        });
    }
}
fileMaker();
objRender();
handleClick();