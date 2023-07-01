const express = require("express");
const cors = require("cors");
const app = express();
const studentRoutes = require("./routes/StudentRoutes");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"passwd",
//     database:"dbms",
// });

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

db.connect((err, result) => {
  if (err) {
    console.log("err", err);
  }
  console.log("result", result);
});
// app.use("/api/user",studentRoutes);

const sqlSearchTable = "SELECT * FROM USER_details;";
const createTable =
  "CREATE TABLE USER_details (roll varchar(25) primary key,stakeholdertype varchar(2),passwrd varchar(50),fname varchar(30),lname varchar(30),gender varchar(2), cat varchar(5), DOB date, email varchar(50), dept varchar(30));";
const insertValues =
  "INSERT INTO USER_details (roll,stakeholdertype,passwrd,fname,lname,gender,cat,DOB,email,dept) VALUES (?,?,?,?,?,?,?,?,?,?) ;";
const dataSearch = "select * from USER_details where roll=? and passwrd=?;";
const profilesearch = "select * from USER_details  where roll=?";

const createTableBiodata =
  "create table USER_biodata(roll  varchar(25) primary key,phone varchar(12),inst_mail varchar(50),Guardmail varchar(50),Guardphone varchar(12),address varchar(255), city varchar(30),policeSt varchar(30),pincode varchar(10),district varchar(30),state varchar(30),country varchar(30),emgphone varchar(12),emgperson varchar(25),emgrelation varchar(30),emgaddress varchar(255),father varchar(25),income integer, guardname varchar(25),profession varchar(50),foreign key(roll) references USER_details(roll));";
const biodataSearch="select * from USER_biodata where roll=?;"
const updateprofile="update USER_details set dept=?,email=? where roll=? ;"

const updatebiodata="update USER_biodata set phone=?,inst_mail=?,Guardmail=?,Guardphone=?,address=?,city=?,policeSt=?,pincode=?,district=?,state=?,country=?,emgphone=?,emgperson=?,emgrelation=?,emgaddress=?,father=?,income=?,guardname=?,profession=? where roll=? ;";

const insertintobiodata =
  "insert into USER_biodata (phone,inst_mail,Guardmail,Guardphone,address,city,policeSt,pincode,district,state,country,emgphone,emgperson,emgrelation,emgaddress,father,income,guardname,profession,roll) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  const findbiodata="select roll from USER_biodata where roll=?;";


app.post("/api/user/create", async (req, res) => {
  try {
    const {
      roll,
      stakeholdertype,
      passwrd,
      fname,
      lname,
      gender,
      DOB,
      cat,
      email,
    } = req.body;
    const dept = null;
    //  console.log("DOB",DOB);

    db.query(sqlSearchTable, (err, result) => {
      if (err) {
        if (err.code === "ER_NO_SUCH_TABLE") {
          // createSchema and table
          db.query(createTable, (err, result) => {
            if (err) {
              console.log("1");
              return res.status(400).json({ msg: "something went wrong-1" });
            }
            console.log("table created successfully");
          });
        } else {
          console.log("2");
          return res.status(400).json({ msg: "something went wrong" });
        }
      }

      db.query(
        insertValues,
        [
          roll,
          stakeholdertype,
          passwrd,
          fname,
          lname,
          gender,
          cat,
          DOB,
          email,
          dept,
        ],
        (err, result) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              console.log("user exist");
              return res
                .status(400)
                .json({
                  msg: `User-${roll} already registered please try to login`,
                });
            } else {
              console.log("3");
              return res.status(400).json({ msg: "something went wrong-2" });
            }
          }
          return res.status(200).json({ msg: "Registraion successfull" });
        }
      );
    });
    console.log("4");
  } catch (error) {
    return res.status(400).json({ msg: "Error while Registering you" });
  }
});

app.get("/api/user/get/:roll/:passwrd", async (req, res) => {
  try {
    let { roll, passwrd } = req.params;
    console.log(roll, passwrd);
    db.query(dataSearch, [roll, passwrd], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (result.length == 0) {
        return res.status(200).json({
          msg: "User Not Registered/(wrong credential)",
          result,
        });
      }
      return res.status(200).json({ msg: "Login successful", result });
    });
  } catch (e) {
    return res.status(400).json({ msg: "Error while Login" });
  }
});




app.post("/api/user/update",async(req,res)=>{
  try{
    const {
      roll,
      dept,
      email
    }=req.body;
    // console.log(roll);
    db.query(updateprofile, [dept,email,roll], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({ msg: "updated successfully",result});
    });
  }
  catch(e){
    return res.status(400).json({ msg: "Error while saving data" });
  }
})

app.post("/api/user/biodata",async(req,res)=>{
  try{
    console.log("under work");
    const {      
        phone,
        inst_mail,
        Guardmail,
        Guardphone,
        address,
        city,
        policeSt,
        pincode,
        district,
        state,
        country,
        emgphone,
        emgperson,
        emgrelation,
        emgaddress,
        father,
        income,
        guardname,
        profession,
        roll,

    }=req.body;
    const dataToupdate=[       
        phone,
        inst_mail,
        Guardmail,
        Guardphone,
        address,
        city,
        policeSt,
        pincode,
        district,
        state,
        country,
        emgphone,
        emgperson,
        emgrelation,
        emgaddress,
        father,
        income,
        guardname,
        profession,
        roll,
    ]
    // console.log([...dataToupdate,roll]); 
    db.query(findbiodata,[roll],(err,result)=>{
         if(err){
          console.log(err);
          return res.status(400).json({msg:"unable to find user bio",err});
         }
         if(result){  
          if(result.length!=0){
            db.query(updatebiodata,dataToupdate,(err,result)=>{
                if(err){
                  console.log("while updating bio ",err);
                  return res.status(400).json({msg:"unable to update bio",err});
                }
                return res.status(200).json({msg:"Bio updated"});                
            })
            
          }
          else{
           db.query(insertintobiodata,dataToupdate,(err,result)=>{
               if(err){
                 console.log("while updating bio ",err);
                 return res.status(400).json({msg:"unable to update bio",err});
               }
               return res.status(200).json({msg:"Bio inserted",result});                
           })
         }
        }

    })
  }catch(e){
    return res.status(400).json({ msg: "Error while saving data" });
  }
});


app.get("/api/user/get/:roll", async (req, res) => {
  try {
    let { roll } = req.params;
    // console.log(roll);
    db.query(profilesearch, [roll], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (result.length == 0) {
        return res.status(200).json({
          msg: "User Not Registered/(wrong credential)",
          result,
        });
      }
      return res.status(200).json({ msg: "fetched successfully", result });
    });
  } catch (e) {
    return res.status(400).json({ msg: "Error while getting info" });
  }
});



app.get("/api/user/biodata/:roll",async(req,res)=>{

  try{
    const {roll}=req.params;
      db.query(biodataSearch,[roll],(err,result)=>{
           if(err){
            console.log("11");
            if (err.code === "ER_NO_SUCH_TABLE") {
              // createSchema and table
              db.query(createTableBiodata, (err, result) => {
                if (err) {
                  console.log("1");
                  return res
                    .status(400)
                    .json({ msg: "something went wrong-1" });
                }
                console.log("table created successfully");
              });
            } 
            else{
              return res.status(400).json("err3- ",err);   }

           }
           if(result && result.length == 0){
            console.log("22")
             return res.status(200).json({
               msg: "User Not Registered",
               result,
             });

           }
           console.log("33")
             return res.status(200).json({ msg: "Found", result });

      })

     }
     catch(e){
      return res.status(400).json({ msg: "Error while getting biodata" });
      
    }
  });
  

  const deleteStudentbiodata="delete from USER_biodata where roll=?";
  const deleteStudentprofile="delete from USER_details where roll=?";
  app.post("/api/user/remove/student",async(req,res)=>{
    try{
           const {roll}=req.body;
           db.query(deleteStudentbiodata,[roll],(err,result)=>{
               if(err){
                 return res.status(400).json({ msg: "Error while removing student biodata",err });
                }
                if(result){
                  db.query(deleteStudentprofile,[roll],(err,result)=>{
                    if(err)
                    return res.status(400).json({ msg: "Error while removing student profile",err });
                    if(result){
                      return res.status(400).json({ msg: "Removed Successfully",result });
                    }
                  })
               }
           })

    }catch(e){
      
      return res.status(400).json({ msg: "Error while removing student",e });
  }

});

app.listen(port, console.log("listening to the port", port));
