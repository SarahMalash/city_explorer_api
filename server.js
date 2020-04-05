const express = require ('express'); //express the server
const cors = require ('cors'); //users that are allowed to mnublate (touch) my server
require('dotenv').config ; // env file has vars so we can access this file
const PORT = process.env.PORT || 3000; //var port get it`s value from .env, if not accessed give it value 3000
const server = express ();
server.use(cors());

server.listen(PORT, ()=>{
  console.log('listening from port ', PORT);// read server data when accssed from port 3000
});
// server.get('/', (input1,output1)=> {
//   output1.status(200).send('finally!');
// });
//location
server.get('/location', (input1,output1)=>{ //user must enter "location"
  const theLocation=input1.query.location; //passed the search query
  const geoData=require('./data/geo.json'); // accsess file data and get data from geo.jason.
  const locationInfo= new Location(theLocation, geoData);//objec instance
  output1.send(locationInfo);//when user requests /location the reult will be the object locationInfo which contains formatted_query, latitude and longitude
});
function Location(location, data){//constructor
  this.search_query= location;
  this.formatted_query=data[0].display_name;// because the object is in data array and its is index 0, accsses data on index 0 which is the object then get display_name value.
  this.latitude= data[0].lat; //same
  this.longitude= data[0].lon ; //same
}
let arr1=[];//empty array

server.get('/darksky', (input2,output2)=>{
  const theDarksky=input2.query.darksky;
  const darkskyData=require('./data/darksky.json');
  darkskyData.data.forEach(element => { //for each object get time and forcsat from data array,
    const darkskyInfo= new Darksky(theDarksky, element);
    arr1.push(darkskyInfo);//push each object created into arr1
  });
  output2.send(arr1);//sende arr1 which is array of object as an output
});
function Darksky(darksky, theData){
  this.search_query= darksky;
  this.forecast= theData.weather.description;//weather is an object
  this.time= theData.datetime;
}
server.use('*',( input2,output2)=>{
  const errorNum = '500';
  const errorName = 'Sorry, something went wrong';
  output2.status(errorNum).send(errorName);
});
