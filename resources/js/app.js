

let like_button = document.querySelectorAll('.like_button')

function increasetweet(tweet){
    console.log("i have been called")    
}

like_button.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        console.log('Like button has been clicked')
        e.style.color = red;
    })
})

function myFunction() {
    var x = document.getElementById("comment-section");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
let commentButton = document.querySelectorAll('.commentButton')
commentButton.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        var x = document.querySelectorAll(".comment_section")
        if(x.style.display === "none"){
            x.style.display = "block";
        }
        else{
            x.style.display = "none";
        }
    })
})
