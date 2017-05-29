'use strict';

/*Client site controller
The client-side controller will be responsible for retrieving information from the API,
and making it available within the view. 
Additionally, it will specify what action should be taken when one of the two buttons are clicked.
*/


(function () {

   //VAR
   var radioPoll; //= document.querySelector('#radioPoll');
   var radioOpt; //= document.querySelector('#opts');
   var onlyPoll = document.querySelector('#onlypoll');
   //console.log(radioPoll);
   var poll = document.querySelector('#poll');
   var opt = document.querySelector('#opt');
   var addButton = document.querySelector('#addopt');
   var deleteButton = document.querySelector('#delopt');
   var optList = document.querySelector('#optlist');
   var apiUrl = appUrl + '/api/:id/pollsopt';
   var cant = 0;
   
   //FUNCTIONS
   function updatePollOtp (data) {
      var optArray = JSON.parse(data);//.pollList;
      cant = optArray.length;
      optList.innerHTML = '';
      for(var a = 0; a < optArray.length; a++){
         optList.innerHTML = optList.innerHTML +'<li><input type="radio" value="' +optArray[a].nameopt+ '" name="opts" id="opts'+a+'">'+optArray[a].name+'-->'+optArray[a].nameopt+'</li>';
         
      }
      
   }

   //EXE
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOtp));

   //LISTENERS
   addButton.addEventListener('click', function () {
      //console.log(poll.textContent);
      ajaxFunctions.ajaxRequest('POST', apiUrl+'/addopt/'+poll.value+'/'+opt.value/*+'/'+radioPoll*/, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOtp);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl+'/delopt/'+poll.value+'/'+opt.value, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOtp);
      });

   }, false);
   
   onlyPoll.addEventListener('click',function(){
      /*for(var a = 0; a < cant.length; a++){
         //if(document.querySelector('#opts'+a).checked === true){
            document.querySelector('#opt').value = document.querySelector('#opts1').value;
            radioOpt = document.querySelector('#opts1');
         //}
      }*/
      //if(radioOpt == undefined){
         //radioOpt = document.querySelector('input[name = "opts"]:checked');
         //document.querySelector('#opt').value = document.querySelector('input[name = "opts"]:checked').value;
      //} 
      //if(radioOpt == undefined) radioOpt = document.querySelector('#opts0');
      
      //document.querySelector('#poll').value = document.querySelector('#radioPoll1').value;
      //radioPoll = document.querySelector('#radioPoll1');
      /*var a = 1;
      document.querySelector('#opt').value = document.querySelector('#opts'+a).value;
      radioOpt = document.querySelector('#opts'+a);*/
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/onlypoll/'+poll.value/*+" "+radioOpt+" "+radioOpt.checked+" "+cant*/, updatePollOtp);
   },false);
   
   optList.addEventListener('click',function(){
      
      document.querySelector('#opt').value = document.querySelector('input[name = "opts"]:checked').value;
      //document.querySelector('#poll').value = document.querySelector('input[name = "radioPoll"]:checked').value;
         
   },false);

})();
