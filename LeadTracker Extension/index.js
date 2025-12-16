let myLeads =[]

const inputEl= document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputbtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")

const tabBtn = document.getElementById("tab-btn") 

const leadsFromLocalStroage = JSON.parse (localStorage.getItem("myLeads"))

if (leadsFromLocalStroage){
    myLeads = leadsFromLocalStroage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true },function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })

})


function render(leads){
let listitems = ""
for (let i =0; i < leads.length; i++ ){
    listitems += `
    <li>
        <a target='_blank' href ='${leads[i]}'>
            ${leads[i]}
        </a>
    </li>
    `        

}
ulEl.innerHTML = listitems
}


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})



inputbtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads) )
    render(myLeads)
})


