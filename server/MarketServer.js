const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const { timeStamp } = require('console');
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
// import { userModel } from './LogInServer';
var fetchedDataBase = false;

const listingSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    ownerid: { type: String, required: true },
  }
);

const auctionSchema = new mongoose.Schema(
  {
    listingId: { type: String, required: true },
  }
)

const inquiresSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    listingIdParent: { type: String, required: true },
  }
);

const cartSchema = new mongoose.Schema({
  cartId: { type: String, required: true },
  // cartItems: { type: Array, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  listingId: { type: String, required: true },
})

const listingModel = mongoose.model("listingData", listingSchema);
const inquiresModel = mongoose.model("inquiresData", inquiresSchema);
const cartModel = mongoose.model("cartData", cartSchema);
const auctionModel = mongoose.model("auctionData", auctionSchema);

// express is not good for production static files, use cdn, or dedicated file server like ngnix, appache
app.use(express.static(path.join(__dirname, '..', 'build')));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

// const port = process.env.PORT || 3000;

// app.listen(port);

// console.log(`Listening on port ${port}`);

// const express = require("express");
// const e = require("express");
// const app = express();
//middleware


app.use(express.json());

//----------MONGODB----------------//

// const url = 'mongodb://localhost:27017';
// const dbName = "ecommerceDB"
// const client = new MongoClient(url);


// client.connect((error) => {
//   if(error) console.log(error);
//   console.log('Connected to MongoDB');
//   const db = client.db(dbName);


// })


let listings = [];
let inquiries = [];
let products = [];

app.get('/', (req, res) => {
  res.status(200).json({
    success: false,
    errorCode: 404
  });
});

// let cartId = Math.floor(Math.random() * 8);
// const cart = {
//   cart_id: cartId,
//   products: products,


// };

//TODO: ADD TO CART API
app.post('/api/addToCart', async (req, res) => {
  const listingId = req.query.listingId;
  // const cartId = req.query.cartId;

  try {
    const item = req.body;

    var myData = new cartModel(item);
    myData.save()
      .then(item => {
        console.log("Successfully added data to cart");
        console.log(item);
        // console.log(myData);
      })
      .catch(err => {
        console.log(err);
      });

  }
  catch (e) {
    console.log(e);
  }

  try {
    const cart = await cartModel.find().exec();
    // const item = await listingModel.findOne({listingId}).exec();
    return res.status(200).json({
      success: true,
      cart: cart,
      errorCode: 200
    });

  } catch (e) {
    console.log(e)
  }

});

app.get('/api/viewCart', async (req, res) => {
  // const type = req.query.type;
  const cartId = req.query.cartId;
  try {
    const cart = await cartModel.find({ cartId: cartId }).exec();
    res.status(200).json({
      success: true,
      cart: cart,
      errorCode: 200
    });

  } catch (e) {
    console.log("Error in viewing cart" + e);
  }
});

app.get(`/api/deleteFromCart`, async (req, res) => {
  const listingId = req.query.listingId;
  const cartId = req.query.cartId;

  try {
    const removeItem = await cartModel.findOneAndDelete({ listingId: listingId }).exec();
    const cart = await cartModel.find({ cartId: cartId }).exec();

    if (removeItem) {
      return res.status(200).json({
        success: true,
        cart: cart,
        errorCode: 200
      });

    }


  } catch (e) {
    console.log(e);
  };


  // for (let item of products) {
  //   if (item.id == listingId) {
  //     products.splice(products.indexOf(item), 1);
  //     return res.status(200).json({
  //       success: true,
  //       cartItems: products,
  //       errorCode: 200
  //     });
  //   }
  // }
  // res.status(404).json({ message: 'Cannot delete ID that is invalid or not found.' });
});


//TASK STATUS: Working 
app.post('/api/createListing', async (req, res) => {
  const ownerid = req.query.ownerid; //ADDS OWNER ID TO THE LISTING
  // console.log(ownerid);

  try {
    const item = req.body;
    console.log("OWNER ID");
    // console.log(ownerid);

    var myData = new listingModel(item);
    myData.save()
      .then(listing => {
        console.log("Successfully Stored data");
        // console.log(listing);
        // console.log(myData);
      })
      .catch(err => {
        console.log(err);
      });
  }
  catch (e) {
    console.log(e);
  }

  try {

    const items = await listingModel.find().exec();
    const inquiries = await inquiresModel.find().exec();
    const userItems = await listingModel.find({ ownerid: ownerid }).exec();
    // console.log("ITEM HERE")
    // console.log(items);
    return res.status(200).json({
      success: true,
      items: items,
      userItems: userItems,
      inquiries: inquiries,
      errorCode: 200
    });

    // console.log("USERITEMS HERE")
    // console.log(userItems)
  }
  catch (e) {
    console.log(e);
  }

});



//TASK STATUS: Working as intended
app.get('/api/viewListings', async (req, res) => {
  //console.log('req.body.userHasData');
  //console.log(req.body.userHasData)
  const ownerid = req.query.ownerid;
  const listingId = req.query.listingId;

  try {
    if (listingId) {
      const item = await listingModel.findById(listingId).exec();
      res.status(200).json({
        success: true,
        item: item,
        errorCode: 200
      });
    } else {
      const items = await listingModel.find().exec();
      const inquiries = await inquiresModel.find().exec();
      const userItems = await listingModel.find({ ownerid: ownerid }).exec();
      // console.log("ITEM HERE")
      // console.log(items);
      res.status(200).json({
        success: true,
        items: items,
        userItems: userItems,
        inquiries: inquiries,
        errorCode: 200
      });


    }




  } catch (e) {
    console.log(e);
  }
  // try {

  //   if (Object.keys(req.query).length === 0) {
  //     const items = await listingModel.find().exec();
  //     // console.log('items ARE HERE')
  //     // console.log(items);
  //     const inquiries = await inquiresModel.find().exec();
  //     res.status(200).json({
  //       success: true,
  //       items: items,
  //       inquiries: inquiries,
  //       errorCode: 200,
  //     })
  //   }
  //   else {
  //     const ownerid = req.query.ownerid;
  //     // console.log("ID HERE")
  //     // console.log(ownerid)
  //     const items = await listingModel.find({ ownerid: ownerid }).exec();
  //     // console.log("ITEMS OF OWNER ONLY HERE")
  //     // console.log(items);

  //     const inquiries = await inquiresModel.find().exec();
  //     res.status(200).json({
  //       success: true,
  //       items: items,
  //       inquiries: inquiries,
  //       errorCode: 200,
  //     })



  //     }}
  //   catch {
  //   console.log("Error");
  // }
});



//TASK STATUS: WORKS AS INTENDED USING FOR LOOP
app.get(`/api/deleteListing`, async (req, res) => {
  try {
    const listingId = req.query.id;
    const removeItem = await listingModel.findByIdAndDelete(listingId);
    const removeInquiries = await inquiresModel.remove({ listingIdParent: listingId });
    const items = await listingModel.find().exec();
    const inquiries = await inquiresModel.find().exec();

    if (removeItem && removeInquiries) {
      console.log("Succesfully deleted item.");
      return res.status(200).json({
        success: true,
        items: items,
        inquiries: inquiries,
        errorCode: 200
      });
    }


    // }
    // for (let item of items) {
    //   if (item.id == items) {
    //     listings.splice(listings.indexOf(item), 1);
    //     return res.status(200).json({
    //       success: true,
    //       items: listings,
    //       inquiries: inquiries,
    //       errorCode: 200
    //     });
    //   }
    // }
    res.status(404).json({ message: 'Cannot delete ID that is invalid or not found.' });

    // const inquiriesWithSameParent = await inquiresModel.find({ listingIdParent: listingId });
    // console.log(inquiriesWithSameParent);
    // if (inquiriesWithSameParent) {
    //   res.status(200).json({
    //     success: true,
    //     items: items,
    //     inquiries: inquiriesWithSameParent,
    //     errorCode: 200
    //   })


    // }


  }
  catch (e) {
    console.log(e)
  }


});

//TASK STATUS: WORKS AS INTENDED, NOW PASSES TEST AND CHECKS IF ID IS VALID OR NOT
app.post('/api/makeInquiry', async (req, res) => {
  try {

    const listingId = req.query.listingId;
    const inquiry = req.body;
    console.log(inquiry);
    const item = await listingModel.findById(listingId);
    const items = await listingModel.find().exec();
    const inquiries = await inquiresModel.find().exec();

    if (item) {
      var myData = new inquiresModel(inquiry);
      myData.save()
        .then(inquiry => {
          console.log("Inquiry stored successfully");
          console.log(inquiry);
        })
        .catch(err => {
          console.log(err);
        });
      // const inquiry = req.body;
      // inquiry.id = listingId;
      return res.status(200).json({
        success: true,
        items: items,
        inquiries: inquiries,
        errorCode: 200
      })
    } else {
      return res.status(200).json({
        success: false,
        message: 'ID cannot be found'
      })
    }
  }
  catch (e) {
    console.log(e);
  }
  // const listing = items.find(item => item.id === parseInt(listingId));

});


//TASK STATUS: WORKS AS INTENDED, NOW PASSES TEST AND CHECKS IF ID IS VALID OR NOT
app.post('/api/makeAuction', async (req, res) => {

  try {
    const listingId = req.query.listingId;
    const auction = req.body;
    console.log("LISTING ID")
    console.log(listingId);
    const item = await listingModel.findById(listingId);
    const auctions = await auctionModel.find().exec();

    if (item) {
      var myData = new auctionModel(auction);
      myData.save()
        .then(a => {
          console.log("Auction stored successfully");
          console.log(a);
        })
        .catch(err => {
          console.log(err);
        });
      // const inquiry = req.body;
      // inquiry.id = listingId;
      return res.status(200).json({
        success: true,
        auctions: auctions,
        errorCode: 200
      })
    } else {
      return res.status(200).json({
        success: false,
        message: 'ID cannot be found'
      })
    }
  }
  catch (e) {
    console.log(e);
  }
  // const listing = items.find(item => item.id === parseInt(listingId));

});

app.get('/api/getAuctions', async (req, res) => {
  try {
    // const listingId = req.query.listingId;
    const auctions = await auctionModel.find().exec();

    res.status(200).json({
      success: true,
      auctions: auctions,
      errorCode: 200
    })

  }
  catch (e) {
    console.log(e)
  }

});
// app.post('/api/makeInquiry', (req, res) => {

//   const listingId = req.query.listingId;
//   const inquiry = req.body;

//   const listing = listings.find(listing => listing.id === parseInt(listingId));

//   if (listing) {
//     var myData = new inquiresModel(req.body);
//     myData.save()
//       .then(inquiry => {
//         console.log("Successfully Stored data");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     // const inquiry = req.body;
//     inquiry.id = listingId;
//     inquiries.push(inquiry);
//     return res.status(200).json({
//       success: true,
//       items: listings,
//       inquiries: inquiries,
//       errorCode: 200
//     })
//   } else {
//     return res.status(200).json({
//       success: false,
//       message: 'ID cannot be found'
//     })
//   }
// });

//STATUS: WORKING NOW
app.get('/api/getInquiries', async (req, res) => {
  try {
    const listingId = req.query.listingId;
    const items = await listingModel.find().exec();
    const inquiries = await inquiresModel.find().exec();
    const inquiriesWithSameParent = await inquiresModel.find({ listingIdParent: listingId });
    console.log(inquiriesWithSameParent);
    if (inquiriesWithSameParent) {
      res.status(200).json({
        success: true,
        items: items,
        inquiries: inquiriesWithSameParent,
        errorCode: 200
      })


    }
    // if (Object.keys(req.query).length === 0) {
    //   res.status(200).json({
    //     success: false,
    //     message: 'Please input a listing id.'
    //   })
    // } else {
    //   let filteredList = inquiries.filter(i => i.id === listingId);
    //   res.status(200).json({
    //     success: true,
    //     items: [],
    //     inquiries: filteredList,
    //     errorCode: 200
    //   })
    // }
  }
  catch (e) {
    console.log(e)
  }

});



module.exports = app;

if (require.main === module) {
  console.log('Starting app');
  const port = process.env.PORT || 3003;
  app.listen(port);
}


