'use strict';

/*Client site controller
The client-side controller will be responsible for retrieving information from the API,
and making it available within the view. 
Additionally, it will specify what action should be taken when one of the two buttons are clicked.
*/


(function () {

   //VAR
   var poll = document.querySelector('#poll');
   var addButton = document.querySelector('#addpoll');
   var deleteButton = document.querySelector('#delpoll');
   var pollList = document.querySelector('#polllist');
   var apiUrl = appUrl + '/api/:id/polls';
   
   //FUNCTIONS
   function updatePoll (data) {
      var pollArray = JSON.parse(data);//.pollList;
      //var pollArray = Array.parse(data);
      pollList.innerHTML = '';
      for(var a = 0; a < pollArray.length; a++){
         pollList.innerHTML = pollList.innerHTML +'<li>'+pollArray[a].name+'</li>';
         //pollList.innerHTML = '<li>'+data+'</li>';
      }
      
   }

   //EXE
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll));

   //LISTENERS
   addButton.addEventListener('click', function () {
      //console.log(poll.textContent);
      ajaxFunctions.ajaxRequest('POST', apiUrl+'/add/'+poll.value, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl+'/del/'+poll.value, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePoll);
      });

   }, false);

})();
