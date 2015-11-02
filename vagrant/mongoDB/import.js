conn = new Mongo();
db = conn.getDB("development");

db.counters.insert(
    {
        _id: "faq",
        seq: 0
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
    elem._id = getNextSequence(String(this));
}

var faqs = [
    {
        title: "A chi è rivolto CoderDojo?",
        description: "I destinatari sono ragazze e ragazzi delle scuole superiori interessati ad avventurarsi nel mondo della programmazione o ad approfondire le proprie conoscenze. Studenti universitari che non hanno occasione di incontrare la programmazione nel loro percorso di studi sono anch'essi benvenuti."
    }
];

faqs.forEach(addID, "faq");

db.faq.insert(faqs);