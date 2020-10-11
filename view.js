const fs = require('fs')
const testFolder = './US_case/';
const mongoose = require('mongoose')
const Case = require('./model/case');

async function connection() {
  await mongoose.connect("mongodb+srv://Sunzhou3:Sunzhou3@cluster0.ftmpt.mongodb.net/Cases1?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('connected successfully')
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveData(data){
    // console.log('reading options')
    // console.log(data)
    try {
      const CaseModel = new Case(data)
      await CaseModel.save().then(() => {
        // console.log('saved')
      });
    } catch(error) {
      console.log('error')
      console.error(error)
    }
    await sleep(500)
}

async function readSingleFile(filename, date) {
  const new_filename = testFolder + filename
  fs.readFile(new_filename, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log('filename', new_filename)
    parsed_data = JSON.parse(data);
    // console.log(parsed_data.length)
    for(let i = 0; i < parsed_data.length; i ++) {
      let case1 = {};
      // console.log(parsed_data[i]['Confirmed'])
      case1.confirmed = parsed_data[i]['Confirmed'];
      case1.state = parsed_data[i]["Province_State"]
      case1.date = date
      case1.death =  parsed_data[i]["Deaths"]
      case1.recorvered =  parsed_data[i]["Recovered"]
      case1.active = parsed_data[i]["Active"]
      case1.incident_rate = parsed_data[i]["Incident_Rate"]
      case1.people_tested = parsed_data[i]["People_Tested"]
      case1.mortality_rate = parsed_data[i]["Mortality_Rate"]
      case1.testing_rate = parsed_data[i]["Testing_Rate"]
      saveData(case1)
    }

  });
}

async function readDir(files) {
  for(let i = 0; i < files.length; i ++) {
    const date = files[i].split('.')[0]
    // console.log(date)
    readSingleFile(files[i], date)
  }
}

async function format() {
  await connection();
  fs.readdir(testFolder, (err, files) => {
    // console.log(files)
    return readDir(files)
  });
  console.log("End of the program")
  // await mongoose.disconnect().then(()=>{
  //   console.log('disconnected')
  // });
}

format()