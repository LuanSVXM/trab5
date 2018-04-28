const input = document.querySelector('input');
const url = [];
let o = 0;
const select = document.querySelector('select');
const tocar = document.getElementById('trocar');
const AV= document.querySelector('video');
const proxima = document.getElementById('depois');
const loop = document.getElementById('loop');
let op = 1;
const antes = document.getElementById('antes');
const skip = document.getElementById('skip');
let sk = 1;
const escolhas = document.getElementById('escolhas');

input.addEventListener('change', function() {
    let name ='';
    for (let i=12; i < input.value.length; i++ ) {
        name+=input.value[i];
    }
    if (name !=='') {
        url[o] = input.files[0];
        select.innerHTML += `<option>${name}</option>`;
        o++;
    }
}
);

tocar.addEventListener('click', function() {
    if (select.selectedIndex > -1) {
        const reader = new FileReader();
        reader.addEventListener('load', function(e) {
            AV.src = reader.result;
            AV.play();
        });
        reader.readAsDataURL(url[select.selectedIndex]);
    }
});

proxima.addEventListener('click', function() {
    if (escolhas.selectedIndex !== -1) {
        const a = escolhas.selectedIndex;
        if (a === escolhas.length-1) {
            const reader = new FileReader();
            reader.addEventListener('load', function(e) {
                AV.src = reader.result;
                AV.play();
            });
            reader.readAsDataURL(url[0]);
            escolhas[0].selected = true;
        } else {
            const reader = new FileReader();
            reader.addEventListener('load', function(e) {
                AV.src = reader.result;
                AV.play();
            });
            reader.readAsDataURL(url[escolhas.selectedIndex+1]);
            escolhas[escolhas.selectedIndex + 1].selected =true;
        }
    }
});

loop.addEventListener('click', function() {
    if (select.selectedIndex !== -1 && AV.seekable.length > 0 ) {
        op++;
        if (op%2 === 0) {
            loop.style.color= 'blue';
            AV.loop = true;
        } else {
            loop.style.color = 'black';
            AV.loop = false;
        }
    }
});
antes.addEventListener('click', function() {
    if (escolhas.selectedIndex !== -1) {
        const a = escolhas.selectedIndex;
        if (a === 0) {
            const reader = new FileReader();
            reader.addEventListener('load', function(e) {
                AV.src = reader.result;
                AV.play();
            });
            reader.readAsDataURL(url[escolhas.length-1]);
            escolhas[escolhas.length-1].selected = true;
        } else {
            const reader = new FileReader();
            reader.addEventListener('load', function(e) {
                AV.src = reader.result;
                AV.play();
            });
            reader.readAsDataURL(url[escolhas.selectedIndex -1]);
            escolhas[a-1].selected = true;
        }
    }
});
skip.addEventListener('click', function() {
    if (escolhas.selectedIndex !== -1 ) {
        sk++;
        if (sk%2 === 0) {
            skip.style.color = 'blue';
        } else {
            skip.style.color = 'black';
        }
    }
});
AV.addEventListener('ended', function() {
    if (AV.loop === false && skip.style.color === 'blue') {
        proxima.click();
    }
});
