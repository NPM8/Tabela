var table = [],
    zIndexHolder,
    defTop,
    defLeft,
    maxNumber = 0;

// function getHighestZIndex(element) {
//     var tmpzIndex = element.zIndex;
//     console.log('tablcia: ', table);
//     var zIndexTab = table.map((v) => {
//         return v.zIndex;
//     })
//     var ind = Math.max(...zIndexTab);
//     table.forEach((v, i) => {
//        if(v.zIndex>tmpzIndex)
//            table[i].newzIndex = v.zIndex--;
//     });
//     element.newzIndex = ind;
// }

function init() {
    // zIndexHolder = 0;
    // const renderPage = (e) => {
    //     var tmpElement = new page(300,300,'#fff',zIndexHolder+1,{top: 100, left: 60});
    //     main.appendChild(tmpElement.div);
    //     table.push(tmpElement);
    //     zIndexHolder++;
    // };
    // var main = document.getElementById('main');
    // var button = document.createElement('button');
    // button.classList.add('adder');
    // button.onclick = renderPage;
    // main.appendChild(button);
    // maxNumber++;
    // document.getElementById("form-edit").onsubmit = (e) => {
    //     console.log(event);
    // }
    let xhr =  new XMLHttpRequest();
    const b1 = new board([], 1, 0, 1);
}

class board{
    constructor(elems, zIndex, MaxNumber, id, name) {
        this.elems = elems;
        this.zIndexAct = zIndex;
        this.maxNumber = MaxNumber;
        this.name = name;
        this._id = id;
        this.renderPage = (e) => {
            console.log(this.zIndexAct);
            let tmpElement = new page(300,300,'#fff',this.zIndexAct+1,{top: 100, left: 60}, this);
            this.main.appendChild(tmpElement.div);
            this.elems.push(tmpElement);
            this.zIndexAct++;
            this.maxNumber++;
            this.setActMax();
        };
        console.log(this.elems);
        this.main = document.getElementById('main');
        this.adder = document.createElement('div');
        this.adder.classList.add('adder');
        this.adder.onclick = (e) => {this.renderPage(e)};
        this.main.appendChild(this.adder);
        if(this.elems.length > 0) {
            this.elems.forEach((v) => {
                this.main.appendChild(v.div);
            });
        }
        this.setActMax();
    }

    setActMax() {
        document.getElementById("max").innerText = "Ogółem: " + this.maxNumber;
        document.getElementById("act").innerText = "Aktualnie: " + (this.zIndexAct-1);
    }

    getHighestZIndex(element) {
        var tmpzIndex = element.zIndex;
        console.log('tablcia - zIndex: ', this.elems);
        // var zIndexTab = this.elems.map((v) => {
        //     return v.zIndex;
        // })
        // var ind = Math.max(...zIndexTab);
        // this.elems.forEach((v, i) => {
        //     if(v.zIndex>tmpzIndex)
        //         this.elems[i].newzIndex = v.zIndex--;
        // });
        // element.newzIndex = ind;
        this.elems = this.elems.map(v => {
            if(v.zIndex < tmpzIndex)
                return v;
            else if(v == element) {
                v.zIndex = this.zIndexAct;
                v.setProperts();
                return v
            } else{
                v.zIndex = v.zIndex-1;
                v.setProperts();
                return v
            }
        })

        console.log('tablica: ', this.elems)

    }
}

class page{
    constructor(width, height, color, zIndex, position, parent) {
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.zIndex = zIndex;
        this.background = color;
        this.top = position.top;
        this.left = position.left;
        this.div = document.createElement('div');
        this.text = document.createElement('div');
        this.delete = document.createElement('div');
        this.edit = document.createElement('div');
        this.resize = document.createElement('div');
        this.resize.classList.add('resize');
        this.delete.classList.add('delete');
        this.edit.classList.add('edit');
        this.div.style.top = this.top + 'px';
        this.div.style.left = this.left + 'px';
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';
        this.div.classList.add('page');
        this.div.style.zIndex = zIndex;
        this.div.style.backgroundColor = this.background;
        this.div.appendChild(this.delete);
        this.div.appendChild(this.resize);
        this.div.appendChild(this.edit);
        this.div.appendChild(this.text);
        this.div.onmousedown = (e) => this.handleMouseDown(e);
        this.div.addEventListener('mouseup', () => this.handleMouseUp());
        this.text.innerHTML = "Edit Me!";
        this.text.classList.add("text");
        this.resize.addEventListener('mousedown', this.handleMouseDownResize.bind(this));
        this.resize.addEventListener('mouseup',  (e) => this.handleMouseUpResize(e));
        this.delete.onclick = () => this.handleDelete();
        this.edit.onclick = (e) => this.handleEdit(e);
        this.defTop = this.top;
        this.defLeft = this.left;
        this.parent.setActMax();
    }

    set newzIndex(index) {
        this.zIndex = index;
        this.setProperts();
    }

    setProperts() {
        this.div.style.top = this.top + 'px';
        this.div.style.left = this.left + 'px';
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';
        this.div.style.zIndex = this.zIndex;
        this.div.style.backgroundColor = this.background.color;
        this.parent.setActMax();
    }

    handleMouseDownResize(e) {
        this.div.onmousedown = null;
        window.onmouseup = this.handleMouseUp.bind(this);
        // this.defTop = e.clientY - this.top;
        // this.defLeft = e.clientX - this.left;
        // console.log(this.defTop, this.defLeft);
        this.parent.getHighestZIndex(this);
        // let tmpzIndex = this.zIndex;
        // this.newzIndex = toSwap.zIndex;
        // // toSwap.newzIndex = tmpzIndex;
        // console.log('this: ', this);
        window.onmousemove = (e) => this.handleResize(e);
    }

    handleResize(e) {
        this.height = (e.clientY - this.top);
        this.width = (e.clientX - this.left);
        this.setProperts();
    }

    handleMove(e) {
        // console.log(this, e);
        this.top = (e.clientY - this.defTop);
        this.left = (e.clientX - this.defLeft);
        // console.log(this.top,this.left);
        this.setProperts();
    }

    // logTop()

    handleMouseDown(e) {
        // let that = this;
        // var _this = this;
        // console.log(this, this);
        // console.log('aha', this, getHighestZIndex(this));
        this.defTop = e.clientY - this.top;
        this.defLeft = e.clientX - this.left;
        this.parent.getHighestZIndex(this);
        // let tmpzIndex = this.zIndex;
        // this.newzIndex = toSwap.zIndex;
        // toSwap.newzIndex = tmpzIndex;
        // console.log('this: ', this);
        window.onmousemove = (e) => this.handleMove(e);
    }

    handleMouseUp(e) {
        this.defTop = 0;
        this.defLeft = 0;
        this.div.onmousedown = (ev) => this.handleMouseDown(ev);
        window.onmousemove = null;
        window.onmouseup = null;
    }

    handleMouseUpResize(e) {
        this.defTop = 0;
        this.defLeft = 0;
        this.div.onmousedown = (ev) => this.handleMouseDown(ev);
        window.onmousemove = null
    }

    handleDelete() {
        console.log('tab: ', this.parent.elems);
        this.parent.elems.splice(this.parent.elems.indexOf(this),1);
        // delete this;
        this.parent.main.removeChild(this.div)
        this.parent.elems = this.parent.elems.map((v, i) => {
            if(v!=this)
                return v
        });
        this.parent.getHighestZIndex(this);
        this.parent.zIndexAct--;
        this.parent.setActMax();
        console.log('tablica: ', this.parent.elems);
        // console.log('zIndexHolder: ', zIndexHolder);
    }

    handleEdit(e) {
        document.getElementById('full-screen').classList.add('show');
        let ala = this.text.innerHTML;
        e.stopPropagation();
        tinyMCE.init({
            selector: "#editor",  // change this value according to your HTML
            plugins: "save",
            toolbar: "undo redo | bold italic underline strikethrough fontsizeselect | bullist numlist | link | save cancel",
            save_oncancelcallback: function () {
                tinyMCE.remove('#editor');
                document.getElementById('full-screen').classList.remove('show')
            },
            save_onsavecallback: () => {
                let val = tinyMCE.activeEditor.getContent();
                this.text.innerHTML = val;
                tinyMCE.remove('#editor');
                document.getElementById('full-screen').classList.remove('show');
            },
            init_instance_callback: (editor) => {
                editor.setContent(ala)
            }
        });
    }


}

window.onload = init;
