'use strict';

/*Client site controller
The client-side controller will be responsible for retrieving information from the API,
and making it available within the view. 
Additionally, it will specify what action should be taken when one of the two buttons are clicked.
*/

//var snsShare = require('snsShare');
var messageText = '';
var urlDir = '';

(function () {

   //VAR
   var radioPoll; //= document.querySelector('#radioPoll');
   var radioOpt; //= document.querySelector('#opts');
   var shareClass = document.querySelector(".share-to");
   var share = document.querySelector("#share");
   var pollList = document.querySelector('#polllist');
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
         optList.innerHTML = optList.innerHTML +'<li><input type="radio" value="' +optArray[a].nameopt+ '" name="opts" id="opts'+a+'">'/*+optArray[a].name+'-->'*/+optArray[a].nameopt+'</li>';
         
      }
      
   }

   //EXE
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollOtp));

   //LISTENERS
   addButton.addEventListener('click', function () {
      
      //messageText = '';
      ajaxFunctions.ajaxRequest('POST', apiUrl+'/addopt/'+poll.value+'/'+opt.value/*+'/'+radioPoll*/, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl+'/onlypoll/'+poll.value, updatePollOtp);
         
      });
   urlDir = appUrl.toString().split('://')[1];   
   messageText = "I%20did%20create%20the%20option%20"+opt.value+"%20in%20the%20Poll%20"+poll.value+".";
   share.innerHTML = '<a href="https://twitter.com/intent/tweet?url=https%3A%2F%2F'+urlDir+'&amp;text='+messageText+'" class="btn btn-block shareit-twitter-colors tw-share"><i class="fa fa-twitter"></i> Twitter</a>';
   share.innerHTML = share.innerHTML + '<a href="https://plus.google.com/share?url=https%3A%2F%2F'+urlDir+'&amp;text='+messageText+'" class="btn btn-block shareit-google-plus-colors tw-share"><i class="fa fa-google-plus"></i> Google+</a>';
   //console.log(messageText);
   //console.log(urlDir);
   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl+'/delopt/'+poll.value+'/'+opt.value, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl+'/onlypoll/'+poll.value, updatePollOtp);
      });

   }, false);
   
   /*onlyPoll.addEventListener('click',function(){
      
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/onlypoll/'+poll.value, updatePollOtp);
   },false);*/
   
   optList.addEventListener('click',function(){
      
      document.querySelector('#opt').value = document.querySelector('input[name = "opts"]:checked').value;
      //document.querySelector('#poll').value = document.querySelector('input[name = "radioPoll"]:checked').value;
         
   },false);
   
   pollList.addEventListener('click',function(){
      
      //document.querySelector('#opt').value = document.querySelector('input[name = "opts"]:checked').value;
      document.querySelector('#poll').value = document.querySelector('input[name = "radioPoll"]:checked').value;
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/onlypoll/'+poll.value, updatePollOtp);
         
   },false);

})();
