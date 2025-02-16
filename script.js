const BASE_URL =
  "https://api.exchangerate-api.com/v4/latest/";

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const dropdown=document.querySelectorAll(".dropdown select");
const bttn=document.querySelector(" form button");
const msg=document.querySelector(".msg")


for (let select of dropdown){
    for (codes in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = codes
        newOption.value = codes
        if (select.name==="from" && codes==="USD"){
            newOption.selected="selected"
        }else if(select.name==="to" && codes==="INR")
            newOption.selected="selected"
        select.append(newOption)
    }
    select.addEventListener("change", (evt)=>{
        updateflag(evt.target)
    })
}

const updateflag=(element)=>{
    let currCode=element.value;
    let countryCode = countryList[currCode]
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    element.parentElement.querySelector("img").src=newsrc;
}

window.addEventListener("load",()=>{
    updateCurrency()
})
bttn.addEventListener("click",  (evt) =>{
    evt.preventDefault();
    updateCurrency();
});
const updateCurrency= async()=>{
    let amt=document.querySelector(".amount input")
    let Amtvalue =amt.value
    if (Amtvalue==="" || Amtvalue< 1){
        Amtvalue =1
        amt.value=Amtvalue
        alert("Please enter a valid amount")
    }
    const URL=`${BASE_URL}/${fromCurr.value}`
    let response= await fetch(URL);
    let data = await response.json()
    let rate = data.rates[toCurr.value]
    console.log(rate)
    let finalAMt=amt.value*rate
    msg.innerText=`${amt.value} ${fromCurr.value} = ${finalAMt} ${toCurr.value}`
}