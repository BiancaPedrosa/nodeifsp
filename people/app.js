const fs=require("fs")
const write = ({data,filename})=>{
   fs.writeFileSync(filename,JSON.stringify(data),(err)=>{
   if(err){
      console.log(err)
   }
   console.log("File written successfully")
   }
   )
}
// Example usage
const people=[
    {name:"John",age:30},
    {name:"Jane",age:25},
    {name:"Doe",age:40}
]
write({data: people, filename:"people.json"})

const readFromFile = (filename)=>{ 
   if (!fs.existsSync(filename)) {
      console.log("File does not exist");
      return null;
   }
   else
      return fs.readFileSync(filename, "utf8");
}
const readJson = (filename) => {
   const data = readFromFile(filename);
   if (data) {
      return JSON.parse(data);
   }
   return null;
}

// Example usage
const readData = readJson("people.json");
console.log("Data read from file:", readData);  
