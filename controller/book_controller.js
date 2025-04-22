import client  from "../config/db.js";
import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';
import mime from 'mime-types';

const pump = util.promisify(pipeline);

class book_controller{

    all = async function (req, res, next) {
        var page = req.params.page;
        page=page-1;
        
        if(page!=0){
            page=(page*10);
        }

        const result = await Promise.all([
        client.query('SELECT * from public."book_detail" where deleted_at is null order by id desc limit 10 offset $1',[page])
        ]).then(function([result]) {    
                var data = {
                    "success":true,
                    "data":result.rows
                }
                return data;
        }).catch(function (e) {
                var data = {
                    "success":false,
                    "error" : e
                };
                return data;
        });

        res.send(result);
    }

    pagecount = async function (req, res, next) {
        const result = await client.query('SELECT count(*) as pagecount from  public."book_detail" where deleted_at is null'); 
        const perpage = 10;
        var recordcnt = Math.ceil((result.rows[0].pagecount)/perpage);
        res.send(recordcnt);  
    }

    create =  async function (req, res, next) { 
      
       const data = await req.file();
        
       var isbn = data.fields.isbn.value;
       var title = data.fields.title.value;
       var author = data.fields.author.value;
       var year = data.fields.year.value;
       var publisher = data.fields.publisher.value;

       var filetype = mime.extension(data.mimetype);
       var filename= isbn +"."+filetype;
       var filepath="http://127.0.0.1:5000/images/" + filename;

       var filename= isbn +"."+filetype;
       var filepath="http://127.0.0.1:5000/images/" + filename;

       var image_s = filepath;
       var image_m = filepath;
       var image_l = filepath;

       const storedFile = fs.createWriteStream('./uploads/'+filename);
       await pump(data.file, storedFile);

       const result = await Promise.all([
       client.query('insert into public."book_detail"(isbn,title,author,year,publisher,image_s,image_m,image_l) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[isbn,title,author,year,publisher,image_s,image_m,image_l])
       ]).then(function([result]) {    
            var data = {
                "success":true
            }
       return data;
       }).catch(function (e) {
            var data = {"success":false,"error" : e};
            return data;
       });
    
       res.send(result);
    }

    detail = async function (req, res, next) {
        
        var isbn = req.params.isbn;

        const result = await client.query('select * from public."book_detail" where isbn=$1', [isbn]); 
        res.send(result.rows); 
    }

    update = async function (req, res, next) { 
        
        var field = req.body.fields;
        var value = req.body.values;
        var isbn = req.body.isbn;

        const result = await Promise.all([
        client.query('update public."book_detail" set '+field+'=$1 where isbn=$2',[value,isbn])
        ]).then(function([result]) {    
             var data = {
                 "success":true
             }
        return data;
        }).catch(function (e) {
             var data = {"success":false,"error" : e};
             return data;
        });

        res.send(result);  
    }

    checkisbn = async function (req, res, next) { 
        
       var isbn = req.params.isbn;

       const result = await client.query('select * from public."book_detail" where isbn=$1', [isbn]);
       
       var data = "";
        if(result.rowCount > 0){
          data = {
            "success":false,
            "msg":"isbn นี้มีผู้ใช้แล้ว"
          }
       }else{
         data = {
            "success":true,
            "msg":"isbn นี้สามารถใช้งานได้"
          }
        }

        res.send(data);  
    }

    delete = async function (req, res, next) { 
        
        var isbn = req.params.isbn;
        

        const result = await Promise.all([
            client.query('delete from public."book_detail" where isbn=$1',[isbn])
            ]).then(function([result]) {    
                 var data = {
                     "success":true
                 }
            return data;
            }).catch(function (e) {
                 var data = {"success":false,"error" : e};
                 return data;
            });
    
            res.send(result);  
        
    }


    img_update = async function (req, res, next) { 

        const data = await req.file();
        var filetype = mime.extension(data.mimetype);
        var isbn = data.fields.isbn.value;
        var filename= isbn+"."+filetype;

        var filepath="http://127.0.0.1:5000/images/" + filename;

        try{

            //var image_s = filepath;
            //var image_m = filepath;
            //var image_l = filepath;

            if (fs.existsSync('./uploads/'+filename)) {
                fs.unlinkSync('./uploads/'+filename);
                //console.log("havefile:"+filename);
            }else{
                //console.log("nofile:"+filename);
            }

            const storedFile = fs.createWriteStream('./uploads/'+filename);
            await pump(data.file, storedFile);


            const result = await client.query('update public."book_detail" set image_s=$1,image_m=$1,image_l=$1 where isbn=$2',[filepath,isbn]); 
        
            var msg = {"success":true};
            res.send(msg);
        }catch (e) {
            var msg = {"success":true,"error":e};
            res.send(msg);
        }

    }


    upload = async function (req, res, next) { 

       const data = await req.file();
        //const data = req.body.myfiles;
        data.file 
        data.fields
        data.fieldname
        data.filename
        data.encoding
        data.mimetype
      
        const storedFile = fs.createWriteStream('./uploads/'+data.filename);
        await pump(data.file, storedFile);
        
        //res.send(data.filename);
        //res.send(data.fields.isbn.value);
    }

        

}

export default book_controller;