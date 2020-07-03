console.log("Project 6");

//utitlity functions
// 1.utility functions to get DoM element from string
function getElementFromString(string){
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}


//initialize number of parameters
let addedParamCount = 0;

// Hide parametersbox initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";


// if user clicks on params box hide json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click",()=>{
    document.getElementById("requestJsonBox").style.display="none";
    document.getElementById("parametersBox").style.display="block";
})

// if user clicks onjson box hide  params box 
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click",()=>{
    document.getElementById("parametersBox").style.display="none";
    document.getElementById("requestJsonBox").style.display="block";
})

//if the user clicks on plus button  add more
let addParam = document.getElementById("addParam")
addParam.addEventListener("click",()=>{
    let params = document.getElementById("params");
    let string = `<div class="form-row my-2">
                        <label for="URL" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter parameter${addedParamCount + 2} value">
                        </div>
                        <button class="btn btn-primary deleteParam" > - </button>
                 </div>`
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    //add eventlistener to remove elements by clicking - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for(item of deleteParam){
        item.addEventListener("click",(e)=>{
            e.target.parentElement.remove();
        })
    }
    addedParamCount ++;
})

//if user click on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click",()=>{
    //show please wait
    document.getElementById("responsePrism").innerHTML = "Please wait...Fetching response..."
//fetch all the values user has enterd 
let url = document.getElementById("urlField").value;
let requestType = document.querySelector("input[name='requestType']:checked").value;
let contentType = document.querySelector("input[name='contentType']:checked").value;



//if user has used params option collect all the parameters in object
if(contentType=="params"){
    data = {};
    for(let i=0;i<addedParamCount+1;i++){
        if(document.getElementById("parameterKey"+ (i+1)) != undefined) {
        let key = document.getElementById("parameterKey"+ (i+1)).value;
        let value = document.getElementById("parameterValue"+ (i+1)).value;
        data[key] = value;
        }
        
    }
    data = JSON.stringify(data);
}
else{
    data = document.getElementById("requestJsonText").value;
}
console.log("URL:",url)
console.log("requesttype:",requestType)
console.log("contenttype:",contentType)
console.log("data is:",data)

//if the request type is get, invoke fetch api to create a post request
if(requestType == "GET"){
    fetch(url,{
        method:"GET"
    })
    .then(response=>response.text())
    .then((text) =>{
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
    });
}
else{
    fetch(url,{
        method:"POST",
        body: data,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    .then(response=>response.text())
    .then((text) =>{
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
    });
}





})