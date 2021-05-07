

var data = {};
var scorePub = 0;
var questAll = [];
var questPub = [];
var scorePriv = 0;
var questPriv = [];

function posForPriv(number,question){
    if(question == true){

        if(questPriv.includes(String(number))){

        } else {
            scorePriv = scorePriv +1;
            questPriv.push(String(number));
        }
    } else {
        if(questAll.includes(String(number))){

        } else {
            scorePub = scorePub +1;
            scorePriv = scorePriv + 1;
            questAll.push(String(number));
        }
    }

}


function posForPub(number,question){
    if(question == true){
        if(questPub.includes(String(number))){

        } else {
            scorePub = scorePub +1;
            questPub.push(String(number));
        }
        
    } else {
        if(questAll.includes(String(number))){

        } else {
            scorePub = scorePub +1;
            scorePriv = scorePriv + 1;
            questAll.push(String(number));
        }
    }

}

exports.index = (req, res) => {
    if(data.question1 === undefined){
       
        res.json({
            status: "error",
            message: "Bitte übergebe zuerst deine Werte.",
        });
    } else{
        //Berechnung

        //1. Frage: Positiv für Private Cloud
        posForPriv(1,data.question1);

        //2.Frage: Positiv für Public Cloud
        posForPub(2,data.question2);

        //3. Frage: Positiv für Private Cloud
        posForPriv(3,data.question3);

        //4.Frage: Positiv für Public Cloud
        posForPub(4,data.question4);

        //5. Frage: Positiv für Private Cloud
        posForPriv(5,data.question5);

        //6.Frage: Positiv für Public Cloud
        posForPub(6,data.question6);

        //7.Frage: Positiv für Public Cloud, Neg für Private
        if(data.question7 == true){
            if(questPub.includes("7")){

            } else {
                scorePub = scorePub +1;
                questPub.push("7");
            }
            
        } else {
            if(questPriv.includes("7")){

            } else {
                scorePriv = scorePriv + 1;
                questPriv.push("7");
            }
        }

        //8. Frage: Positiv für Private Cloud
        posForPriv(8,data.question8);

        //9. Frage: Positiv für Private Cloud
        posForPriv(9,data.question9);

        //10. Frage: Positiv für Private Cloud
        posForPriv(10,data.question10);

        //11. Frage: Positiv für Private & Pub Cloud, neg für Pub Cloud
        if(data.question11 == true){
            if(questPub.includes("11")&&questPriv.includes("11")){

            } else {
                scorePub = scorePub +1;
                scorePriv = scorePriv + 1;
                questPub.push("11");
                questPriv.push("11");
            }
            
        } else {
            if(questPub.includes("11")){

            } else {
                scorePub = scorePub +1;
                questPub.push("11");
            }
        }

        //12. Frage: Positiv für Private Cloud
        posForPriv(12,data.question12);
        

        res.json({
            status: "success",
            message: "Daten sind verfügbar.",
            data: {
                "scorePub" : scorePub/12*100,
                "scorePriv" : scorePriv/12*100,
                "questPub" : questPub,
                "questPriv": questPriv
            }
        });
    }
    
};


exports.new = (req, res) => {
    if (Object.keys(req.body).length == 12 && 
        typeof req.body.question1 === 'boolean' &&
        typeof req.body.question2 === 'boolean' &&
        typeof req.body.question3 === 'boolean' &&
        typeof req.body.question4 === 'boolean' &&
        typeof req.body.question5 === 'boolean' &&
        typeof req.body.question6 === 'boolean' &&
        typeof req.body.question7 === 'boolean' &&
        typeof req.body.question8 === 'boolean' &&
        typeof req.body.question9 === 'boolean' &&
        typeof req.body.question10 === 'boolean' &&
        typeof req.body.question11 === 'boolean' &&
        typeof req.body.question12 === 'boolean'
        ){

        data = req.body;
        scorePub = 0;
        questAll = [];
        questPub = [];
        scorePriv = 0;
        questPriv = [];

        res.json({
            message: 'Die Werte wurden gespeichert!',
            data: data
        });
    } else {
        res.json({
            status: "error",
            message: "Bitte übergebe die Werte als Boolean in richtiger Anzahl.",
        });
    }

};