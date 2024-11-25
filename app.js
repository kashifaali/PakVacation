let express = require('express');
let mongoose = require('mongoose');
let model = require('./model/listing.js');
let initdata = require('./init/data.js');
let app = express();
let path = require('path');
let ejsmate = require('ejs-mate');


app.listen(3000);
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
let methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.engine("ejs", ejsmate);
//set database
const connection = mongoose.connect('mongodb://127.0.0.1:27017/PakVacation');
connection.then((result) => {
    console.log('server connect successfully');
}).catch((err) => {
    console.log(`the server not working ${err}`);
});


const initDB = async()=>{
    await model.deleteMany({});
    await model.insertMany(initdata.data);
}
initDB();

//All routes
app.get('/', async (req,res)=>{
    let data = await model.find({});
    res.render('templates/index.ejs',{data});
})

app.get('/addnew', (req, res)=>{
    res.render('templates/addnew.ejs');
})

app.post('/listening', async (req, res) => {
    const newlisting = new model(req.body);
    await newlisting.save();
    res.redirect('/');
});

app.delete('/delete/:id', async (req,res)=>{
    let {id} = req.params;
    let deletepara = await model.findByIdAndDelete(id);
    res.redirect('/');
})


app.get('/update/:id', async(req,res)=>{
    let {id} = req.params;
    let updatedata = await model.findById(id);
    res.render('templates/update.ejs', {updatedata});
})

app.put('/update/:id', async (req, res) => {
    let { id } = req.params;
    await model.findByIdAndUpdate(id, req.body, { new: true });
    res.redirect('/');
});

app.get('/shows/:id',async (req , res)=>{
    let {id} = req.params;
    let showdata = await model.findById(id);
    res.render('templates/shows.ejs', {showdata});
})