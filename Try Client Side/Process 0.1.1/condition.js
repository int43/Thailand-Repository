function message(){
    let input = document.getElementById("inputscore");
    let output = document.getElementById("outputscore");
    if(input.value>=0 & input.value<=100){
        if(input.value>=80){
            output.innerHTML = "Grade A";
        }
        if(input.value>=70 & input.value<80){
            output.innerHTML = "Grade B";
        }
        if(input.value>=60 & input.value<70){
            output.innerHTML = "Grade C";
        }
        if(input.value>=50 & input.value<60){
            output.innerHTML = "Grade D";
        }
        if(input.value<50){
            output.innerHTML = "Grade F";
        }
    }
    else{
        output.innerHTML = " ";
        let altMessage = "Alert!!   The entered score can't determine the grade.";
        alert(altMessage);
    }
    
}