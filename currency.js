const BASE_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";

const dropdown= document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

// for (code in countryList){         // for (key in object)
//     console.log(code, countryList[code]);
// }


// adding the list of countries
for(let select of dropdown){
    for (currCode in countryList){       
       let newOption= document.createElement("option");
       newOption.innerText= currCode;
       newOption.value= currCode;

       if(select.name==="from" && currCode==="USD"){
        newOption.selected= "selected";
       } 
       else if(select.name==="to" && currCode==="INR"){
        newOption.selected= "selected";
       } 

       select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

window.addEventListener("load", ()=>{
    updateExchangeRate();
})


// changing the flag of every country
updateFlag=(element)=>{
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src= newSrc;
}


// fetching the API for currency conversion thru exchg btn
btn.addEventListener("click", (evt)=>{
   evt.preventDefault();
   updateExchangeRate();
   
});

updateExchangeRate= async() =>{
    let amount= document.querySelector(".amount input");
   let amtVal= amount.value;
   if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value="1";
   }

   // console.log(fromCurr.value, toCurr.value);
   const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   let response= await fetch(URL);
   let data= await response.json();
   let rate= data[toCurr.value.toLowerCase()];
   console.log(rate);

   let finalAmount= amtVal* rate;
   msg.innerText= `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;

}


