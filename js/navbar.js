const arrow=document.querySelector(".arrow");
const collapse = document.querySelector(".belo-nav");

arrow.addEventListener("click",()=>{
    if(!arrow.classList.contains("clicked")){
        arrow.classList.add("clicked");
        collapse.style.height = "60px"
    }
    else{
        arrow.classList.remove("clicked");
        collapse.style.height = ""
    }
})

