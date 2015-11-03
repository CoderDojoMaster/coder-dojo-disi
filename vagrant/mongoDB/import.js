conn = new Mongo();
db = conn.getDB("development");

db.counters.save(
    {
        _id: "faq",
        seq: 0
    }
);

db.counters.save(
    {
        _id:"events",
        seq:0
    }
);
db.counters.save(
    {
        _id:"mentors",
        seq:0
    }
);
db.counters.save(
    {
        _id:"courses",
        seq:0
    }
);
db.counters.save(
    {
        _id:"tutorials",
        seq:0
    }
);


function getNextSequence(name) {

    var ret = db.counters.findAndModify(
        {
            query: {_id: name},
            update: {$inc: {seq: 1}},
            new: true
        }
    );
    return ret.seq;
}

function addID(elem) {

    elem._id = getNextSequence(this.name);
}

var faqs = [
    {
        title: "A chi è rivolto CoderDojo?",
        description: "I destinatari sono ragazze e ragazzi delle scuole superiori interessati ad avventurarsi nel mondo della programmazione o ad approfondire le proprie conoscenze. Studenti universitari che non hanno occasione di incontrare la programmazione nel loro percorso di studi sono anch'essi benvenuti."
    }
];

var events = [
    {
        title:"",
        description:"",
        urls:{
            googleForm:"",
            facebook:""
        }
    }
];

var mentors = [
    {
        firstname:"",
        lastname:"",
        roles:[],
        imgUrl:"",
        descriptio:""
    }
];

var courses = [
    {
        title:"",
        description:"",
        type:"",
        imgUrl:""
    }
];

var tutorials = [
    {
        title:"",
        description:""
    }
];

faqs.forEach(addID, {name:"faq"});
events.forEach(addID, {name:"events"});
mentors.forEach(addID, {name:"mentors"});
courses.forEach(addID, {name:"courses"});
tutorials.forEach(addID, {name:"tutorials"});

db.faq.insert(faqs);
db.events.insert(events);
db.mentors.insert(mentors);
db.courses.insert(courses);
db.tutorials.insert(tutorials);