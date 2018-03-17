$( document ).ready(function() {
// initialize firebase


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDVI03mC7DrL6EB5NSKW050dq55DNLCB1s",
    authDomain: "train-scheduler-3dd50.firebaseapp.com",
    databaseURL: "https://train-scheduler-3dd50.firebaseio.com",
    projectId: "train-scheduler-3dd50",
    storageBucket: "",
    messagingSenderId: "437772374361"
  };
  
 // Initialize Firebase
 firebase.initializeApp(config);

// a var to represent the database
var database = firebase.database();

// Initial Values
    var trainName = "";
    var destination = "";
    var tTime = 0;
    var frequencyTime = "";

//capture click button to add trains
$("#submit").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      //storing and retrieving the most recent user data. 

      var trainName = $("#train-name").val().trim();
      var destination = $("#destination").val().trim();
      var tTime = moment($("#train-time").val().trim(), "HH:mm a").format("x");
      var frequencyTime = $("#frequency-time").val().trim();


      var newTrain ={
        name: trainName,
        desti: destination,
        time: tTime,
        freq: frequencyTime
      };
     
     database.ref().push(newTrain);
     //logging to the console 
     console.log(newTrain.name);
     console.log(newTrain.desti);
     console.log(newTrain.time);
     console.log(newTrain.freq);

     //Alert
     alert("Employee successfully added");

     //Clear all of the text-boxes 
     $("#train-name").val("");
     $("#destination").val("");
     $("#train-time").val("");
     $("#frequency-time").val("");

  });

//3. Create Firebase event for adding a new train to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(snapshot) {

console.log(snapshot.val());

//
var trainName = snapshot.val().name;
var destination = snapshot.val().desti;
var tTime = snapshot.val().time;
var frequencyTime = snapshot.val().freq;

 // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(tTime);
  console.log(frequencyTime);

  //first time (pushed back 1 yr to make sure it comes before current time)
  var firstTimeConv = moment(tTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConv);

  //current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //difference between the times 
  var timeDiff = moment().diff(moment(firstTimeConv),"minutes");
  console.log("DIFFERENCE IN TIME: " + timeDiff);

  // Time apart (remainder)
    var remaingTime = timeDiff % frequencyTime;
    console.log(remaingTime);

    //calculate the time the next traim arrives
    var minsTillTrain = frequencyTime - remaingTime;
    console.log("MINUTES TILL TRAIN: " + minsTillTrain);

  // caluclate the minuts until the next train
   var nextTrain = moment().add(minsTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" 
  + frequencyTime +  "</td><td>" + nextTrain +  "</td><td>" + minsTillTrain + "</td><tr>");




});

});
