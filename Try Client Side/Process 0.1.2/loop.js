function message(){
    let input = document.getElementById("inputnum");
    let output = document.getElementById("outputnum");
    let x=1;
    output.innerHTML = "";
    while(x<=input.value){
        output.innerHTML += x+".Hello ";
        x++;
    }
     
}