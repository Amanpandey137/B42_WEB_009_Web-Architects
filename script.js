document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-track");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    const slideWidth = document.querySelector(".slide").offsetWidth + 10
    const scrollAmount = slideWidth * 4; 

    let currentPosition = 0;

    nextBtn.addEventListener("click", function () {
        if (currentPosition > -(slideWidth * 7)) { 
            currentPosition -= scrollAmount;
            slider.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    prevBtn.addEventListener("click", function () {
        if (currentPosition < 0) { 
            currentPosition += scrollAmount;
            slider.style.transform = `translateX(${currentPosition}px)`;
        }
    });
});

document.addEventListener("DOMContentLoaded",function () {
    let dest2=document.querySelector(".dest2")
    let prev = document.getElementById("prevBtn")
    let next = document.getElementById("nextBtn")

    let slide=document.querySelector(".slideDest").offsetWidth+10
    let scrollAmount=slide*4

    let curPosition=0

    next.addEventListener("click",function(){
            prevBtn.style.display="flex"
        if(curPosition > -(slide * 5)){
            curPosition-=scrollAmount;
            dest2.style.transform=`translateX(${curPosition}px)`
        }
    })
    prev.addEventListener("click",function(){
        if (curPosition < 0) { 
            curPosition += scrollAmount;
            dest2.style.transform = `translateX(${curPosition}px)`;
        }
    })
})
