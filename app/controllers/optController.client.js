'use strict';

/*Client site controller
The client-side controller will be responsible for retrieving information from the API,
and making it available within the view. 
Additionally, it will specify what action should be taken when one of the two buttons are clicked.
*/


(function () {

   //VAR
   var poll = document.querySelector('#poll');
   var opt = document.querySelector('#opt');
   var addButton = document.querySelector('#addopt');
   var deleteButton = document.querySelector('#delopt');
   var optList = document.querySelector('#optlist');
   var apiUrl = appUrl + '/api/:id/pollsopt';
   
   //FUNCTIONS
   function updatePollOtp (data) {
      var optArray = JSON.parse(data);//.pollList;
      //console.log(pollArray);
      //var pollArray = Array.parse(data);
      optList.innerHTML = '';
      for(var a = 0; a < optArray.length; a++){
         optList.innerHTML = optList.innerHTML +'<li>'+optArray[a].name+'-->'+optArray[a].nameopt+'</li>';
         //pollList.innerHTML = pollList.innerHTML +'<ul>';
         //pollList.innerHTML = pollList.innerHTML +'<li>'+pollArray[a].nameopt+'</li>';
         /*for(var b = 0; b < pollArray[a].opt.length; b++){
            pollList.innerHTML = pollList.innerHTML +'<li>'+pollArray[a].opt[b].nameopt+'</li>';
         }*/
         //pollList.innerHTML = pollList.innerHTML +'</ul>';
      }
      
   }

   //EXE
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOtp));

   //LISTENERS
   addButton.addEventListener('click', function () {
      //console.log(poll.textContent);
      ajaxFunctions.ajaxRequest('POST', apiUrl+'/addopt/'+poll.value+'/'+opt.value, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOtp);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl+'/delopt/'+poll.value+'/'+opt.value, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOtp);
      });

   }, false);

})();
