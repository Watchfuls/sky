var Data = [];
var mood = "";
var secondmood = "";
var file = "Fail"

//comments are code for multiple mood selection

$(document).ready(function(){
  $("[type=range]").change(function(){
    var newval=$(this).val();
    $("#slider_value").text(newval);
    moodlist = ["Calm","Sad","Wide Awake","Fearless","Agitated","Happy","Tired","Scared"]
    var maxim = [document.getElementById("Speed").value,document.getElementById("Positivity").value,document.getElementById("Intensity").value,document.getElementById("Courage").value,Math.abs(document.getElementById("Speed").value-99),Math.abs(document.getElementById("Positivity").value-99),Math.abs(document.getElementById("Intensity").value-99),Math.abs(document.getElementById("Courage").value-99)];
    mood = (moodlist[indexOfMax(maxim)]);
    //maxim[indexOfMax(maxim)] = 0;
    //secondmood = (moodlist[indexOfMax(maxim)]);
    jQuery('#table').empty();
    content();
  });
});

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }
  var max = arr[0];
  var maxIndex = 0;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
}

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: 'Uploads/UploadsData.xml',
    dataType: "xml",
    success: function(xml){
      Data = [];
      $(xml).find('programme').each(function(){
        var TempData = ["","",""];//ar TempData = ["","","",""];
        var $programme = $(this);
        TempData[0] = $programme.find('name').text();
        TempData[1] = $programme.find('imagepath').text();
        TempData[2] = $programme.find('mood').text();
        //TempData[3] = $programme.find('secondmood').text();
        Data.push(TempData);
      });
      test = "Success";
      content();
    },
    error: function(){
      test = "Fail";
      content();
    }
  });
});

content = function(file) {
  var html = '<tr>';
  var shows = 0;
  /*
  var bothmood = [];
  var primarymood = [];
  var secondmood = [];
  for (i=0;i<Data.length;i++) {
    if (Data[i][2] == mood || Data[i][3] == secondmood){
    bothmood.push(i);
    }
    elseif (Data[i][2] == mood || Data[i][3] != secondmood{
    primarymood.push(i);
    }
    elseif (Data[i][2] != mood || Data[i][3] == secondmood){
    secondarymood.push(i);
    }
  bothmood = bothmood.concat(primarymood);
  bothmood = bothmood.concat(secondmood);

  // then instead of lines 89 & 90, 101 & 102
  for (i=0;i<bothmood.length;i++) {
  if (shows < 5) {
  //line 92, 104 and i is replaced by bothmood[i]

  */
  if (mood.length > 0) {
    for (i=0;i<Data.length;i++) {
      if (Data[i][2] == mood && shows < 5) {
        shows++;
        html += '<td style="width:20%"> <div class="Content"> <img src="' + Data[i][1] + '" alt="Content" id="'+ Data[i][0] +'" width="100%"> </div> </td>';
      }
    }
    for (i = 0; i < 5-shows; i++) {
      html += '<td style="width:20%"> <div class="NoContent"> <img src="" alt="NoContent" id="" width="100%"> </div> </td>';
    }
    html += '</tr><tr>';
    shows = 0;
    for (i=0;i<Data.length;i++) {
      if (Data[i][2] == mood && shows < 5) {
        shows++;
        html += '<td style="width:20%">'+ Data[i][0] +'</td>';
      }
    }
    for (i = 0; i < 5-shows; i++) {
      html += '<td style="width:20%">No Content</td>';
    }
  }
  else {
    if (test == "Success") {
      for (i = 0; i < 5; i++) {
        html += '<td style="width:20%"> <div class="Content"> <img src="' + Data[i][1] + '" alt="Content" id="'+ Data[i][0] +'" width="100%"> </div> </td>';
      }
      html += '</tr><tr>';
      for (i = 0; i < 5; i++) {
        html += '<td style="width:20%">'+ Data[i][0] +'</td>';
      }
      html += '</tr>';
    }
    else if (test == "Fail") {
      for (i = 0; i < 5; i++) {
        html += '<td style="width:20%"> <div class="NoContent"> <img src="" alt="NoContent" id="" width="100%"> </div> </td>';
      }
      html += '</tr><tr>';
      for (i = 0; i < 5; i++) {
        html += '<td style="width:20%">No Content</td>';
      }
    }
  }
  html += '</tr>';
  $('#table').append(html);
}
