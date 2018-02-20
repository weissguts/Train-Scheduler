// Initialize Firebase
var config = {
    apiKey: "AIzaSyAFrIzWmU1vznLoD6UTFOOxPBJejgDR_jY",
    authDomain: "train-scheduler-7c1e5.firebaseapp.com",
    databaseURL: "https://train-scheduler-7c1e5.firebaseio.com",
    projectId: "train-scheduler-7c1e5",
    storageBucket: "train-scheduler-7c1e5.appspot.com",
    messagingSenderId: "800213442538"
};
firebase.initializeApp(config);

// Create a variable to reference the ref.
var ref = firebase.database().ref();

// Capture Button Click
$("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    trainName = $("#trainName-input").val().trim();
    destination = $("#destinationName-input").val().trim();
    firstTrainTime = $("#firstTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for "Setting values in the ref"
    ref.push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
});
// Firebase watcher + initial loader HINT: .on("value")
ref.on("child_added", function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency= snapshot.val().frequency;

    var nextArrivalConverted = moment(firstTrainTime, "hh:");
    console.log(nextArrivalConverted);
    var currentTime = moment();
    console.log(currentTime);
    var diffTime = moment().diff(moment(nextArrivalConverted), "minutes");
    console.log(diffTime);
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var minutesAway = frequency - tRemainder;
    var nextArrival = moment().add(minutesAway, "minutes");

    // Change the HTML to reflect - Add each train's data into the table
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + moment(nextArrival).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");
});

