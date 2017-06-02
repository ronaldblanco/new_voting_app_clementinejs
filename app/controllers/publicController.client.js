'use strict';

/*Client site controller
The client-side controller will be responsible for retrieving information from the API,
and making it available within the view. 
Additionally, it will specify what action should be taken when one of the two buttons are clicked.
*/
//var Chart = require('./public/js/Chart.bundle.js');
var mydata = [];
var mybackcolors = [];
var mylabels = [];
var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.orange,
                    window.chartColors.yellow,
                    window.chartColors.green,
                    window.chartColors.blue,
                ],
                label: 'Dataset 1'
            }],
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
        },
        options: {
            //responsive: true
            responsive: false
        }
    };


(function () {
   
   //FOR THE CHART////////////////////
   
   //require('./public/js/utils.js');
   window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};
window.randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
};

window.randomScalingFactorNew = function(myVar) {
	return (myVar > 0.5 ? 1.0 : -1.0) * Math.round(myVar * 100);
};
var randomScalingFactorNew = function(myVar) {
        return Math.round(myVar * 100);
};

/////////////////////////////

   //VAR
   var chart = document.querySelector('#chart-area');
   var voteB = document.querySelector('#vote');
   var back = document.querySelector('#back');
   var publicList = document.querySelector('#publiclist');
   var publicListOpt = document.querySelector('#publiclistOpt');
   var apiUrl = appUrl + '/api/:id/public';
   //var cant = 0;
   
   //FUNCTIONS
   function updatePublic (data) {
      var pollArray = JSON.parse(data);//.pollList;
      //cant = optArray.length;
      publicList.innerHTML = '';
      for(var a = 0; a < pollArray.length; a++){
         publicList.innerHTML = publicList.innerHTML +'<li><input type="radio" value="' +pollArray[a].user+'_'+pollArray[a].poll.name+ '" name="publicP" id="opts'+a+'">'+pollArray[a].poll.name+' by '+pollArray[a].userName+'</li>';
         
      }
      
   }
   
   function updatePublicOpt (data) {
      var pollArray = JSON.parse(data);//.pollList;
      //cant = optArray.length;
      publicListOpt.innerHTML = '';
      for(var a = 0; a < pollArray.length; a++){
         publicListOpt.innerHTML = publicListOpt.innerHTML +'<li><input type="radio" value="' +pollArray[a].user+'_'+pollArray[a].opt.name+'_'+pollArray[a].opt.nameopt+ '" name="publicPOpt" id="opts'+a+'">'+pollArray[a].opt.nameopt+'</li>';
         
      }
            
   }
   
   function voteAlert (data) {
      var pollArray = JSON.parse(data);//.pollList;
      //cant = optArray.length;
      publicListOpt.innerHTML = '';
      if(pollArray != null){
         publicListOpt.innerHTML = publicListOpt.innerHTML +'<li>Your Vote was Set Correctly!</li>';

      }else publicListOpt.innerHTML = publicListOpt.innerHTML +'<li>An Error ocurred!</li>';
            
   }
   
   //Function CHART//////////////
   function updateChart (data){
       var chartData = JSON.parse(data);
       var origbackgroundColor = [
                    window.chartColors.red,
                    window.chartColors.orange,
                    window.chartColors.yellow,
                    window.chartColors.green,
                    window.chartColors.blue,
                    window.chartColors.purple,
                    window.chartColors.grey,
                ];
       mydata = [];
       mybackcolors = [];
       mylabels = [];
       for(var a = 0; a < chartData.length; a++){
           mydata.push(chartData[a].opt.vote);
           mybackcolors.push(origbackgroundColor[a]);
           mylabels.push(chartData[a].opt.nameopt);
       }
       
   }
   //FUNCTION CHART END////////////////////////////////

   //EXE
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePublic));

   //LISTENERS
   voteB.addEventListener('click',function(){
      
      //var poll = document.querySelector('input[name = "publicP"]:checked').value;//{'user': user.github.id,'poll':poll}
      //ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl+'Chart/'+poll, updateChart));
      
         
   },false);
   
   back.addEventListener('click',function(){
      
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePublic));
      
   },false);//Update POLLS
   
   publicList.addEventListener('click',function(){
      
      var poll = document.querySelector('input[name = "publicP"]:checked').value;//{'user': user.github.id,'poll':poll}
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl+"opt/"+poll, updatePublicOpt));
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl+'Chart/'+poll, updateChart));
         
   },false);//GET OPTIONS OF A POLL
   
   publicListOpt.addEventListener('click',function(){
      
      var opt = document.querySelector('input[name = "publicPOpt"]:checked').value;//{'user': user.github.id,'poll':poll}
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl+"optV/"+opt, voteAlert));
         
   },false);//VOTE FOR AN OPTION
   

})();
