import  'dotenv/config';
import  express from 'express';
import connectdb from './confiq/confiq.js';

const app = express();

app.use(express.json());



// //////////// Ejs method files serve ////////////////

app.use(express.static('public'))

app.set('view engine' , 'ejs');


app.get('/' , (req ,res)=>{
res.render('home' , {})

})


app.get('/about' , (req ,res)=>{
res.render('About' , {})

})

app.get('/docs' , (req ,res)=>{
res.render('docs' , {})

})



// //////////////  Create Data for posts /////////////


app.post('/api/posts' , async (req ,res ) => {

try {
    const useref = (await connectdb()).collection("posts");
const postdata = await useref.insertMany(req.body)

if(postdata.acknowledged){
res.status(201).json({message: 'posts created succesfully'})
}


} catch (error) {
res.status(500).json({ error: error.message  , message:'posts is not created fail!'})
}
})


// /////////////  Get data For Posts ///////////////

app.get('/api/posts/:id' , async (req ,res ) => {

try {
    const useref = (await connectdb()).collection("posts");
    const postid = Number(req.params.id);

const post = await useref.findOne({id: postid})


if(!post){
return res.status(400).json({message: 'posts not found'})
}

res.status(200).json(post)
} catch (error) {
res.status(500).json({ error: error.message  , message:'Failed to fetch posts by id!'})
}
})





app.get('/api/posts' , async (req ,res ) => {

try {
    const useref = (await connectdb()).collection("posts");
const posts = await useref.find({}).toArray();

res.status(200).json({posts})

} catch (error) {
res.status(500).json({ error: error.message  , message:'Failed to fetch by posts!'})
}
})




// //////////////  Create Data for  products /////////////


app.post('/api/products' , async (req , res)=>{

try {
   const  useref = (await connectdb()).collection("products");

const  productdata = await useref.insertMany(req.body);

if(productdata.acknowledged){
  res.status(201).json({ message:'products created successfully'})
} 


return res.status(400).json({message: 'products not inserted'})

} catch (error) {
res.status(500).json({message:'products  not found!'})

}

})



// /////////////  Get data For Products ///////////////



app.get('/api/products/:id' , async (req , res )=>{

try {
     const  useref = (await connectdb()).collection("products");

const  productid = Number(req.params.id);

const product = await useref.findOne({id: productid})

if(!product){
res.status(500).json({ error: error.message  , message:'products not found!'})
}
res.status(200).json(product);

} catch (error) {
 res.status(500).json({ error: error.message  , message:' Failed to fetch products by id!'})
}

})




app.get('/api/products' , async (req , res )=>{

try {
     const  useref = (await connectdb()).collection("products");

const products =  await useref.find({}).toArray();

if(!products){
res.status(500).json({ error: error.message  , message:'products not found!'})
}
res.status(200).json({products});

} catch (error) {
 res.status(500).json({ error: error.message  , message:' Failed to fetch by products!'})
}

})





// //////////////  Create Data for  Users /////////////



app.post('/api/users' , async (req , res)=>{

try {
   const  useref = (await connectdb()).collection("users");

const  userdata = await useref.insertMany(req.body);

if(userdata.acknowledged){
  res.status(201).json({ message:'users created successfully'})
} 


return res.status(400).json({message: 'users not inserted'})

} catch (error) {
res.status(500).json({message:'users not found!'})

}

})



// /////////////  Get data For Users  ///////////////



app.get('/api/users/:id' , async (req , res )=>{

try {
     const  useref = (await connectdb()).collection("users");

const  userid = Number(req.params.id);

const user = await useref.findOne({id: userid})

if(!user){
res.status(500).json({ error: error.message  , message:'users not found!'})
}
res.status(200).json(user);

} catch (error) {
 res.status(500).json({ error: error.message  , message:'Failed to fetch user by id!'})
}

})




app.get('/api/users' , async (req , res )=>{

try {
     const  useref = (await connectdb()).collection("users");

const users =  await useref.find({}).toArray();

if(!users){
res.status(500).json({ error: error.message  , message:'users not found!'})
}
res.status(200).json({users});

} catch (error) {
 res.status(500).json({ error: error.message  , message:'Failed to fetch by users'})
}

})




// //////////////  Create Data for Recipies /////////////



app.post('/api/recipes' , async (req , res)=>{

try {
   const  useref = (await connectdb()).collection("recipies");

const  recipedata = await useref.insertMany(req.body);

if(recipedata.acknowledged){
  res.status(201).json({ message:'recipies created successfully'})
} 


return res.status(400).json({message: 'recipies not inserted'})

} catch (error) {
res.status(500).json({message:'recipies not found!'})

}

})



// /////////////  Get data For Recipies  ///////////////



app.get('/api/recipes/:id' , async (req , res )=>{

try {
     const  useref = (await connectdb()).collection("recipies");

const  recipeid = Number(req.params.id);

const recipe = await useref.findOne({id: recipeid})

if(!recipe){
res.status(500).json({ error: error.message  , message:' recipies not found!'})
}
res.status(200).json(recipe);

} catch (error) {
 res.status(500).json({ error: error.message  , message:'Failed to fetch user by id!'})
}

})




app.get('/api/recipes' , async (req , res )=>{

try {
     const  useref = (await connectdb()).collection("recipies");

const recipes =  await useref.find({}).toArray();

if(!recipes){
res.status(500).json({ error: error.message  , message:' recipies not found!'})
}
res.status(200).json({recipes});

} catch (error) {
 res.status(500).json({ error: error.message  , message:'Failed to fetch by  recipies'})
}

})










app.listen(process.env.PORT || 5000 , () => console.log(`server is running ${process.env.PORT}`))