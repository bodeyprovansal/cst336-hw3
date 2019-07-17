var APIkey = "e206a88bfad62633f5e4671a7383ff00";
var zipCode;
var days;
 
$(document).ready(function () {
  console.log("document ready");
  resetForm();
});


      
$("#zip").on("change", function() {
  zipCode = $("#zip").val();
  $.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?&",
    dataType: "json",
    data: {"zip": zipCode, "APPID": "e206a88bfad62633f5e4671a7383ff00"},
    success: function(data, status) {
          $("#zipError").html("");            
          },
          error: function(error, status) {
             $("#zipError").html("Zip code not found.");
            console.log("error");
          }
      });
    });//Zip Change
$("#days").on("change", function() {
    days = $("#days").val();
}); 
$("#zipSubmit").on("submit", function() {
       showData(zipCode, days);        
});
$("#zipForm").on("submit", function(e) {
        e.preventDefault();
        alert("Submitting Form...");
        if(isFormValid()) {
           showData(zipCode, days);      
        }
});//SUBMIT FORM
      
function showData(zipCode, days) {
       
      $.ajax({
          method: "GET",
          url: "https://api.openweathermap.org/data/2.5/forecast?&",
          dataType: "json",
          data: {"zip": zipCode, "APPID": "e206a88bfad62633f5e4671a7383ff00"},
          success: function(data, status) {
              $("#card").html("");
              $("#card").append("<h3>" + days + "-Day Forecast For: </h3>");
              $("#card").append("City: " + data.city.name + "<br>");
              $("#card").append("Longitude: " + data.city.coord.lon + "<br>");
              $("#card").append("Latitude: " + data.city.coord.lat + "<br>");

            if(days > 0) {  
                for (var i = 0; i < (days * 8); i++) {
                  $("#weatherCard").append("<p class='time'>Day & Time: " + convertUTC(data.list[i].dt) + "</p><br>");
                  $("#weatherCard").append("<img class='weathImg' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png'/><br>");
                  $("#weatherCard").append("<span class='temp' id='tempC" + i + "'> Temp in C: " + (data.list[i].main.temp - 273).toFixed(2) + "</span><br>");
                  $("#weatherCard").append("<span class='temp' id='tempF" + i + "'> Temp in F: " + (((data.list[i].main.temp - 273) * 1.8) + 32).toFixed(2) + "</span><br>");
                  $("#weatherCard").append("<span class='humid' id='humid" + i + "'> Humidity: " + data.list[i].main.humidity + "%</span><br>");
                  $("#weatherCard").append("<span class='weath' id='weath" + i + "'> Weather: " + data.list[i].weather[0].description + "</span><br>");        
                  $("#weatherCard").append("<span class='wind' id='wind" + i + "'> Wind Speed: " + data.list[i].wind.speed + "m/s</span><br>");
                  $("#weatherCard").append("<hr>");
                }
              }
          },
          error: function(error, status) {
              
            
          }
      });
      }

function convertUTC(timeStamp) {
      var d = new Date(timeStamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var min = d.getMinutes();
      var sec = d.getSeconds();
      var hours = d.getHours();
      if (hours > 12) {
          hours = hours - 12;
          min = "PM";
      } else {
          min = "AM";
      }
        var time = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' ' + hours + ' ' + min;
        return time;
      }
      
function isFormValid() {
      isValid = true;
       if ($("#days").val() < 1) {
        $(("#dayError")).html("Forecast is 1 to 5 days");
         isValid = false;
      }
      if($("#days").val() > 5) {
        $(("#dayError")).html("Forecast is 1 to 5 days");
        isValid = false;
      }
      if ($("#zip").val().length != 5) {
          $("#zipError").html("Please Enter A Zip Code.");
          isValid = false;
      }
        return isValid;
    }  
function resetForm() {
        console.log("form reset");
        $("#zipForm").trigger('reset');
    }
      