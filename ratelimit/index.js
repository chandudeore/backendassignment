const express = require('express');

const app = express();
let api_cnt={
    cnt:10,
    req_ip:null
},time=0,date=new Date();


app.get('/', (req, res) => {
    switch(api_cnt.cnt){
        case 10:
            time=date.getSeconds();
            api_cnt.req_ip=req.ip;
            api_cnt.cnt=api_cnt.cnt-1;
            break;
        case 0:
            if(time-date.getSeconds()==0)
                return res.send({msg:"Please wait few miute since you are exeeding your api rate limit"});
            api_cnt.cnt=10;
            return res.send({msg:"congrat you can try now"});
        default:
            api_cnt.cnt=api_cnt.cnt-1;
            return res.send({cnt:api_cnt.cnt});
    }
    return res.send({cnt:api_cnt.cnt,ip:api_cnt.req_ip});
})

app.listen(8080, () => {
    console.log("listening on the port 8080")
})