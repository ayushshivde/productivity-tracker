let form = document.querySelector("form")
let container = document.querySelector(".container")
let whiteContainer = document.querySelector(".whiteContainer")
let heading = document.querySelector(".whiteContainer h1")
let boxContainer = document.querySelector(".boxContainer")
let cancelChallenge;




let NumberOfDays;
let ChallengeName;


/*
1.take input from form (challengename and number of days)
2. hide the set challenge container and make whitecontainer(grid container) visible
3. dynamically change heading and create a number of box based on days input
4. creation of dialog box then particular box clicked;

*/

form.addEventListener('submit' ,(e)=>{
e.preventDefault();
//take input from form (challengename and number of days)
 ChallengeName = document.querySelector(".ChallengeName").value.trim()
 NumberOfDays = document.querySelector(".NumberOfDays").value.trim()

loadgrid()


})


function loadgrid(){
    //hide the set challenge container and make whitecontainer(grid container) visible
 container.classList.add("hidden")
 whiteContainer.style.display = "flex"
 

//dynamically change heading and create a number of box based on days input
heading.innerHTML = ChallengeName;

for(let i = 1 ; i<=Number(NumberOfDays) ; i++){
    let h1  = document.createElement('h1')
    h1.innerHTML = "Day " + i
    let p = document.createElement('p')
p.innerHTML = "_"
    //div denoted to one box
    let div = document.createElement("div")
    div.id=i
    div.classList.add("box")
    div.append(h1) // h1 ko div(box) me add kare ge
    div.append(p) // p ko bhi div(box) me add kare ge
    boxContainer.append(div) //now box ko boxContainer me dale ge
}



// sare box AlldivBoxes ke aa jaaye ge then each box ko foreach se target karege
let AllDivBoxes  = boxContainer.querySelectorAll(".box")
// console.log(AllDivBoxes)
AllDivBoxes.forEach((box)=>{
    box.addEventListener("click", (e)=>{
        let id  = e.target.id
        //har box ko location variable me store kari
        const boxCordinate = box.getBoundingClientRect();
        console.log(boxCordinate)
        // function ko id or cordinates of box pass kare
       showDialogBox(id , boxCordinate )
       
    })
})


// create cancelchallenge btn and append it into body
 cancelChallenge = document.createElement("button");
cancelChallenge.classList.add(
  "cancelChallenge", "absolute",  "top-10", "left-10",
  "hover:bg-[#E88538]", "hover:text-white", "font-medium",
  "text-black", "text-lg", "p-2", "rounded-lg", "border-black", 
  "border-slate-700",
  "z-50"
);
cancelChallenge.innerHTML = "Cancel Challenge";
document.body.appendChild(cancelChallenge);

cancelChallenge.addEventListener("click" , ()=>{
    cancelChallengeBtnWorking()
})


}












// creation of dialog box then particular box clicked;

function showDialogBox(id ,boxCordinate){
let dialogbox = document.createElement("div");
// sab se phele dialog box html me create kara fir yaha paste kar ke class di ;
dialogbox.classList.add(
    "percentageSetterBox"   ,"relative", "w-65" ,  "h-55" , "bg-white" ,  "p-3"  , "rounded-lg"  , "flex" ,"flex-col" ,"gap-4" ,"shadow-lg"
)
dialogbox.id = `${id}`

//dialog box ka inner html addkara
dialogbox.innerHTML = `
   <div class="firstDiv">
            <h1 class=" text-lg  opacity-80">Day ${id} Progress</h1>
            <p class="opacity-50 text-sm ">Set your completion percentage.</p>
        </div>
        
        <div class="secondDiv">
            <label for="percentageInput" class=" opacity-80">% Percentage</label>
            <input type="number"  value="30" min="0" max="100"  required ="" id="percentageInput"  placeholder="enter your productivity %" class=" mt-1 w-full h-8 bg-[#EDF1F2]  rounded-lg p-2  placeholder:text-sm ">
        </div>
        
        <div class="thirdDiv pt-3 pb-3 flex items-baseline justify-between">
            <input type="range" min="0" max="100" value="30" class="w-25 h-4 " oninput="updatePercentage(this.value , ${id})">
            <button class=" cancelbtn hover:bg-[#E88538] hover:text-white  text-black  p-2  rounded-md">Cancel</button>
            <button class=" savebtn bg-[#E88538] p-2   text-white rounded-md">Save</button>
        </div>
`

//dialog box ki location click box ke below set ki
dialogbox.style.position ="absolute"
dialogbox.style.top = `${window.scrollY + boxCordinate.bottom + 10 }px`
dialogbox.style.left = `${boxCordinate.left}px`

let oldDialogBox = document.querySelector(".percentageSetterBox") 
if (oldDialogBox) oldDialogBox.remove()

document.body.appendChild(dialogbox)




handlingSaveAndCancel(dialogbox , id)


}



function handlingSaveAndCancel(dialogbox ,id){
//handling the save btn 

// sab se phle value nikali percentage input se then box select kiya id ke through box or dialogbox ki id same hai

let savebtn = dialogbox.querySelector(".savebtn");
let box = document.getElementById(`${id}`)
let p  = box.querySelector("p")

savebtn.addEventListener("click" , function(){
    let val = dialogbox.querySelector("#percentageInput").value
if(val>100){
    p.innerHTML = 100+"%"

}else{
    p.innerHTML = val+"%"

}

if(val>=0 && val<35) box.style.backgroundColor="#EF4343"
if(val>=35 && val<70) box.style.backgroundColor="#F7BF18"
if(val>=70 ) box.style.backgroundColor="#21C45D"

dialogbox.remove();
})

//handling cancel btn

let cancelbtn = dialogbox.querySelector(".cancelbtn")
cancelbtn.addEventListener("click", ()=>{
    
    p.innerHTML=0+"%";
    box.style.backgroundColor="#EF4343"
    dialogbox.remove();
})

}









function updatePercentage(val ,id){
   document.querySelector("#percentageInput").value = val
let box = document.getElementById(`${id}`)

let p = box.querySelector("p")
p.innerHTML = val+"%"

if(val>=0 && val<35) box.style.backgroundColor="#EF4343"
if(val>=35 && val<70) box.style.backgroundColor="#F7BF18"
if(val>=70 && val<=100) box.style.backgroundColor="#21C45D"

}


function cancelChallengeBtnWorking(){
 whiteContainer.style.display = "none"
 container.classList.remove("hidden")
 boxContainer.innerHTML="" //andar ke sare box remove kar doo
 cancelChallenge.remove()

}