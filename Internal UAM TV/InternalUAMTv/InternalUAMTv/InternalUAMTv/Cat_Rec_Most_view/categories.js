const URL = "https://api.uam.tv/";
var categoryList = [];
var selectedCatPos = 0;

var type;

var init = function () {
       
    initTizenKeys();
    
    
    document.getElementById("user_name_id").innerHTML = localStorage.getItem("username");
    
    type = localStorage.getItem("movie_screen_title");
    
    document.getElementById("screen_title").innerHTML = type;
    categoryList = JSON.parse(localStorage.getItem("movies"));
    
    addCategoriesToCategoryScreen();
    
    setFocus("categories " + selectedCatPos, "activeCategory");
    setFocus("cat-wrap " + selectedCatPos, "cardhover");
    
};


window.onload = init;






function initTizenKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		moveLeft();
    		break;
    	case 38: //UP arrow
    		moveUp();
    		break;
    	case 39: //RIGHT arrow
    		moveRight();
    		break;
    	case 40: //DOWN arrow
    		moveDown();
    		break;
    	case 13: //OK button
    		moveOk();
       		break;
    	case 10009: //RETURN button
		    location.href = "../home/home.html";
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
}


function moveOk() {
	
	if(document.getElementsByClassName("hover-left-arrow")[0] !== undefined){
	    location.href = "../home/home.html";
		
	}
	else if(document.getElementsByClassName("activeCategory")[0] !== undefined){
		
		localStorage.setItem("detail-movie-id", categoryList[selectedCatPos]["movieId"]);
		
		
        location.href = "../detail/detail.html";
		
	}
	
}


function moveUp() {
	
	if(document.getElementsByClassName("activeCategory")[0] !== undefined){
		
		if(selectedCatPos === 0)
		{
			removeFocus("activeCategory");
	        removeFocus("cardhover");
	        
			setFocus("arrow_left_id", "hover-left-arrow");
		}
		
	}
	
}

function moveDown() {
	
	if(document.getElementsByClassName("hover-left-arrow")[0] !== undefined){
		
		
			removeFocus("hover-left-arrow");
	        
			 setFocus("categories " + selectedCatPos, "activeCategory");
		     setFocus("cat-wrap " + selectedCatPos, "cardhover");

		
		
	}
	
	
}


function moveLeft(){
	
	   if (selectedCatPos !== 0) {

           if (selectedCatPos % 4 == 0) {
               scroll('-=300px');
           }

           selectedCatPos--;
           removeFocus("activeCategory");
           removeFocus("cardhover");
           setFocus("categories " + selectedCatPos, "activeCategory");
           setFocus("cat-wrap " + selectedCatPos, "cardhover");



       }
}

function moveRight() {
	
	if (selectedCatPos !== (categoryList.length - 1)) {
        selectedCatPos++;
        removeFocus("activeCategory");
        removeFocus("cardhover");

        setFocus("categories " + selectedCatPos, "activeCategory");
        setFocus("cat-wrap " + selectedCatPos, "cardhover");

        if (selectedCatPos % 4 == 0) {
        	
            scroll('+=300px');
        	
        }
    } else {
    	
    	scrollToTop();
    	
        selectedCatPos = 0;

        removeFocus("activeCategory");
        removeFocus("cardhover");

        setFocus("categories " + selectedCatPos, "activeCategory");
        setFocus("cat-wrap " + selectedCatPos, "cardhover");

    }

	
}



function addCategoriesToCategoryScreen() {
    document.getElementById("container-fluid-category-id").innerHTML = ``;


    var rowId = "-1";


    categoryList.forEach((result, idx) => {


        console.log(idx);

        if (idx % 4 == 0) {
          
                var showcase = document.getElementById("container-fluid-category-id");
                rowId = idx;

                showcase.innerHTML += `<div id="row-category ${rowId.toString()}" class="row"></div>`;

         

        }


        var row = document.getElementById("row-category " + rowId);
        var temp = `
      
    	<div id="categories ${idx}" class="col-lg-3 mt-4">
   			<div id="cat-wrap ${idx}" class="card">
   				<img class="card-img-top" src="${result["image"]}" alt="Card image cap">
   			</div>
   		</div>
        
        `;

        row.innerHTML += temp;

        

    })
   

}





function setFocus(id, clas) {

    document.getElementById(id).classList.add(clas);

}

function removeFocus(clas) {

    var el = document.getElementsByClassName(clas)[0].id;
    document.getElementById(el.toString()).classList.remove(clas);
}

function scrollToTop(){
	document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function scroll(by) {
	    $('html, body').animate({
	        scrollTop: by
	    }, 300);
}


