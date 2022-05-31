const express = require("express");
const connection = require("./db");
const app = express();

const datas = require("./data.json");
const excel = require("./excel.json");
const excelfull = require("./excelfull.json");

// app.get("/", async (req, res) => {
//   const cash_data = datas.response.docs;
//   for (let index = 0; index < cash_data.length; index++) {
//     await connection.query(
//       "INSERT INTO tb_json SET ?",
//       cash_data[index],
//       function (err, result) {
//         if (err) console.log(err);
//       }
//     );
//     console.log("Sucess " + index);
//   }
// });

app.get("/excel", async (req, res) => {
  //   var str =
  // "On the 03/09/2015 I am swiming in a pool, that was build on 03/05/2022somboun<BR>editedby:128G97l0 ";

  //   var res = str.match(/\d{2}(\D)\d{2}\1\d{4}/g);
  //   var res = str.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
  //   var res = str.indexOf("<BR>");

  let dates = [];
  let char = [];
  const datas = excel.data;
  const dataf = excelfull.data;
  for (let index = 0; index < dataf.length; index++) {
    const note = dataf[index].note_id_t.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
    // const note = datas[index].note_id_t.match(/\d{2}(\D)\d{2}\1\d{4}/g);

    if (note) {
      dates.push(dataf[index].note_id_t);
    } else {
      //   char.push(dataf[index].note_id_t);
      await connection.query(
        "INSERT INTO vehicles_pre_upload SET ?",
        dataf[index],
        function (err, result) {
          if (err) console.log(err);
        }
      );
      console.log("Sucess " + index);
    }
  }
  res.send({
    datetime: dates,
    char: char,
    amount: datas.length,
    amountfull: dataf.length,
  });
  //   console.log(datas.length);
});

app.listen(3000, () => {
  console.log("Server Running... 3000");
});
