const URL = "https://api.uam.tv/";


var init = function () {
       
    initTizenKeys();
   
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
