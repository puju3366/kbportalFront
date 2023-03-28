
// Populating Options for Filter
var filterOptions = {
    Select: ["Select"],
    Category: ["Select","Articles", "SOP", "CCOE", "Issue Resolution","R&D","How To Guide","FAQ","Code Library","General Tips"],
    Project: ["Select","Aadhar", "GDCAddOn", "Testing", "Teamworks", "National Archieve", "Teamworks", "MEGA", "GIDC Task Alert System", "UID", "Village Profile", "ByteAssist",
                "GTU", "CTP Rajasthan", "Jawahar Kala Kendra", "Anti Coruption Bureau", "Board of Technical Education", "UDH of Rajasthan", "Rajbhawan of Rajasthan", "Transport department of Rajasthan",
            "GSWAN", "AtoZ Tech Exchange", "Safari", "DCE", "GMDC Website", "APC", "IC", "Mandi market", "Flierz", "DEVIT", "RSU", "Gift", "Scope", "IndextB", "GCCWeb", "Mas Finance", "Barcode", "GSSCA - Web", "VGC", "Vasa", "Kamdhenu", "GHB", "GIDC College", "KYR Decryption", "SKV", "GSRDC Website", "GIDC-Web Application", "CEI or CED", "DOA", "Laaus", "CTP Gujarat", "Ganpat", "Medicure", "GHB-Application", "Election - APHQ"],
    Practice: ["Select","Cloud", "Infra", "Design", "Mobility", "IMS","Dynamics"]
}

  export  function changecat(value) {
    if(!value) document.getElementById("filterSearch").innerHTML = "<option value='Select' >Select</option><option value='Category'>Category</option> <option value='Project'>Project</option><option value='Practice'>Practice</option>"
    
        if (value.length == undefined) document.getElementById("categoryA").innerHTML = "<option>Select</option>";
        else {
            var catOptions = "";
            for (const categoryId in filterOptions[value]) {
                catOptions += "<option>" + filterOptions[value][categoryId] + "</option>";
            }
           document.getElementById("categoryA").innerHTML = catOptions;
        }

        
    }