let searchBottom = document.getElementById("searchBottom")
let categoiresBottom = document.getElementById("categoiresBottom")
let areaBottom = document.getElementById("areaBottom")
let IngredientsBottom = document.getElementById("IngredientsBottom")
let contactBottom = document.getElementById("contactBottom")




async function getdata(searchData = "") {   

        let  box=""
    box = `            <span class="loader"></span>`
        document.getElementById("meals1").innerHTML = box

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`)
    let result = await data.json()
    console.log(result);
    return result;
}

function displayMealsImage(data) {
    

    let box = ""

    for (let i = 0; i < data.meals.length; i++) {
        box += ` <div class="col-md-3 ">
            
                        <div class=" overflow-hidden picture position-relative rounded "  onclick="displayDetails(${i})" >
                            <img src="${data.meals[i].strMealThumb}" class="w-100 d-block  rounded" alt="">
                            <div class=" position-absolute  start-0 bottom-0 end-0 z-3 w-100 h-100 rounded layer d-flex align-items-center p-2 ">
                 
                    
                            
                            <p class="text-black">${data.meals[i].strMeal}</p></div>
                        </div>
                        </div>`
// console.log(box);
        document.getElementById("meals1").innerHTML = box

    }

}

async function displayDetails(index) {


    let data = await getdata()

    let box = ` 
        <div class="col-md-4 py-3   mb-4">
                    <img src="${data.meals[index].strMealThumb}" class="w-100 rounded ">
                    <h2>${data.meals[index].strMeal} </h2>
                   </div>
                   <div class="col-md-8 py-3 " >
                    <h2>Instructions</h2>
                    <p>${data.meals[index].strInstructions}</p>
                    <h2>Category  : ${data.meals[index].strArea}</h2>
                    <h2>Area : ${data.meals[index].strCategory} </h2>
                    <h2>Recipes :</h2>
                    <div>`


    box += `
                        
                        <ul class="ps-0">`


    for (let i = 1; i < 20; i++) {


        let ingredient = 'strIngredient' + i
        let dataMealsIngredient = `data.meals[index].${ingredient}`
        let measure = `strMeasure` + i
        let dataMealsMeasure = `data.meals[index].${measure}`



        if (eval(dataMealsIngredient) !== "") {

            console.log(eval(dataMealsMeasure) + eval(dataMealsIngredient));
            box += `
                                <li class="p-2 rounded">${eval(dataMealsMeasure) + " " + eval(dataMealsIngredient)}</li>
                
                `
        }


    }

    box += `
                        </ul>
                    </div>
                    <div>`

    box += `
                        <h2>Tags :</h2>
                        <ul class="ps-0">
                         
                                <li class="p-2 rounded">${data.meals[index].strTags}</li>
                         
                        </ul>
                    </div>
    
                    <ul class="ps-0">
                        <li class="bg-success p-2 rounded"><a href="${data.meals[index].strSource}" target="_blank" >Source</a></li>
                        <li class="bg-danger p-2 rounded"><a href="${data.meals[index].strYoutube}" target="_blank">Youtube</a></li>
                    </ul>
                
                </div>
                
                
        `


    document.getElementById("meals1").innerHTML = box

}

function myNav() {
    $(document).ready(function () {
        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
            isClosed = false;

        trigger.click(function () {
            hamburger_cross();
        });

        function hamburger_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });
    });
}


categoiresBottom.addEventListener("click",
   async function(){
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let result = await data.json()
    displayMealsImage2(result)
console.log(result);
    }
)

async function displayMealsImage2(data) {
    

    let box = ""
    for (let i = 0; i < data.categories.length; i++) {
        let known= await data.categories[i].strCategory
        
        box += ` <div class="col-md-3 ">
            
                        <div class=" overflow-hidden picture position-relative rounded " id ="${known}" onclick=" displayMealsImage3(this.id)" >
                            <img src="${data.categories[i].strCategoryThumb}" class="w-100 d-block  rounded" alt="">
                            <div class=" position-absolute text-black start-0 bottom-0 end-0 z-3 w-100 h-100 rounded layer layer-font  text-center p-2 ">
                 
                    
                            <h5>${data.categories[i].strCategory}</h5>
                            <p class="text-black ">${data.categories[i].strCategoryDescription.split(" ")
                                .slice(0, 20)
                                .join(" ")}</p>
                            </div>
                        </div>
                        </div>`
// console.log(box);
console.log(known);
        document.getElementById("meals1").innerHTML = box

    }

}

async function displayMealsImage3(data3) {
    
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data3}`)
    let result = await data.json()
    
    
    let box = ""

    for (let i = 0; i < result.meals.length; i++) {
        box += ` <div class="col-md-3 ">
            
                        <div class=" overflow-hidden picture position-relative rounded "  onclick="displayDetails2(${result.meals[i].idMeal})" >
                            <img src="${result.meals[i].strMealThumb}" class="w-100 d-block  rounded" alt="">
                            <div class=" position-absolute text-black start-0 bottom-0 end-0 z-3 w-100 h-100 rounded layer   text-center p-2 ">
                 
                    
                            <h5>${result.meals[i].strMeal}</h5>
                            <p class="text-black ">${result.meals[i].strMeal}</p>
                            </div>
                        </div>
                        </div>`
// console.log(box);
        document.getElementById("meals1").innerHTML = box

    }

}

async function displayDetails2(index) {


    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`)
    let data = await result.json()
    

    let box = ` 
        <div class="col-md-4 py-3   mb-4">
                    <img src="${data.meals[0].strMealThumb}" class="w-100 rounded ">
                    <h2>${data.meals[0].strMeal} </h2>
                   </div>
                   <div class="col-md-8 py-3 " >
                    <h2>Instructions</h2>
                    <p>${data.meals[0].strInstructions}</p>
                    <h2>Category  : ${data.meals[0].strArea}</h2>
                    <h2>Area : ${data.meals[0].strCategory} </h2>
                    <h2>Recipes :</h2>
                    <div>`


    box += `
                        
                        <ul class="ps-0">`


    for (let i = 1; i < 20; i++) {


        let ingredient = 'strIngredient' + i
        let dataMealsIngredient = `data.meals[0].${ingredient}`
        let measure = `strMeasure` + i
        let dataMealsMeasure = `data.meals[0].${measure}`



        if (eval(dataMealsIngredient) !== "") {

            console.log(eval(dataMealsMeasure) + eval(dataMealsIngredient));
            box += `
                                <li class="p-2 rounded">${eval(dataMealsMeasure) + " " + eval(dataMealsIngredient)}</li>
                
                `
        }


    }

    box += `
                        </ul>
                    </div>
                    <div>`

    box += `
                        <h2>Tags :</h2>
                        <ul class="ps-0">
                         
                                <li class="p-2 rounded">${data.meals[0].strTags}</li>
                         
                        </ul>
                    </div>
    
                    <ul class="ps-0">
                        <li class="bg-success p-2 rounded"><a href="${data.meals[0].strSource}" target="_blank" >Source</a></li>
                        <li class="bg-danger p-2 rounded"><a href="${data.meals[0].strYoutube}" target="_blank">Youtube</a></li>
                    </ul>
                
                </div>
                
                
        `


    document.getElementById("meals1").innerHTML = box

}

areaBottom.addEventListener("click",
   async function(){

        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let result = await data.json()
        let box = ""
        
        for (let i = 0; i < result.meals.length; i++) {
            // let known= await data.categories[i].strCategory
            
            box += ` <div class="col-md-3 text-white  text-center" id="${result.meals[i].strArea}" onclick="displayMealsImage5(this.id)">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h4>${result.meals[i].strArea}</h4>
                            </div>`
    // console.log(box);
    // console.log(known);
            document.getElementById("meals1").innerHTML = box
    
        }
    
    }
)   
async function displayMealsImage5(data3) {
    
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${data3}`)
    let result = await data.json()
    
    
    let box = ""

    for (let i = 0; i < result.meals.length; i++) {
        box += ` <div class="col-md-3 ">
            
                        <div class=" overflow-hidden picture position-relative rounded "  onclick="displayDetails2(${result.meals[i].idMeal})" >
                            <img src="${result.meals[i].strMealThumb}" class="w-100 d-block  rounded" alt="">
                            <div class=" position-absolute text-black start-0 bottom-0 end-0 z-3 w-100 h-100 rounded layer   text-center p-2 ">
                 
                    
                            <h5>${result.meals[i].strMeal}</h5>
                            <p class="text-black ">${result.meals[i].strMeal}</p>
                            </div>
                        </div>
                        </div>`
// console.log(box);
        document.getElementById("meals1").innerHTML = box

    }

}


searchBottom.addEventListener("click",


    function () {
        let box = ""
        box = `
        <div class="col-md-6 ">
            <input onkeyup="searchByName()" id ="nameInput" class="form-control bg-transparent  text-white" type="text" placeholder="Search By Name">
        </div>
            <div class="col-md-6">
            <input onkeyup="searchByLetter()" id="letterinput" maxlength="1" class="form-control  bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>`

        document.getElementById("demo").innerHTML = box

    }


)

async function searchByName() {
    
    let  box=""
    box = `            <span class="loader"></span>`
        document.getElementById("meals1").innerHTML = box

        let result= await getdata(nameInput.value)


    //     let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`)
    // let result = await data.json()

    // let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterinput.value}`)
    // let result = await data.json()

    console.log(result);
    console.log(nameInput.value);

    displayMealsImage(result)

}

async function searchByLetter() {
    
    let  box=""
    box = `            <span class="loader"></span>`
        document.getElementById("meals1").innerHTML = box

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterinput.value}`)
    let result = await data.json()

    console.log(result);
    console.log(letterinput.value);

    displayMealsImage(result)

}

IngredientsBottom.addEventListener("click",
    async function(){
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        let result = await data.json()

        let box = ""
        
        for (let i = 0; i < result.meals.length; i++) {
            // let known= await data.categories[i].strCategory
            
            box += ` <div class="col-md-3 text-white  text-center" id="${result.meals[i].strIngredient}" onclick="displayMealsImage6(this.id)">
                   <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h4>${result.meals[i].strIngredient}</h4>
                    <p>${result.meals[i].strDescription.split(" ")
                        .slice(0, 20)
                        .join(" ")}</p>
                            </div>`
    // console.log(box);
    // console.log(known);
            document.getElementById("meals1").innerHTML = box
    
        }

    }
)
async function displayMealsImage6(data3) {
    
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data3}`)
    let result = await data.json()
    
    
    let box = ""

    for (let i = 0; i < result.meals.length; i++) {
        box += ` <div class="col-md-3 ">
            
                        <div class=" overflow-hidden picture position-relative rounded "  onclick="displayDetails2(${result.meals[i].idMeal})" >
                            <img src="${result.meals[i].strMealThumb}" class="w-100 d-block  rounded" alt="">
                            <div class=" position-absolute text-black start-0 bottom-0 end-0 z-3 w-100 h-100 rounded layer   text-center p-2 ">
                 
                    
                            <h5>${result.meals[i].strMeal}</h5>
                            <p class="text-black ">${result.meals[i].strMeal}</p>
                            </div>
                        </div>
                        </div>`
// console.log(box);
        document.getElementById("meals1").innerHTML = box

    }

}


contactBottom.addEventListener("click",
    function(){
    //     box=`<div id="mainContainer" class="min-vh-100 d-flex align-items-md-center">
    //   <form id="contact" class="d-flex flex-column justify-content-center">
    //   <div class="row row-cols-1 row-cols-md-2 g-4">
    //     <div class="col">
    //       <div>
    //         <input name="name" placeholder="Enter your name" aria-label="Enter your name" class="form-control bg-black text-white" maxlength="40">
    //         <p class="invalid-feedback">Your name should only contain letters and at least 3 characters long</p>
    //       </div>
    //     </div>
    //     <div class="col">
    //       <div>
    //         <input type="email" name="email" placeholder="Enter your email" aria-label="Enter your email" class="form-control bg-black text-white">
    //         <p class="invalid-feedback">
    //           Invalid Email, please make sure your email follows this syntax: user@example.com
    //         </p>
    //       </div>
    //     </div>
    //     <div class="col">
    //       <div>
    //         <input type="number" name="phone" placeholder="Enter your phone" aria-label="Enter your phone" class="form-control bg-black text-white" maxlength="20">
    //         <p class="invalid-feedback">
    //           Your phone number should only contain numbers, and must be at least 8 characters long
    //         </p>
    //       </div>
    //     </div>
    //     <div class="col">
    //       <div>
    //         <input type="number" name="age" placeholder="Enter your age" aria-label="Enter your age" class="form-control bg-black text-white" maxlength="3">
    //         <p class="invalid-feedback">Your age should only contain numbers from 12 ~ 100</p>
    //       </div>
    //     </div>
    //     <div class="col">
    //       <div class="position-relative">
    //         <input type="password" name="password" placeholder="Enter your password" aria-label="Enter your password" class="form-control bg-black text-white" maxlength="40">
    //         <p class="invalid-feedback">
    //           Your password must be at least 8 characters long, containing at least 1 uppercase letter, 1
    //           lowercase letter and 1 number
    //         </p>
            
    //       </div>
    //     </div>
    //     <div class="col">
    //       <div>
    //         <input type="password" name="passwordConfirmation" placeholder="Confirm your password" aria-label="Confirm your password" class="form-control bg-black text-white" maxlength="40">
    //         <p class="invalid-feedback">Password doesn't match</p>
    //       </div>
    //     </div>
    //   </div>
    //   <button class="btn btn-outline-danger mt-5 mx-auto" disabled="">Submit</button>
    // </form>
    //   </div>`




let box=`

    <form id="contact" class="d-flex flex-column justify-content-center">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div>
          <input
            name="name"
            placeholder="Enter your name"
            aria-label="Enter your name"
            class="form-control"
            maxlength="40"
          />
          <p class="invalid-feedback">Your name should only contain letters and at least 3 characters long</p>
        </div>
      </div>
      <div class="col">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            aria-label="Enter your email"
            class="form-control"
          />
          <p class="invalid-feedback">
            Invalid Email, please make sure your email follows this syntax: user@example.com
          </p>
        </div>
      </div>
      <div class="col">
        <div>
          <input
            type="number"
            name="phone"
            placeholder="Enter your phone"
            aria-label="Enter your phone"
            class="form-control"
            maxlength="20"
          />
          <p class="invalid-feedback">
            Your phone number should only contain numbers, and must be at least 8 characters long
          </p>
        </div>
      </div>
      <div class="col">
        <div>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            aria-label="Enter your age"
            class="form-control"
            maxlength="3"
          />
          <p class="invalid-feedback">Your age should only contain numbers from 12 ~ 100</p>
        </div>
      </div>
      <div class="col">
        <div class="position-relative">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            aria-label="Enter your password"
            class="form-control"
            maxlength="40"
          />
          <p class="invalid-feedback">
            Your password must be at least 8 characters long, containing at least 1 uppercase letter, 1
            lowercase letter and 1 number
          </p>
          <span class="toggle-password"><i class="fa-solid fa-eye-slash" onclick="togglePassword()"></i></span>
        </div>
      </div>
      <div class="col">
        <div>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm your password"
            aria-label="Confirm your password"
            class="form-control"
            maxlength="40"
          />
          <p class="invalid-feedback">Password doesn't match</p>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-danger mt-5 mx-auto" disabled>Submit</button>
  </form>
    `;
      document.getElementById("meals1").innerHTML=box
    }
)

























let validationStatus = {
    name: false,
    email: false,
    phone: false,
    age: false,
    password: false,
    passwordConfirmation: false,
    validateAll: function () {
      return this.name && this.email && this.phone && this.age && this.password && this.passwordConfirmation;
    },
  };
  
  function validationListeners(type) {
    function validateHandler(e) {
      if (!validation(e.target.getAttribute("name"), e.target.value)) {
        $(e.target).addClass("is-invalid").removeClass("is-valid");
        areAllValid();
      } else {
        $(e.target).removeClass("is-invalid").addClass("is-valid");
        areAllValid();
      }
    }
    switch (type) {
      case "add":
        document.querySelectorAll("#contact input").forEach((el) => {
          el.addEventListener("input", validateHandler);
        });
        break;
      case "remove":
        document.querySelectorAll("#contact input").forEach((el) => {
          el.removeEventListener("input", validateHandler);
        });
        break;
      default:
        throw new Error("Please specify whether to add or remove validation listeners.");
    }
  }
  
  function areAllValid() {
    if (validationStatus.validateAll()) {
      $("#contact button").removeClass("btn-outline-danger").addClass("btn-outline-success").removeAttr("disabled");
    } else {
      $("#contact button").removeClass("btn-outline-success").addClass("btn-outline-danger").attr("disabled", "true");
    }
  }
  
  function validation(type, value) {
    switch (type) {
      case "name":
        /^[a-z\sA-Z]{3,40}$/.test(value) ? (validationStatus.name = true) : (validationStatus.name = false);
        return /^[a-z\sA-Z]{3,40}$/.test(value);
      case "email":
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
          ? (validationStatus.email = true)
          : (validationStatus.email = false);
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      case "phone":
        /^\+?[0-9]{8,20}$/.test(value) ? (validationStatus.phone = true) : (validationStatus.phone = false);
        return /^\+?[0-9]{8,20}$/.test(value);
      case "age":
        /^(100|1[2-9]|[2-9][0-9])$/.test(value) ? (validationStatus.age = true) : (validationStatus.age = false);
        return /^(100|1[2-9]|[2-9][0-9])$/.test(value);
      case "password":
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#\^!%*?&]{8,}$/.test(value) &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#\^!%*?&]{8,}$/.test(value) ===
            $('#contact input[name="passwordConfirmation"]').val()
        ) {
          validationStatus.password = true;
          validationStatus.passwordConfirmation = true;
          return true;
        } else if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#\^!%*?&]{8,}$/.test(value) &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#\^!%*?&]{8,}$/.test(value) !==
            $('#contact input[name="passwordConfirmation"]').val()
        ) {
          validationStatus.password = true;
          validationStatus.passwordConfirmation = false;
          $('#contact input[name="passwordConfirmation"]').addClass("is-invalid");
          $('#contact input[name="passwordConfirmation"]').removeClass("is-valid");
          return true;
        } else {
          validationStatus.password = false;
          validationStatus.passwordConfirmation = false;
          return false;
        }
      case "passwordConfirmation":
        $('#contact input[name="passwordConfirmation"]').val() === $('#contact input[name="password"]').val()
          ? (validationStatus.passwordConfirmation = true)
          : (validationStatus.passwordConfirmation = false);
        return $('#contact input[name="passwordConfirmation"]').val() === $('#contact input[name="password"]').val();
      default:
        throw new Error("Provide something to validate!");
    }
  }
  
  function togglePassword() {
    if ($('#contact input[name="password"]').attr("type") === "password") {
      $('#contact input[name="password"]').attr("type", "text");
    } else {
      $('#contact input[name="password"]').attr("type", "password");
    }
    $(".toggle-password i").toggleClass("fa-eye");
  }

























async function startApp(x) {
    let getdatas = await getdata(x);
    displayMealsImage(getdatas)

    myNav()
    return getdatas
}
startApp()
// getdata()
