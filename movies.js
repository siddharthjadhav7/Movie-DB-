function initialize () {
 
  
}
 
function sendRequest () {
   var count,lang,overview,posterPath,originalTitle,genre,htm,output;
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   console.log(query);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {    
       if (this.readyState == 4) {
var json = JSON.parse(this.responseText);
console.log(json.results);
var result = json.results;
var t = result.length; 

//Itemized clickable list
document.getElementById("output").innerHTML="Search Result";
var output = document.getElementById("output").innerHTML;
for(count = 0; count < t; count++){ 
var otitle = JSON.stringify(result[count].original_title);
var id = JSON.stringify(result[count].id);
var releasedate = JSON.stringify(result[count].release_date);
var arr = releasedate.split("-");
var year = arr[0];
console.log(year);
document.getElementById("output").innerHTML=output + " <li><a href='#' onclick='info("+ id +")'>" + otitle +" " + year +" </a></li>";
output = document.getElementById("output").innerHTML;
}  
       }
   };
   xhr.send(null);
}

function info (id) {
   var count1,lang,overview,poster_path,originalTitle,genre,credits,temp;
   var xhr1 = new XMLHttpRequest();
   var lnk = "proxy.php?method=/3/movie/" + id;
   xhr1.open("GET", lnk);
   xhr1.setRequestHeader("Accept","application/json");
   

   
   
 xhr1.onreadystatechange = function () {   
       if (this.readyState == 4) {
var json1 = JSON.parse(this.responseText);
console.log(json1);


//Title , Overview , Genres
originalTitle= json1.original_title;
overview = json1.overview;
var results1 = json1.genres;
var t1 = results1.length;
console.log(results1);
console.log(t1);
var genre1= "";


for(temp = 0; temp <t1; temp++){ 
var name1 = JSON.stringify(results1[temp].name);

genre1 = genre1 + name1 + ",";

}
console.log(genre1);

var str2 = "Original Title: " + originalTitle; 
var str = "Overview: " + overview; 
var str3 = "Genres: " + genre1;


//Display image
var poster_path = json1.poster_path;
var lnk1 = 'https://image.tmdb.org/t/p/w500';
lnk1=lnk1.concat(poster_path);
var str1 = "Image: <img src= "+lnk1+"  height='300px' width='250px'>"; 
console.log(lnk1);



newoutput = " <pre> " + str1 + " \n " + str2 + " \n " + str3 + " \n " + str + "</pre>";
output = newoutput.fontsize(5);
document.getElementById("output").innerHTML = output;
console.log(output);

}
   };
    xhr1.send(null);
	
//new object for displaying CAST MEMBERS	
   var xhr2 = new XMLHttpRequest();
   var link = "proxy.php?method=/3/movie/" + id + "/credits";
   xhr2.open("GET", link);
   xhr2.setRequestHeader("Accept","application/json");
   console.log(link);

   
   
 xhr2.onreadystatechange = function () {   
       if (this.readyState == 4) {
var json2 = JSON.parse(this.responseText);
console.log(json2.cast);
var count1,name,finaloutput;
var output1= "";
var results = json2.cast;

if(results == 0)
{console.log("nothing")}

else{
for(count1 = 0; count1 < 5; count1++){ 

var name = JSON.stringify(results[count1].name);
output1 = output1 + "\n" + name;
}
console.log(output1);
}

var output2 = output;
var str4 = "Cast:" + output1;
var str5 = str4.fontsize(5);
finaloutput = output2 + "\n" + "<div>" + str5;
console.log(output2);
document.getElementById("output").setAttribute("align", "left");
document.getElementById("output").innerHTML = finaloutput;
	   }
 }
	xhr2.send(null);
	
}