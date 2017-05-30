'use strict';

/*Client site controller
The client-side controller will be responsible for retrieving information from the API,
and making it available within the view. 
Additionally, it will specify what action should be taken when one of the two buttons are clicked.
*/

(function () {

   //VAR
   var publicList = document.querySelector('#publiclist');
   var apiUrl = appUrl + '/api/:id/public';
   //var cant = 0;
   
   //FUNCTIONS
   function updatePublic (data) {
      var pollArray = JSON.parse(data);//.pollList;
      //cant = optArray.length;
      publicList.innerHTML = '';
      for(var a = 0; a < pollArray.length; a++){
         publicList.innerHTML = publicList.innerHTML +'<li><input type="radio" value="' +pollArray[a].name+ '" name="opts" id="opts'+a+'">'+pollArray[a].name+'</li>';
         
      }
      
   }

   //EXE
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePublic));

   //LISTENERS
   publicList.addEventListener('click',function(){
      
      //document.querySelector('#opt').value = document.querySelector('input[name = "opts"]:checked').value;
      //document.querySelector('#poll').value = document.querySelector('input[name = "radioPoll"]:checked').value;
         
   },false);
   

})();
