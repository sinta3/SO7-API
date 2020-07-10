
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const album = require('./data/data')


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/',(req,res) => {
    res.send({
        message:'Welcome to SO7 Albums List Api',
        url: {
            GET:'/album',
            POST:'/album',
            DELETE:'/album/:id',
            PUT:'/album/:id'
        }});
})
app.get('/album',(req,res) => {
    res.send(album);
})

app.post('/album',(req,res) => {
    const {id,name,year} = req.body;
    
    album.push({id,name,year});
   
    console.log(req.body)
    res.send({message:'succesfully add data', albums:album})
})

app.put('/album/:id',(req,res) => {
    const {id} = req.params;
    const{name,year} = req.body;
    
    const albumId = album.findIndex((item) => item.id === parseInt(id))
    const newAlbum = {
        id:parseInt(id),
        name,
        year,
    }

    album.splice(albumId,1,newAlbum)

    res.send({message:'Succesfully updata data',albums:album})
})

app.delete("/album/:id", (req, res) => {
    const { id } = req.params;

    const albumId = album.findIndex((user) => user.id === parseInt(id));

    album.splice(albumId, 1);

    res.send({ message: "Successfully delete data", albums: album });
});

app.listen(PORT,() => {
    console.log(`servers run on port ${PORT}`)
})