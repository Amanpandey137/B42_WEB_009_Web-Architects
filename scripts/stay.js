import {header,footer} from "../components/header&footer.js"

document.querySelector("#header").innerHTML= header();

document.querySelector("#footer").innerHTML= footer();


let findHotel_Location= async ()=>{
   
let location= document.querySelector("#inputbox1").value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': '299fe7670bmsh215a4489f052bedp1694dcjsn8d2502d0a4ad'
        }
    };
    
    
    let res= await fetch(`https://hotels4.p.rapidapi.com/locations/v2/search?query=${location}&locale=en_US&currency=INR`, options)
    let data= await res.json();

    return data;    

   
} 

let propertyList = async (destID)=>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': '299fe7670bmsh215a4489f052bedp1694dcjsn8d2502d0a4ad'
        }
    };

    let checkIn= document.querySelector("#inputbox2").value;
    let checkOut= document.querySelector("#inputbox3").value;

    let sortBasedOn= document.querySelector("#sortID").value;
  
    if(document.querySelector("input[type='radio'][name=star]:checked")!=null){
        var starFilterValue= document.querySelector("input[type='radio'][name=star]:checked").value;
    }
    

   let res= await fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${destID}&pageNumber=1&pageSize=25&checkIn=${checkIn}&checkOut=${checkOut}&adults1=1&starRatings=${starFilterValue}&sortOrder=${sortBasedOn}&currency=USD`, options)
   let data= await res.json();
   return data;
    
}

let appendHotels=(data)=>{
    
    document.querySelector("#products_append_div").innerHTML= null;  

    data.forEach((ele)=>{
        let box= document.createElement("div");
        box.setAttribute("class","individualProductDiv");
        box.addEventListener("click",()=>{
            let checkIn= document.querySelector("#inputbox2").value;
            let checkOut= document.querySelector("#inputbox3").value;
            let noOfTravellers= travelDetails.totalTravellers;
            let longitude= ele.coordinate.lon;
            let latitude= ele.coordinate.lat;
            let hotelImage= ele.optimizedThumbUrls.srpDesktop;
            let selectedHotel= {id:ele.id,checkInDate:checkIn,checkOutDate:checkOut,noOfTravellers:noOfTravellers,lon:longitude,lat:latitude,hotelImage:hotelImage}
           
            localStorage.setItem("selectedHotel",JSON.stringify(selectedHotel));
            window.location.href="hotel_info.html"
        })

        let imageDiv= document.createElement("div");
        imageDiv.setAttribute("class","individualProductImageDiv");

        let outerTextDiv= document.createElement("div");
        outerTextDiv.setAttribute("class","individualProductOuterTextDiv");

        let titleDiv= document.createElement("div");
        titleDiv.setAttribute("class","individualProductTitleDiv");

        let descDiv= document.createElement("div");
        descDiv.setAttribute("class","individualProductDescDiv");

        let descLeftDiv= document.createElement("div");
        descLeftDiv.setAttribute("class","individualProductDescLeftDiv");

        let desRightcDiv= document.createElement("div");
        desRightcDiv.setAttribute("class","individualProductDescRightDiv");

        let hardcodeDiv= document.createElement("div");
        hardcodeDiv.setAttribute("class","individualProductHardcodeDiv");

        let ratingDiv= document.createElement("div");
        ratingDiv.setAttribute("class","individualProductRatingDiv");

        let priceDiv= document.createElement("div");
        priceDiv.setAttribute("class","individualProductPriceDiv");

        
        let hotelImage= document.createElement("img");
        hotelImage.src= ele.optimizedThumbUrls.srpDesktop;

        let title= document.createElement("h3");
        title.innerText= ele.name;

        let area= document.createElement("p");
        area.innerText= ele.neighbourhood;
        area.setAttribute("class","totalPriceArea");

        let p1=  document.createElement("p");
        p1.innerText= "Fully Refundable"
        p1.id="appendp1"
        let p2=  document.createElement("p");
        p2.innerText= "Reserve Now, Pay Later"
        p2.id="appendp2"

        let rating= document.createElement("p");
        let numOfReviews= Math.floor(Math.random()*200)+5;
        rating.innerHTML=`<span id="bold_rating">${ele.starRating}/5 </span>`  + ` (${numOfReviews} reviews)`;
        let price= document.createElement("h2");
        price.innerHTML= `Rs ${Math.trunc(ele.ratePlan.price.exactCurrent*75)}`
        let totalPrice= document.createElement("p");
        totalPrice.setAttribute("class","totalPriceArea");
        totalPrice.innerHTML= `Rs ${Math.trunc((ele.ratePlan.price.exactCurrent*75)*1.15)}`


        priceDiv.append(price,totalPrice);
        ratingDiv.append(rating);
        hardcodeDiv.append(p1,p2);
        titleDiv.append(title,area);
        imageDiv.append(hotelImage);

        desRightcDiv.append(priceDiv);
        descLeftDiv.append(hardcodeDiv,ratingDiv);
        descDiv.append(descLeftDiv,desRightcDiv);
        outerTextDiv.append(titleDiv,descDiv);
        box.append(imageDiv,outerTextDiv);

        document.querySelector("#products_append_div").append(box)
    })
}


let searchHotel= async ()=>{
    let destID
    document.getElementById("location_suggestion_div").style.display = "none";

    document.querySelector("#products_append_div").innerHTML=null;

        let image= document.createElement("img");
        image.setAttribute("id","notFoundErrorImage")
        image.src= "https://cdn.dribbble.com/users/1415568/screenshots/3727241/shot_16.gif"
        
        document.querySelector("#products_append_div").append(image)
    
    try{
        let res1= await findHotel_Location();

         destID=  res1.suggestions[0].entities[0].destinationId;
    }
    catch(err){

        document.querySelector("#products_append_div").innerHTML=null;

        let image= document.createElement("img");
        image.setAttribute("id","notFoundErrorImage")
        image.src= "https://thumbs.dreamstime.com/b/flat-line-icon-concept-error-page-file-not-found-icon-file-laptop-display-isolated-vector-illustration-white-119892204.jpg"
        document.querySelector("#products_append_div").append(image)
    }

    try{
        let res2= await propertyList(destID);

        document.querySelector("#noOfPropertiesDiv").innerHTML= null;  

        let totalHotels= document.createElement("p");
            totalHotels.innerHTML= res2.data.body.searchResults.totalCount + " properties";
        let extraText=  document.createElement("a");
        extraText.innerText= "See how we pick our recommended properties";
        extraText.setAttribute("id","See_how_we_pick")
        extraText.href="#";
    
        document.querySelector("#noOfPropertiesDiv").append(totalHotels,extraText);


        let dataToShow= res2.data.body.searchResults.results;
    console.log(dataToShow);

    if(dataToShow.length==0){
        document.querySelector("#products_append_div").innerHTML=null;

        let image= document.createElement("img");
        image.setAttribute("id","notFoundErrorImage")
        image.src= "https://thumbs.dreamstime.com/b/flat-line-icon-concept-error-page-file-not-found-icon-file-laptop-display-isolated-vector-illustration-white-119892204.jpg"
        document.querySelector("#products_append_div").append(image)
    }
    else{
        appendHotels(dataToShow);
    }
    }
    catch(err){
        document.querySelector("#products_append_div").innerHTML=null;

        let image= document.createElement("img");
        image.setAttribute("id","notFoundErrorImage")
        image.src= "https://thumbs.dreamstime.com/b/flat-line-icon-concept-error-page-file-not-found-icon-file-laptop-display-isolated-vector-illustration-white-119892204.jpg"
        document.querySelector("#products_append_div").append(image)
    }
    showMapFunction();
}
document.querySelector("#inputboxbutton").addEventListener("click",searchHotel)

let sortFunction= ()=>{

    if(document.querySelector("#sortID").value=="STAR_RATING_HIGHEST_FIRST"){
         if(document.querySelector('input[type=radio][name=star]:checked')!=null){
        var radio = document.querySelector('input[type=radio][name=star]:checked');
        radio.checked = false;

    }
    };
    searchHotel();
}

function filterFunction(){
    searchHotel();

}

document.querySelector("#sortID").addEventListener("change",()=>{sortFunction()})

document.querySelector("#starRating1").addEventListener("click",()=>{filterFunction()})
document.querySelector("#starRating2").addEventListener("click",()=>{filterFunction()})
document.querySelector("#starRating3").addEventListener("click",()=>{filterFunction()})
document.querySelector("#starRating4").addEventListener("click",()=>{filterFunction()})
document.querySelector("#starRating5").addEventListener("click",()=>{filterFunction()})


document.querySelector("#outer_up").style.display="none";

let noOfTravellers;

let travelDetails= JSON.parse(localStorage.getItem("travelDetails"));

if(travelDetails!=undefined){
  
document.querySelector("#inputbox1").value = travelDetails.location || null;
document.querySelector("#inputbox2").value = travelDetails.checkinDate || null;
document.querySelector("#inputbox3").value = travelDetails.checkoutDate || null;
document.querySelector("#no_of_travellers").innerText = travelDetails.totalTravellers + " Travellers" || "1 Travellers";
noOfTravellers= travelDetails.totalTravellers ||  "1";
searchHotel();
}
let find_city_country= async ()=>{
        let query= document.querySelector("#inputbox1").value;

        let url= `https://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=shivambais`

        let res= await fetch(url)

        let data= await res.json()

        let reqData= data.geonames;

        document.querySelector('#location_suggestion_div').style.display = "block";
        document.querySelector("#location_suggestion_div").innerHTML=null;
        reqData.forEach((ele)=>{
            let location= document.createElement("p");
            location.innerText= ele.name+","+ele.countryName;

            location.addEventListener("click",()=>{
                document.querySelector("#inputbox1").value =null;
                document.querySelector("#inputbox1").value =  ele.name+","+ele.countryName;
                document.getElementById("location_suggestion_div").style.display = "none";
            })
            document.querySelector("#location_suggestion_div").append(location)
        })
}

let timeoutVar;
let debounce=(fun,time)=>{
    if(timeoutVar){
        clearTimeout(timeoutVar);
    }

    timeoutVar = setTimeout(fun,time)
}

document.querySelector("#inputbox1").addEventListener("input",()=>{debounce(find_city_country,700)})

// map api

let showMapFunction=()=>{
   document.querySelector("#gmap_canvas").innerHTML=null;
    let location = document.querySelector("#inputbox1").value;
    let map= document.querySelector("#gmap_canvas");
    map.src= `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}
   let displayTravellers = document.getElementById("travellers_display")
     function displayTravellersFunction() {
        
     
         if (displayTravellers.style.display === "none") {
     
             document.getElementById("add_travellers").addEventListener("click", counterAddFunction)
     
             document.getElementById("remove_travellers").addEventListener("click", counterRemoveFunction)
     
             displayTravellers.style.display = "block"
     
             let displayCount = document.getElementById("display_count")
     
             let i = 1
     
             function counterAddFunction() {
                 i = i + 1
                 displayCount.innerText = i
                 document.getElementById("no_of_travellers").innerText = `${i} Travellers`
     
             }
     
             function counterRemoveFunction() {
                 i = i - 1
                 displayCount.innerText = i
                 document.getElementById("no_of_travellers").innerText = `${i} Travellers`
     
             }
      
         }
         else {
        
             displayTravellers.style.display = "none"
         }
     }
     document.getElementById("travellers_div").addEventListener("click", displayTravellersFunction)

let loginUser = JSON.parse(localStorage.getItem("loginUser"))
console.log(loginUser)

let hideAndDisplayFunction;

let displayDropdown;
displayDropdown = document.getElementById("display_aftersiginDropdown")

displayDropdown.style.display = "none"

if(loginUser != null){


document.getElementById("after_signin").innerText = loginUser[0] 
let loginUserName = loginUser[0]
let loginUserEmail = loginUser[1]

document.getElementById("siginUserName").innerText = `Hi, ${loginUserName}`
document.getElementById("signinUserEmail").innerText = loginUserEmail
displayDropdown = document.getElementById("display_aftersiginDropdown")


 hideAndDisplayFunction = () => {
    if (displayDropdown.style.display == "none") {
        displayDropdown.style.padding = "20px"

        displayDropdown.style.display = "block"

    }
    else {

        displayDropdown.style.display = "none"

    }

}
}

else{
    document.getElementById("leave_signin").innerText ="Sign in "
    document.getElementById("leave_signin").addEventListener("click",siginFunctionNew)
    function siginFunctionNew()
    {
     window.location.href="./sigin.html"
    }

     displayDropdown = document.getElementById("display_aftersiginDropdown")
    
     hideAndDisplayFunction = () => {
        if (displayDropdown.style.display == "none") {
            displayDropdown.style.padding = "20px"
    
            displayDropdown.style.display = "block"
    
        }
        else {
    
            displayDropdown.style.display = "none"
    
        }
    
    }

}

document.getElementById("after_signin").addEventListener("click", hideAndDisplayFunction)

document.getElementById("more_travel_display").style.display = "none"
    
let moreTravelFunction = () =>
{
    console.log("in")
    if( document.getElementById("more_travel_display").style.display === "none")
    {
        document.getElementById("more_travel_display").style.display = "block"
    }
    else{
        document.getElementById("more_travel_display").style.display = "none"
    }
}
document.getElementById("more_travel").addEventListener("click",moreTravelFunction)
