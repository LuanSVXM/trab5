let input = document.querySelector("input");
let url = [];
let o = 0;
let select = document.querySelector("select");
let tocar = document.getElementById("trocar");
let AV= document.querySelector("video");
let proxima = document.getElementById("depois");
let loop = document.getElementById("loop");
let op = 1
let antes = document.getElementById("antes");
let skip = document.getElementById("skip")
let sk = 1

input.addEventListener("change",function () {
    let name =""
    for (i=12; i < input.value.length ; i++ ) {
        name+=input.value[i];
    }
    if (name !=""){
         url[o] = input.files[0];
        select.innerHTML += `<option>${name}</option>`;
    o++;
}
}
)

tocar.addEventListener("click",function() {
    if (select.selectedIndex > -1) {
        let reader = new FileReader();
        reader.addEventListener('load', function (e) {
            AV.src = reader.result;
            AV.play();
        });
        reader.readAsDataURL(url[select.selectedIndex]);
    }
});

proxima.addEventListener('click',function () {
    if(escolhas.selectedIndex != -1){
        let a = escolhas.selectedIndex
        if(a === escolhas.length-1){
            let reader = new FileReader();
            reader.addEventListener('load', function (e) {
                AV.src = reader.result;
                AV.play();
            });
            reader.readAsDataURL(url[0]);
            escolhas[0].selected = true
        }else{
            let reader = new FileReader();
            reader.addEventListener('load', function (e) {
                AV.src = reader.result;
                AV.play();
            });
            reader.readAsDataURL(url[escolhas.selectedIndex+1]);
            escolhas[escolhas.selectedIndex + 1].selected =true;

        }
        
    }
})

loop.addEventListener("click",function () {
    if (select.selectedIndex != -1 && AV.seekable.length > 0 ){
    op++;
    if(op%2 === 0){
        loop.style.color= "blue";
        AV.loop = true
    }else{
        loop.style.color = "black";
        AV.loop = false
    }
    
}
    
})
antes.addEventListener('click',function(){
    if (escolhas.selectedIndex != -1) {
        let a = escolhas.selectedIndex
        if (a === 0) {
            let reader = new FileReader();
            reader.addEventListener('load', function (e) {
                AV.src = reader.result;
                AV.play();
            });
            reader.readAsDataURL(url[escolhas.length-1]);
            escolhas[escolhas.length-1].selected = true
        } else {
            let reader = new FileReader();
            reader.addEventListener('load', function (e) {
                AV.src = reader.result;
                AV.play();
            });
            reader.readAsDataURL(url[escolhas.selectedIndex -1]);
            escolhas[a-1].selected = true;

        }

    }
})
skip.addEventListener("click",function(){
    if (escolhas.selectedIndex != -1 ){
        sk++
        if(sk%2 === 0){
            skip.style.color = "blue";
        }else{
            skip.style.color = "black";
        }
    }
})
         AV.addEventListener("ended",function(){
                                    if (AV.loop === false && skip.style.color === "blue"){
                                        proxima.click();
                                    }
                                })