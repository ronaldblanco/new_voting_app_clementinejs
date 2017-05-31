'use strict';

/*Client site controller
The client-side controller will be responsible for retrieving information from the API,
and making it available within the view. 
Additionally, it will specify what action should be taken when one of the two buttons are clicked.
*/



(function () {
   
   //FOR THE CHART////////////////////
   //var Chart = require('./public/js/Chart.bundle.js');
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
         publicList.innerHTML = publicList.innerHTML +'<li><input type="radio" value="' +pollArray[a].user+'_'+pollArray[a].poll.name+ '" name="publicP" id="opts'+a+'">'+pollArray[a].poll.name+'</li>';
         
      }
      //PAUSE
      /*var seconds = 1;
      var waitTill = new Date(new Date().getTime() + seconds * 1000);
      while(waitTill > new Date()){}*/

      //updateChart(data);
   }
   
   function updatePublicOpt (data) {
      var pollArray = JSON.parse(data);//.pollList;
      //cant = optArray.length;
      publicListOpt.innerHTML = '';
      for(var a = 0; a < pollArray.length; a++){
         publicListOpt.innerHTML = publicListOpt.innerHTML +'<li><input type="radio" value="' +pollArray[a].user+'_'+pollArray[a].opt.name+'_'+pollArray[a].opt.nameopt+ '" name="publicP" id="opts'+a+'">'+pollArray[a].opt.nameopt+'</li>';
         
      }
            //updateChart(data);
   }
   
   //Function CHART//////////////
   function updateChart (data){
      
      window.onload = function() {
        //var ctx = document.getElementById("chart-area").getContext("2d");
        window.myPie = new Chart(chart, config);
    };

    /*document.getElementById('randomizeData').addEventListener('click', function() {
        config.data.datasets.forEach(function(dataset) {
            dataset.data = dataset.data.map(function() {
                return randomScalingFactor();
            });
        });

        window.myPie.update();
    });*/

    var colorNames = Object.keys(window.chartColors);
    /*document.getElementById('addDataset').addEventListener('click', function() {
        var newDataset = {
            backgroundColor: [],
            data: [],
            label: 'New dataset ' + config.data.datasets.length,
        };

        for (var index = 0; index < config.data.labels.length; ++index) {
            newDataset.data.push(randomScalingFactor());

            var colorName = colorNames[index % colorNames.length];;
            var newColor = window.chartColors[colorName];
            newDataset.backgroundColor.push(newColor);
        }

        config.data.datasets.push(newDataset);
        window.myPie.update();
    });*/

    /*document.getElementById('removeDataset').addEventListener('click', function() {
        config.data.datasets.splice(0, 1);
        window.myPie.update();
    });*/
   }
   //FUNCTION CHART END////////////////////////////////

   //EXE
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePublic));

   //LISTENERS
   voteB.addEventListener('click',function(){
      
      //var poll = document.querySelector('input[name = "publicP"]:checked').value;//{'user': user.github.id,'poll':poll}
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl+'/chart/', updateChart));
      
         
   },false);
   
   back.addEventListener('click',function(){
      
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePublic));
      
   },false);
   
   publicList.addEventListener('click',function(){
      
      var poll = document.querySelector('input[name = "publicP"]:checked').value;//{'user': user.github.id,'poll':poll}
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl+"opt/"+poll, updatePublicOpt));
         
   },false);
   

})();
