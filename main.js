function autoGen(vid)
{
    var vidd = 1; 

    var pvdd = new Date(Date.now())

    vid.value = vidd + pvdd;
    vidd++;
}

function populate()
{
    let vhtp = document.forms["vehReg"]["vehType"]
    let vhnme = document.forms["vehReg"]["vehName"]
    const vehicle = {
        "2wheel" : ["pulsar","platina","ativa","pleasure","jupiter"],
        "4wheel": ["suv","dutchback","marcel","scorpio"]
    }

    const vehn = vehicle[vhtp.value];

    vhnme.options[0] = new Option("select vehicle",""); 
    for(let i =0; i<vehn.length; i++)
    {
        vhnme.options[i+1] = new Option(vehn[i],vehn[i]);
    }
    
}
var mycmp = document.forms["vehReg"]["vehType"]

mycmp.addEventListener("change",populate)


function validType(veh,err)
{
    if(veh.value == "")
    {
        err.style.color = "red";
        err.innerHTML = "PLease select the vehicle  "
        return false;
    }
    else 
    {
        err.style.color = "green"
        err.innerHTML = "valid";
        return true;
    }
}



function validName(name,err)
{
    if(!/^[a-zA-Z]{3,9}$/.test(name.value) || name.value.trim() == "")
    {
        err.style.color = "red";
        err.innerHTML = "Enter valid Name "
        return false;
    }
    else 
    {
        err.style.color = "green"
        err.innerHTML = "valid";
        return true;
    }
}

function validAge(age,err)
{
    if(isNaN(age.value) || age.value < 0 ||  age.value > 100 || age.value.trim() == "")
    {
        err.style.color = "red";
        err.innerHTML = "Enter valid age  age.value < 0 ||  age.value > 100 "
        return false;
    }
    else{
        err.style.color = "green"
        err.innerHTML = "valid";
        return true;
    }
}

function validEmail(mail,err)
{
    if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,4}$/.test(mail.value) || mail.value.trim() == "")
    {
        err.style.color = "red";
        err.innerHTML = " enter valid mail "
        return false;
    }
    else 
    {
        err.style.color = "green"
        err.innerHTML = "valid";
        return true;
    }
}

function validPP(pprice,err)
{
    if(isNaN(pprice.value) || pprice.value < 120000 ||  pprice.value > 23000000 || pprice.value.trim() == "")
    {
        err.style.color = "red";
        err.innerHTML = " enter valid price hint : pprice.value < 120000 ||  pprice.value > 23000000 "
        return false;
    }   
    else 
    {
        err.style.color = "green"
        err.innerHTML = "valid";
        return true;
    }
}


function cal_selprice(vtype,price,age)
{
   let selbx = document.forms["vehReg"]["selprice"]

   let damt;
   if(vtype.value == "2wheel")
   {
       damt = 3000;
   }
   else
   {
       damt = 20000;
   }

   let selprice = Number(price.value) - (Number(age.value) * damt);
   
   if(age.value < 3)
   {
       selbx.style.color = "green";
   }
   else if(age.value >=3  &&  age.value <=5)
   {
       selbx.style.color = "blue";
   }
   else{
       selbx.style.color = "red"
   }

   selbx.value = selprice

   
}



function storeData()
{
    let vid = document.forms["vehReg"]["vid"].value
    let vehType = document.forms["vehReg"]["vehType"].value
    let vehname = document.forms["vehReg"]["vehName"].value
    let sel_name = document.forms["vehReg"]["namebx"].value
    let age = document.forms["vehReg"]["agebx"].value
    let selprice = document.forms["vehReg"]["selprice"].value

    var storedData = JSON.parse(localStorage.getItem('vehData')) || []

    var dataHold = 
    {
        vid : vid,
        vehicleType : vehType,
        vehname : vehname,
        sel_name : sel_name,
        age : age,
        selprice : selprice
    }

    storedData.push(dataHold)

    localStorage.setItem('vehData',JSON.stringify(storedData))
    console.log("data stored")
}

function showData()
{
    var vehicledata = JSON.parse(localStorage.getItem('vehData')) || []
    var myshowdiv = document.getElementById("showdatadiv")
    var htmltable = `<table border="1px solid black" width="100%"> <tr> 
    <td>vid </td>
    <td>vehicle type </td>
    <td>vehicle name  </td>
    <td>seller name  </td>
    <td>age  </td>
    <td>sell price </td>
    </tr> ` 
    if(vehicledata.length > 0)
    {
      
        for(let i =0; i<vehicledata.length; i++)
        {
            var sdata = vehicledata[i]
            if(sdata.vehicleType == "2wheel")
            {
                htmltable += `<tr style="color:red"> `
            }
            else 
            {
                htmltable += `<tr style="color:green"> `
            }

            htmltable += `
            <td> ${sdata.vid} </td>
            <td> ${sdata.vehicleType} </td>
            <td> ${sdata.vehname} </td>
            <td> ${sdata.sel_name} </td>
            <td> ${sdata.age} </td>
            <td> ${sdata.selprice} </td> </tr>

            `
        }
        htmltable += `</table>`
        myshowdiv.innerHTML = htmltable
    }
    else 
    {
        console.log("no data is present")
        myshowdiv.innerHTML = "no data is stored"
    }
}

function latest_data() {
    var vehicledata = JSON.parse(localStorage.getItem('vehData')) || [];
    var latestdiv = document.getElementById("latestdiv");
    let htmltable = `<table border="1px solid black" width="100%"> <tr> 
    <td>vid </td>
    <td>vehicle type </td>
    <td>vehicle name  </td>
    <td>seller name  </td>
    <td>age  </td>
    <td>sell price </td>
    </tr> `;

    let maxage = 100;
    let tempdata = null;
    if (vehicledata.length > 0) {
        for (let i = 0; i < vehicledata.length; i++) {
            var sdata = vehicledata[i];
            if (sdata.age < maxage) {
                maxage = sdata.age;
                tempdata = sdata;
            }
        }
        if (tempdata) {
            htmltable += `<tr>
            <td> ${tempdata.vid} </td>
            <td> ${tempdata.vehicleType} </td>
            <td> ${tempdata.vehname} </td>
            <td> ${tempdata.sel_name} </td>
            <td> ${tempdata.age} </td>
            <td> ${tempdata.selprice} </td> 
            </tr>`;
        }
        htmltable += `</table>`;
        latestdiv.innerHTML = htmltable;
    } else {
        console.log("no data is present");
        latestdiv.innerHTML = "no data is stored";
    }
}
