


module.exports.createStudent=async(req,res)=>{

    try{
         const {firstName,lastName,rollNo,gender,category,dob,personal_email,insti_email,phone,G_email,G_phone,address,city,police_station,pin_code,district,state,country,emg_contact_no,emg_person_name,emg_relation,emg_contact_address}=req.body;
     

        const sqlSearchTable="SELECT * FROM STUDENT.details;";

        db.query(sqlSearchTable,(err,result)=>{
             if(err.code==="ER_NO_SUCH_TABLE"){
                // createSchema and table
             }

             const sqlSaveDetails = `insert into STUDENT.details values (${firstName},${lastName},${rollNo},${gender},${category},${dob},${personal_email},${insti_email},${phone},${G_email},${G_phone},${address},${city},${police_station},${pin_code},${district},${state},${country},${emg_contact_no},${emg_person_name},${emg_relation},${emg_contact_address})`;

             db.query(sqlSaveDetails,(err,result)=>{
                   if (err.code === "ER_DUP_ENTRY") {
                     console.log(err);
                     return  res.status(400).json({msg:"duplicate Entry"}); 
                   }
                   return res.status(200).json({msg:"Data saved successfully"});
             })

        })
    }
    catch(error){
        return res.status(400).json({msg:"Error while adding students details"});
    }

}