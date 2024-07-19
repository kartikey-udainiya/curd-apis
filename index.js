import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
 
// show all existing data
app.get("/all",(req,res)=>{
    res.json(books);
});

//show books through specific id

app.get("/all/:id",(req,res)=>{
    const specificBook = books.find((book)=>book.id===parseInt(req.params.id));
    if (!specificBook) return res.status(404).json({ message: "Book not found" });
    res.json(specificBook);

});

//create new data base for new book

app.post("/all",(req,res)=>{
    const newBook = {
        id : books.length + 1 ,
        name : req.body.name,
        subject : req.body.subject,
        author : req.body.author,
    }; 
    books.push(newBook);
    res.json(newBook);
});

// updating existing database

app.patch("/all/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const existingBook = books.find((book)=>book.id===id); 
    if (!existingBook) return res.status(404).json({ message: "Book not found" });

    const updatedInfo = {
        id : id,
        name : req.body.name || existingBook.name,
        subject : req.body.subject || existingBook.subject,
        author : req.body.author || existingBook.author,
    };
    const searchIndex = books.findIndex((a)=> a.id===parseInt(req.params.id));
    books[searchIndex]= updatedInfo ;
    res.json(updatedInfo);

});

//deleting info
app.delete("/all/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const searchIndex = books.findIndex((a)=>a.id===id);
    books.splice(searchIndex,1);
    res.json({Message : "Info deleted"});
});

app.listen(port,()=>{
    console.log(`server listening to port: ${port}`);
});

let books = [
   {
    id : 1,
    name : "Human Anatomy",
    subject : "Science",
    author : "human1",
   },
   {
    id : 2,
    name : "History of contemporary India",
    subject : "Social studies",
    author : "human2",
   },
   {
    id : 3,
    name : "cosmology",
    subject : "Science",
    author : "human3",
   },
   {
    id : 4,
    name : "Sociology",
    subject : "Arts",
    author : "human4",
   },
   {
    id : 5,
    name : "Learning C++",
    subject : "Computer Science",
    author : "human5",
   },
   {
    id : 6,
    name : "Large langue models",
    subject : "computer cience",
    author : "human6",
   },
];