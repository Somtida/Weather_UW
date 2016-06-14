'use strict';

$(document).ready(init);

function init(){
  getWeatherForecase();
  
}

function getWeatherForecase(){
  console.log("getWeatherForecase");
  $.ajax('http://api.wunderground.com/api/ae213f9eff9d83c2/forecast/q/autoip.json')
  .done(data => {
    var textFC = data.forecast.txt_forecast;
    console.log("data: ",textFC);

    var $textForecast = createTextForecast(textFC);

    console.log($textForecast);
    let text = "FORECAST @"+textFC.date;
    $('.textFC').addClass('alert alert-warning').text(text);
    $('.textForecast').empty().append($textForecast);

    var simpleforecast = data.forecast.simpleforecast.forecastday;
    var $divs = createSimpleForecast(simpleforecast);
    let simpleTxt = "Simple Forecast For This Week..";
    $('.simpleText').addClass('alert alert-success').text(simpleTxt);
    $('.simpleForecast').empty().addClass('jumbotron').append($divs);


  })
  .fail( jq, error, status => {
    console.log("Error: ",error);
  })
}

function createTextForecast(allText){
  console.log("allText");
  let $divs = allText.forecastday.map( all => {
    let $div = $('.textForecastBox').clone();
    $div.removeClass('.textForecastBox');
    $div.addClass('textFBox');
    $div.find('.icon').attr('src',all.icon_url).attr('alt',all.icon);
    $div.find('.title').text(all.title);
    $div.find('.fcttext').text(all.fcttext);
    return $div;

  });
  return $divs;
}

function createSimpleForecast(allSimple){
  console.log("createSimpleForecast");
  var $divs = allSimple.map( simple => {
    var $div = $('.simpleForecastBox').clone();
    $div.removeClass('simpleForecastBox');
    $div.addClass('simpleBox');
    $div.find('.simpleIcon').attr('src',simple.icon_url);
    $div.find('.date').text(simple.date.pretty);
    $div.find('.high').text(simple.high.fahrenheit);
    $div.find('.high').data('celsius',simple.high.celsius);
    $div.find('.low').text(simple.low.fahrenheit);
    $div.find('.low').data('celsius',simple.low.celsius);
    $div.find('.high').text(simple.avehumidity);
    return $div
  });
  return $divs;

}
