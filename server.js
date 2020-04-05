const express = require ('express'); //express the server
const cors = require ('cors'); //users that are allowed to mnublate (touch) my server
require('dotenv').config ; // env file has vars so we can access this file
const PORT = process.env.PORT || 3000; //var port get it`s value from .env, if not accessed give it value 3000
const server = express ();
server.use(cors());

server.listen(PORT, ()=>{
  console.log('listening from port ', PORT);// read server data when accssed from port 3000
});
// server.get('/', (req, res)=> {
//   res.status(200).send('finally!');
// });
//location
server.get('/location', (req,res)=>{ //user must enter "location"
  const theLocation=req.query.location; //passed the search query
  const geoData=require('./data/geo.json'); // accsess file data and get data from geo.jason.
  const locationInfo= new Location(theLocation, geoData);//objec instance
  res.send(locationInfo);//when user requests /location the reult will be the object locationInfo which contains formatted_query, latitude and longitude
});
function Location(location, data){//constructor
  this.search_query= location;
  this.formatted_query=data[0].display_name;// because the object is in data array and its is index 0, accsses data on index 0 which is the object then get display_name value.
  this.latitude= data[0].lat; //same
  this.longitude= data[0].lon ; //same
}
let arr1=[];

server.get('/darksky', (req,res)=>{
  const theDarksky=req.query.darksky;
  const darkskyData=require('./data/darksky.json');
  darkskyData.data.forEach(element => { //for each object get time and forcsat from data array,
    const darkskyInfo= new Darksky(theDarksky, element);
    arr1.push(darkskyInfo);
  });
  res.send(arr1);
});
function Darksky(darksky, theData){
  this.search_query= darksky;
  this.forecast= theData.weather.description;//weather is an object
  this.time= theData.datetime;
}
server.use('*',( req,res)=>{
  let obj={'error': [{'status': 500, 'responseText': 'Sorry, something went wrong'}]};
  res.status(obj.error[0].status).send(obj.error);
});
