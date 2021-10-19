//check if there is local storage color-option
let maincolors=localStorage.getItem("saved-color");
if(maincolors !== null){
  document.documentElement.style.setProperty("--maincolor",maincolors);
  //delete class active from local storage li and add it to the selected color
  document.querySelectorAll(".color-list li").forEach((element)=>{
    element.classList.remove("active");
    if(element.dataset.color == maincolors)
    element.classList.add("active");
  });
 
}

// click on settings icon to spin and open
let myicon = document.querySelector(".fa-gear"),
    mysettingbox= document.querySelector(".settings-box");
    myicon.onclick=function(){
      this.classList.toggle("fa-spin");
      mysettingbox.classList.toggle("open");
    }
    
// switch colors
const colorsli = document.querySelectorAll(".color-list li");

colorsli.forEach( (li)=> {
  li.addEventListener("click",(e)=>{
    document.documentElement.style.setProperty("--maincolor",e.target.dataset.color);
    //set color on local storage
    localStorage.setItem("saved-color",e.target.dataset.color);
    //remove active class from all children
    document.querySelectorAll(".color-list li").forEach((element)=>{
      element.classList.remove("active");
    });
    //add class active
    e.target.classList.add("active");
  })
})
// switch background random options
const brandom = document.querySelectorAll(".random-option span");
//random background option
let backgroundoption = true;
//variable to control the interval
let bginterval;
let bglocalitem = localStorage.getItem("bg-option");
if(bglocalitem !== null){
  //remove class active
  document.querySelectorAll(".random-option span").forEach((element)=>{
    element.classList.remove("active");
  })
   //add class active
  if(bglocalitem === "true"){
    backgroundoption = true ;
    document.querySelector(".random-option  .Yes").classList.add("active");
    randomimg();
  }else{
    backgroundoption = false;
    document.querySelector(".random-option  .No").classList.add("active");
  }
 
}

brandom.forEach( (span)=> {
  span.addEventListener("click",(e)=>{
    //remove active class from all children
    e.target.parentElement.querySelectorAll(".active").forEach((element)=>{
      element.classList.remove("active");
    });
    //add class active
    e.target.classList.add("active");
    if (e.target.dataset.image=="Yes"){
      backgroundoption=true;
      randomimg();
      localStorage.setItem("bg-option", true);
    }else{
      backgroundoption=false;
      clearInterval(bginterval);
      localStorage.setItem("bg-option", false);
    }
  })
})

// select random landing page image
let landinpage= document.querySelector(".landing-page"),
imgarray =["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];
landinpage.style.backgroundImage="url('images/3.jpg')";
// function to random images
function randomimg(){
  if (backgroundoption == true){
    bginterval = setInterval(() => {
      let randomnum =Math.floor(Math.random() * imgarray.length);
      landinpage.style.backgroundImage= 'url("images/' + imgarray[randomnum] +'")'; 
    }, 5000);
  }
}

// select skills selector
let ourskills = document.querySelector(".skills");
window.onscroll= function(){
  let skilloffsettop = ourskills.offsetTop;// the space uptop the item 
  let skilloffsetheight = ourskills.offsetHeight;//the item height
  let windowheight = this.innerHeight;//inner height the size of the screen infront of you
  let windowscroll = this.pageYOffset;// give the position where u scrolling up or down in the page
  // console.log(skilloffsettop+"skillstop");
  // console.log(skilloffsetheight+"skillsheight");
  // console.log(windowheight+"innerwindow");
  // console.log(windowscroll+"scrollin position");
  if (windowscroll > skilloffsettop + skilloffsetheight - windowheight){
    let allskills = document.querySelectorAll(".skill-box .skill-progress span");
    allskills.forEach( (skills) =>{
      skills.style.width = skills.dataset.progress;
    })
   
  }
}

//create popup with the image
let ourgallery = document.querySelectorAll(".gallery img");
ourgallery.forEach((img)=>{
  img.addEventListener("click",(e)=>{
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupbox = document.createElement("div");
    popupbox.className="popup-box";
    let myimg = document.createElement("img");
    myimg.src= img.src;
    popupbox.appendChild(myimg);
    document.body.appendChild(popupbox);

    // show the "alt" for the image in the pop-up box
if (myimg.alt !== null){
  let imagehead = document.createElement("h3");
  let imagetext = document.createTextNode(img.alt);
   imagehead.appendChild(imagetext);
   popupbox.prepend(imagehead);
  }
  //create closing x span
  let closespan = document.createElement("span");
  let textspan = document.createTextNode("x");
  closespan.appendChild(textspan);
  closespan.className = "close-span";
  popupbox.appendChild(closespan);

  });
});
//close popup-box
document.addEventListener("click",(e)=>{
  if(e.target.className =="close-span"){
  e.target.parentElement.remove();
  document.querySelector(".popup-overlay").remove();
  }
})

// select all bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullet");
//select all links
const alllinks = document.querySelectorAll(".landing-page .links a");
function scrolltosection(element){
  element.forEach((ele)=>{
   ele.addEventListener("click", (e)=>{
     e.preventDefault();
     document.querySelector(e.target.dataset.section).scrollIntoView({
       behavior: "smooth"
     })
   })
  })
}

scrolltosection(allbullets);
scrolltosection(alllinks);


 let sss = document.querySelectorAll(".landing-page .links a ");
sss.forEach((e)=>{
  e.addEventListener("click",(el)=>{
    sss.forEach((del)=>{
      del.classList.remove("active");
    })
    el.target.classList.add("active");
  })
  
})
//local storage for show bullets
let myspan = document.querySelectorAll(".bullets-option span");
let  locals = localStorage.getItem("storage-name");
let mybullets = document.querySelector(".nav-bullets");
if(locals !== null){
  myspan.forEach((span)=>{
    span.classList.remove("active");
  })
  if (locals == "block"){
    mybullets.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  }else{
    mybullets.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
};
//show or hide bullets



myspan.forEach((span)=>{
  span.addEventListener("click",(e)=>{
    myspan.forEach((es)=>{
      es.classList.remove("active");
    })
    if(span.dataset.display == "show"){
        mybullets.style.display = "block";
        localStorage.setItem("storage-name","block");
    }else{
      mybullets.style.display = "none";
      localStorage.setItem("storage-name","none");
    }
    
    e.target.classList.add("active");
  })
})

let reset = document.querySelector(".reset");
reset.onclick = function(){
//  localStorage.clear();      //remove the whole localstorage
 localStorage.removeItem("saved-color");
 localStorage.removeItem("bg-option");
 localStorage.removeItem("storage-name");
 window.location.reload();
};

//toggle-menu

let mybutton = document.querySelector(".toggle-menu");
let mylinks = document.querySelector(".links");

mybutton.onclick= function(e){
  this.classList.toggle("menu-active");
  mylinks.classList.toggle("open");
  e.stopPropagation();
};
document.addEventListener("click",(e)=>{
  if(e.target !== mylinks && e.target !== mybutton){
   if(mylinks.classList.contains("open")){
     mylinks.classList.toggle("open");
     mybutton.classList.toggle("menu-active");
   }
  }
})
// stop propagation for menu so the links inside the menu be the same click as the menu
mylinks.onclick= function(e){
  e.stopPropagation();
}
