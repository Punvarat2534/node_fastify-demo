import client  from "../config/db.js";
class book_controller{

    all = async function (req, res, next) {
        const result = await client.query('SELECT * from  public."book_detail"'); 
        res.send(result);    
    }
}

export default book_controller;