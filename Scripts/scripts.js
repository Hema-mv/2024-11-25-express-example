const port=3000;
const app = express();
const vegetables=require("../data/vegetables");

app.get("/api/vegetables",(req,res)=>
{
   console.log(vegetables)
   res.send(vegetables)
})

app.listen(port, () => {
    console.log("listening");
  });
  





