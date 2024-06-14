
const express = require('express');
const path = require('path');
const app = express();
var contentful = require('contentful');
const { documentToPlainTextString } = require('@contentful/rich-text-plain-text-renderer');


require("dotenv").config();
// main.js
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// app.use(express.static('public'))

// requesting info 







var client = contentful.createClient({
    space: process.env.SPACE_ID  ,
    accessToken: process.env.ACCESS_TOKEN
  });

 



// const asset = client.getAsset('7DON9IwIngRdBOX7Zh3Ubw')
//   .then((asset) => console.log(asset.fields.file.url)



// )

client.getEntries()
.then(function (entries) {
  // log the title for all the entries that have it
  entries.items.forEach(function (entry) {
    if (entry.fields.productGallery) {
      // console.log(JSON.stringify(entry.fields.productGallery));
      entry.fields.productGallery.forEach( function (imageItem){
          console.log(JSON.stringify(imageItem.fields.file.url))
          console.log('.................')

      }


      )

    }


  });
  
}).then(
  client.getAssets()
  .then((asset) => console.log(asset))
  .catch(console.error)

);

 




app.get('/', async(req, res) => {
  

  var Items = []
// client.getEntries().then(function (entries) {

//   entries.items.forEach(function (entry) {
    
//     console.log(entry)
 
//     if (entry.fields.productName) {
    
 
//       console.log(entry.fields.productName);
//     // console.log(entry.fields.productDescription)
//       Items.push(entry)
//     }

   
//   });


// });


  
 

 client.getEntries()
  .then((response) => {
      
  


    
      
    let itemsTextWithPic = [];
    response.items.forEach((item) => {
        let gallery = []
        item.fields.productGallery?.forEach((oi)=> {
          gallery.push(

            {url: `https:${oi.fields.file.url}?w=200`}
          )

        });
      if (item.fields.productGallery) {
        // console.log(JSON.stringify(entry.fields.productGallery));

       item.fields.productGallery.forEach( (imageItem)=>{
         
           
          itemsTextWithPic.push( 
            {
               text: documentToPlainTextString(item.fields.productDescription),
                 picUrl: `https:${imageItem.fields.file.url}?w=100`
            }
        );          
      
  
        }
  
  
        )
  
      }


   
      
       

    });


             res.render('pages/home', {
            
             title: 'Home',  
            //  items: plainTextItems
             items: itemsTextWithPic
  
      
               });

  });
  

 //   Items,
            // // mascots: mascots,
            // tagline: tagline,



  
  // var mascots = [
  //   { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
  //   { name: 'Tux', organization: "Linux", birth_year: 1996},
  //   { name: 'Moby Dock', organization: "Docker", birth_year: 2013},
  //  ...Items
  
  
  // ];
  // var tagline = "No programming concept is complete without a cute animal mascot.";
  
 
 
});


app.get('/about', async (req, res) => {
  //<-- Used to find items. This is a blueprint for mongoDB.
    res.render('pages/about',{}); // <-- Tells ejs to populate list of items into the html. 
  });



  app.get('/services', (req, res) => {

    res.render('pages/services'); // <-- Tells ejs to populate list of items into the html. 
  });

  app.get('/planning',  (req, res) => {

    res.render('pages/planning'); // <-- Tells ejs to populate list of items into the html. 
  });

  app.get('/grief',  (req, res) => {

    res.render('pages/grief'); // <-- Tells ejs to populate list of items into the html. 
  });

  app.get('/contact', (req, res) => {

    res.render('pages/contact'); // <-- Tells ejs to populate list of items into the html. 
  });



app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
  });