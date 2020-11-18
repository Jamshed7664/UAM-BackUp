const URL = "https://api.uam.tv/";
var details;


var init = function () {
       
    initTizenKeys();
  
    
    	var token = localStorage.getItem("jwt token");
	
    	if(token !== null)
			{
    			var uid = localStorage.getItem("detail-movie-id");
    		
    			getDetailScreenData(token , uid);
			}
    	else
    		{
    			console.log("No token found");
    			location.href = "../login.html";
    		}
    
    
    	document.getElementById("add_fav_button_id").addEventListener("click", function() {
    			setFav(details["uid"])
    		});
    
    	document.getElementById("already_fav_button_id").addEventListener("click", function() {
    			setFav(details["uid"]);
    		});
    
};


window.onload = init;






function initTizenKeys()
{
	 // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		
    		break;
    	case 38: //UP arrow
    		
    		break;
    	case 39: //RIGHT arrow
    		
    		break;
    	case 40: //DOWN arrow
    		
    		break;
    	case 13: //OK button
    		
    
    		
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


function getDetailScreenData(token , uid) {
	

	showLoader();
	
	
	
	//get details of movie...
	
	 let params = {
		        "id": uid,
		    };

		    let query = Object.keys(params)
		        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
		        .join('&');

	
	 fetch(URL + 'v3/movies/onair/getMovie.php?' + query, {
         headers: {
             'Authorization': "Bearer " + token
         },
     })
     .then(response => response.json())
     .then(data => {


             // add details.....
             details = {
                 "fullId": data[0]["src"]["id_full"],
                 "year": data[0]["meta"]["year"],
                 "length": data[0]["meta"]["lenght"],
                 "cast": data[0]["meta"]["cast"],
                 "director": data[0]["meta"]["directors"],
                 "title": data[0]["langs"]["it"]["title"],
                 "image": "https://media.uam.tv/images/media/frames/" + data[0]["src"]["id_full"] + ".jpg",
                 "desc": data[0]["langs"]["it"]["logline"],
                 "tag": data[0]["langs"]["it"]["tags"],
                 "geolimits": data[0]["meta"]["geolimits"],
                 "trailerId": data[0]["src"]["id_trailer"],
                 "uid": data[0]["uid"]
             }
            
           
             
             document.getElementById("detail_video_name").innerHTML = details["title"];
             document.getElementById("detail_video_desc").innerHTML = details["desc"];
             document.getElementById("detail_video_length").innerHTML = formatTime(details["length"]);
             document.getElementById("detail_video_year").innerHTML = " " + details["year"];
             
             changeBg(details["image"]);

        
             details["tag"].forEach((result, index) => {
            	 
            	 if(index == (details["tag"].length)-1)
            		 document.getElementById("tag_list_id").innerHTML += result;
            	 else
                	 document.getElementById("tag_list_id").innerHTML += result + ",";

             })
             
     
             getDirectorList(token);
     		
        

     })
     .catch((error) => {
         console.error('Err:', error);
          hideLoader();
     });
	
	
	
	
	


	
}


function getDirectorList(token)
{
	var castCase = document.getElementById("director_case");

	details["director"].forEach((result, index) => {


		let li = document.createElement('li');
		castCase.appendChild(li);

	    li.innerHTML += result;

    })
   
    	getCastList(token);
   
	
	}

function getCastList(token)
{
	var castCase = document.getElementById("cast_case");

	details["cast"].forEach((result, index) => {


		let li = document.createElement('li');
		castCase.appendChild(li);

	    li.innerHTML += result;

    })
 
    getFav(token , details["uid"]);
    
	
}



function setFav(uid){
	
	
	var token = localStorage.getItem("jwt token");
	
	if(token !== null)
		{
		  let params = {
			        "mid": uid,
			    };

			    let query = Object.keys(params)
			        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
			        .join('&');

			    fetch(URL + 'v3/users/favourites/post.php?' + query, {
			    		method: 'POST',
			            headers: {
			                'Authorization': "Bearer " + token
			            },
			        })
			        .then(response => response.json())
			        .then(data => {

			        
			        	if(data["meta"]["response"] === true)
			        		{
			        			getFav(token , details["uid"]);
			        		}

			       

			        })
			        .catch((error) => {
			            console.error('Err:', error);
			            hideLoader();
			        });
		}
	else
		{
			console.log("No token found");
			location.href = "../login.html";
		}

	  
	
	}


function getFav(token , uid){
	
	 
	var isFav = false;
		 
		    fetch(URL + 'v3/users/favourites/get.php', {
		            headers: {
		                'Authorization': "Bearer " + token
		            },
		        })
		        .then(response => response.json())
		        .then(data => {

		        	
		        	if(data["data"] != null)
		        		{
		        			data["data"].forEach((result, index) => {
							
	        				
			        		if(result["id_movie"] === uid)
			        			{
			        				isFav = true;
			        				return
			        			}
			        		
			        		
			        	
										        
							})
							
								if(isFav === true){
			        				
									console.log("yes fav");
									//set filled heart...
									showAlreadyAddedToFavButton();
									
			        			}
			        		else{
			        			
			        			console.log("no fav");
			        			showAddToFavButton();
			        			
			        			//set unfilled heart...
			        		}
		        			
		        			hideLoader();

		        		}
		        	else
		        		{
		        		console.log("no fav");
	        			showAddToFavButton();
		        		}
		        	
		        	
						
		        })
		        .catch((error) => {
		            console.error('Err:', error);
		            hideLoader();
		        });
		
	
}



function showAddToFavButton(){
	 document.getElementById("already_fav_button_id").style.display = 'none';
	    document.getElementById("add_fav_button_id").style.display = '';
}

function showAlreadyAddedToFavButton(){
	 document.getElementById("add_fav_button_id").style.display = 'none';
	    document.getElementById("already_fav_button_id").style.display = '';
}


function formatTime(totalMinutes){
	
	var hours = Math.floor(totalMinutes / 60);          
    var minutes = totalMinutes % 60;
    
    
    if(hours == 0)
    	 return " " + minutes + "m"; 
    else if(minutes == 0)
    	 return " " + hours + "h"; 
    else
    	 return " " + hours + "h " + minutes + "m"; 
    
	
}



function changeBg(image) {

    var d = {
        img: image,
    }
    var img = d.img;
    var a = "linear-gradient(rgba(21, 9, 36, 0.6), rgba(20, 9, 34, .7), rgba(21, 9, 36, .7)),"
    var b = "url(" + img + ")";
    var c = a + b;
    console.log(c);
    document.getElementById('mainContainer').style.backgroundImage = c;


}


function showLoader(){
    document.getElementById('loadingSpinner').classList.add('ldio-eon67kjyqwt')
     document.getElementById('viewSection').classList.add('view_Section')
 }
 
  function hideLoader(){
   document.getElementById('loadingSpinner').classList.remove('ldio-eon67kjyqwt');
     document.getElementById('viewSection').classList.remove('view_Section')
 }

