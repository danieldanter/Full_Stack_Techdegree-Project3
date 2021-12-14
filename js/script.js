console.log("hello World");

//************ focus on name elment by page load *****************************
var userName =document.getElementById('name');
userName.focus();

//************ Job Role **************************************************
var other =document.getElementById('other-job-role');
other.style.display = "none";


var sel = document.getElementById('title');
sel.addEventListener ("change", function () {
    if(this.value === "other"){
        other.style.display = "block";
    }else{
        other.style.display = "none";
    }
});

//************ shirt colors**************************************************

var shirtColor =document.getElementById('shirt-colors');
shirtColor.style.display = "none";

var color =document.getElementById('color');


//************ shirt design**************************************************
var selColor = document.getElementById('design');
selColor.addEventListener ("change", function () {

    color.options[4].removeAttribute("selected");
    color.options[1].removeAttribute("selected");

    if(this.value === "js puns"){
      
  
            color.options[1].setAttribute("selected", true);
            
            Array.from(color.options).forEach(function(option_element) {
                
                
                if(option_element.getAttribute('data-theme') ==="js puns"){
 
                    option_element.hidden = false;
                
                }else{
                    option_element.hidden = true;
   
                }             
            })
     

    }else{
        color.options[4].setAttribute("selected", true);

        Array.from(color.options).forEach(function(option_element) {
        
                      
            if(option_element.getAttribute('data-theme') ==="heart js"){

               option_element.hidden = false;
                       
            }else{
 
                option_element.hidden = true;
            }
           
        })
   
    }
    shirtColor.style.display = "block";
});


//************ activities**************************************************
var sum = 0;

var activities = document.querySelectorAll(".activities-box input[type='checkbox']");
activities.forEach(function(item) {
  item.addEventListener('click', function() {
    var attribute = this.getAttribute("data-cost");
    
    sum = [...document.querySelectorAll('#activities-box input:checked')].map(e => parseInt(e.getAttribute("data-cost"))).reduce((partial_sum, a) => partial_sum + a, 0);
    document.getElementById('activities-cost').innerHTML = `Total: $${sum}`;

  })
})

//************ payment**************************************************

var payment =document.getElementById('payment');
payment.options[1].setAttribute("selected", true);

var credit_cart =document.getElementById('credit-card');
var bitcoin =document.getElementById('bitcoin');
var paypal =document.getElementById('paypal');

credit_cart.style.display = "block"; 
bitcoin.style.display = "none";
paypal.style.display = "none";

var selPay =1; 

payment.addEventListener ("change", function () {
   
    if(this.value === "credit-card"){
        selPay = 1;
        credit_cart.style.display = "block"; 
        bitcoin.style.display = "none";
        paypal.style.display = "none";
    } else if(this.value === "bitcoin"){
        selPay = 2;
        credit_cart.style.display = "none"; 
        bitcoin.style.display = "block";
        paypal.style.display = "none";

    } else if (this.value === "paypal"){
        selPay = 3;
        credit_cart.style.display = "none"; 
        bitcoin.style.display = "none";
        paypal.style.display = "block";

    }

});


//************ valitation **************************************************

var field =document.getElementsByTagName('form');
var email =  document.getElementById('email');
var activity =  document.getElementById('activities-box');
var cc_num =document.getElementById('cc-num');
var zip =document.getElementById('zip');
var cvv =document.getElementById('cvv');

field[0].addEventListener('submit', (e) => {
    
    if(!checkInputs()){
        e.preventDefault();
    }else{
        //e.preventDefault();
        console.log("reload")
        //window.location.reload();
    }
})  


function checkInputs(){

    var allGood = true;

    const userValue = userName.value;
    const emailValue = email.value;
    const cc_value = cc_num.value;
    const cvv_value = cvv.value;
    const zip_value = zip.value;


    if(userValue === ''){
        allGood = false;
        setErrorFor(userName);
    }else{
        
        setSuccessFor(userName)
    }

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(!regex.test(emailValue)){
        allGood = false;
        setErrorFor(email);
    }else{
        setSuccessFor(email)
    }
    console.log("sum")
    console.log(sum)
    if(sum === 0){
        allGood = false;
        setErrorFor(activity);
    }else{
        setSuccessFor(activity)
    }


    if(selPay === 1){

        let cc_regex = new RegExp('^[0-9]{13}([0-9]{3})?$');
        if(!cc_regex .test(cc_value)){
            allGood = false;
            setErrorFor(cc_num);
        }else{
            setSuccessFor(cc_num)
        }

        let cvv_regex = new RegExp('^[0-9]{3}$');
        if(!cvv_regex .test(cvv_value)){
            allGood = false;
            setErrorFor(cvv);
        }else{
            setSuccessFor(cvv)
        }

        let zip_regex = new RegExp('^[0-9]{5}$');
        if(!zip_regex .test(zip_value)){
            allGood = false;
            setErrorFor(zip);
        }else{
            setSuccessFor(zip)
        }



    }
    console.log(selPay);
    return allGood;
}

//************ validation helper functions **************************************************

function setErrorFor(input) {
    const inputParent = input.parentElement;
    const inputLastChild = inputParent.lastElementChild;
    inputLastChild.style.display = "block";
    inputParent.classList.remove("valid");
    inputParent.classList.add("not-valid");
    
}

function setSuccessFor(input) {
    const inputParent = input.parentElement;
    const inputLastChild = inputParent.lastElementChild;
    inputParent.classList.remove("not-valid");
    inputParent.classList.add("valid");
    inputLastChild.style.display = "none";

}




