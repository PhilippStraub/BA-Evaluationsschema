function submitResult(){

    var items = [];

    //Inputs einlesen
    
    for(var i=0; i<=11; i++){

        var element= i+1;
        element.toString();
        items[i] = document.getElementById("question-" + element).checked;

    }

    //Input zu JSON

    for(var i=0; i<=11; i++){
        console.log(items[i]);
    }

    var object = {};

    for(i=0; i<= items.length; i++){
        var element= i+1;
        element.toString();
        key = "question" + element;

        object[key] = items[i];
        
    }

    var json = JSON.stringify(object);
    console.log(json);
    fetch('http://localhost:3000/api/evaluate', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: json
    })
    .then((res) => {
        if(res.ok){
            
            console.log("Die Daten wurden erfolgreich übermittelt.")
            showResult();
        }
    })
    .catch((err) => {
        alert("Bei der Übermittlung der Daten ist ein unerwarteter Fehler aufgetreten: Siehe Konsole.");
        console.log(err);
    });
    
}


function showResult(){
    fetch('http://localhost:3000/api/evaluate', {
        method: 'GET'
    })
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then((res) => {

        
        if(res.status == "error"){
            alert("Bitte zuerst die Fragen ausfüllen und abschicken.");
            
        } else{
            

            var scorePriv = Math.trunc(res.data.scorePriv);
            var questPriv = res.data.questPriv;
            var scorePub = Math.trunc(res.data.scorePub);
            var questPub = res.data.questPub;

            if(document.getElementById("data")!=null){
                document.getElementById("ergebnis").removeChild(document.getElementById("data"));
            }


            if(document.getElementById("data")==null){

                var data = document.createElement("div");
                data.id = "data";
               
                var leftdata = document.createElement("div");
                leftdata.className = "ergebnisData";
                leftdata.id="leftData"
                leftdata.innerHTML = '<h1 class="display-6 center cloudHeading">Public Cloud (Azure)</h1>';
                
                var leftprogressbar = document.createElement("div");
                leftprogressbar.className = "progress";
                leftprogressbar.innerHTML = '<div class="progress-bar progress-bar-striped" role="progressbar" style="width: '+scorePub+'%" aria-valuenow="' + scorePub +'" aria-valuemin="0" aria-valuemax="100">' +scorePub+'%</div>';
                
                var leftmessage =  document.createElement("div");
                leftmessage.className = "message";
                leftmessage.innerHTML ='Diese Lösungen bietet Ihnen die Möglichkeit, folgende Effekte innerhalb der eigenen Unternehmung zu erzielen:' + 
                '<br><br><ul><li>Förderung von digitalen Innovationen im Unternehmen<li>Bewirkung von Produktivitätsverbesserungen<li>Positive Veränderung der internen Prozesse<li>Erfüllung des Return on Investments</ul>'

                var lefttransparent = document.createElement("div");
                lefttransparent.className = "transparenz";
                lefttransparent.innerHTML = '<span class="transEinfluss">Folgende Punkte nahmen positiv Einfluss:</span>';
                if(questPub[0]!=undefined){
                    for(var i=0; i<questPub.length; i++){
                        var anchor = document.createElement("a");
                        anchor.href= '#list-item-' + questPub[i];
                        anchor.innerHTML = '<button type="button" class="btn btn-outline-secondary">' + questPub[i] + '</button>';
                        lefttransparent.appendChild(anchor);
                    }
                } else{
                    var sadMessage = document.createElement("p");
                    sadMessage.innerHTML = "Keine.";
                }



                var rightdata = document.createElement("div");
                rightdata.className = "ergebnisData";
                rightdata.id="rightData"
                rightdata.innerHTML = '<h1 class="display-6 center cloudHeading">Private Cloud (HPE)</h1>';
                
                var rightprogressbar = document.createElement("div");
                rightprogressbar.className = "progress";
                rightprogressbar.innerHTML = '<div class="progress-bar progress-bar-striped" role="progressbar" style="width: '+scorePriv+'%" aria-valuenow="' + scorePriv +'" aria-valuemin="0" aria-valuemax="100">' +scorePriv+'%</div>';
                
                var rightmessage =  document.createElement("div");
                rightmessage.className = "message";
                rightmessage.innerHTML ='Diese Lösungen bietet Ihnen die Möglichkeit, folgende Effekte innerhalb der eigenen Unternehmung zu erzielen:' + 
                '<br><br><ul><li>Förderung von digitalen Innovationen im Unternehmen<li>Bewirkung von Produktivitätsverbesserungen<li>Positive Veränderung der internen Prozesse<li>Erfüllung des Return on Investments</ul>'
                
                var righttransparent = document.createElement("div");
                righttransparent.className = "transparenz";
                righttransparent.innerHTML = '<span class="transEinfluss">Folgende Punkte nahmen positiv Einfluss:</span>';
                if(questPriv[0]!=undefined){
                    for(var i=0; i<questPriv.length; i++){
                        var anchor = document.createElement("a");
                        anchor.href= '#list-item-' + questPriv[i];
                        anchor.innerHTML = '<button type="button" class="btn btn-outline-secondary">' + questPriv[i] + '</button>';
                        righttransparent.appendChild(anchor);
                    }
                } else{
                    var sadMessage = document.createElement("p");
                    sadMessage.innerHTML = "Keine.";
                }

    
                leftdata.appendChild(leftprogressbar);
                leftdata.appendChild(leftmessage);
                leftdata.appendChild(lefttransparent);

                rightdata.appendChild(rightprogressbar);
                rightdata.appendChild(rightmessage);
                rightdata.appendChild(righttransparent);

                data.appendChild(leftdata);
                data.appendChild(rightdata);

                if(document.getElementById("trenner")!=null){

                    document.getElementById("ergebnis").removeChild(document.getElementById("trenner"));
                    document.getElementById("ergebnis").removeChild(document.getElementById("display"));
                }
                document.getElementById("ergebnis").appendChild(data);

            }



        }
        
    })
    .catch((err) => {
        alert("Bei der Übermittlung der Daten ist ein unerwarteter Fehler aufgetreten: Siehe Konsole.");
        console.log(err);
    });
}