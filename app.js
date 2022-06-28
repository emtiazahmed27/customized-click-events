const btn=document.querySelector(".btn");
const success=document.querySelector("h1");

const MAX_DOUBLE_CLICK_TIME=500;
let lastClick=0;

btn.addEventListener("DoubleClick",(e)=>{
    console.log("double click", e.detail.timeBetweenClick);
    success.style.opacity="1"
})

//Customized Event Logic
btn.addEventListener("click",(e)=>{
    success.style.opacity="0"
    const timeBetweenClick=e.timeStamp-lastClick;
    if(timeBetweenClick>MAX_DOUBLE_CLICK_TIME){
        lastClick=e.timeStamp;
        return;
    }

    //creating double click events
    const doubleClick=new CustomEvent("DoubleClick",{
        bubbles:true,
        cancelable:true,
        composed:true,
        detail:{
            timeBetweenClick,
        },
    })
    e.target.dispatchEvent(doubleClick)
    lastClick=0;
})