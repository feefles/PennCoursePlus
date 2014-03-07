(function() {

    var http = require("http");
    var fs = require("fs");
    var registrar = require("./registrar.json");

    DEPTS = [ 'ACCT'];
  // 'AFST',
  // 'AFRC',
  // 'AMCS',
  // 'ANCH',
  // 'ANEL',
  // 'ANTH',
  // 'ARAB',
  // 'ARCH',
  // 'AAMW',
  // 'ARTH',
  // 'ASAM',
  // 'ALAN',
  // 'ASTR',
  // 'BENG',
  // 'BENF',
  // 'BEPP',
  // 'BFMD',
  // 'BCHE',
  // 'BMB',
  // 'BE',
  // 'BIOE',
  // 'BIOT',
  // 'BIBB',
  // 'BIOL',
  // 'BIOM',
  // 'BSTA',
  // 'CAMB',
  // 'CBE',
  // 'CHEM',
  // 'CHIN',
  // 'CINE',
  // 'CPLN',
  // 'CLST',
  // 'COGS',
  // 'COLL',
  // 'COML',
  // 'COMM',
  // 'CIS',
  // 'CIT',
  // 'CRIM',
  // 'DEMG',
  // 'DENT',
  // 'DTCH',
  // 'EALC',
  // 'EEUR',
  // 'ECON',
  // 'EDUC',
  // 'ENGR',
  // 'ESE',
  // 'EAS',
  // 'ENM',
  // 'ENGL',
  // 'ENVS',
  // 'EPID',
  // 'FNCE',
  // 'FNAR',
  // 'FOLK',
  // 'FREN',
  // 'GAS',
  // 'GSWS',
  // 'GCB',
  // 'GEOL',
  // 'GAFL',
  // 'GREK',
  // 'GRMN',
  // 'GUJR',
  // 'HCMG',
  // 'HPR',
  // 'HSOC',
  // 'HEBR',
  // 'HIND',
  // 'HSPV',
  // 'HIST',
  // 'HSSC',
  // 'IMUN',
  // 'IPD',
  // 'INTG',
  // 'INTR',
  // 'ITAL',
  // 'JPAN',
  // 'JWST',
  // 'KORN',
  // 'LARP',
  // 'LATN',
  // 'LALS',
  // 'LAW',
  // 'LGST',
  // 'LSMP',
  // 'LING',
  // 'LGIC',
  // 'MLYM',
  // 'MGMT',
  // 'MKTG',
  // 'MKSE',
  // 'MSSP',
  // 'MTR',
  // 'MSE',
  // 'MATH',
  // 'MEAM',
  // 'MED',
  // 'MLA',
  // 'MSCI',
  // 'MMES',
  // 'MUSA',
  // 'MUSC',
  // 'NANO',
  // 'NETS',
  // 'NSCI',
  // 'NELC',
  // 'NGG',
  // 'NPLD',
  // 'NURS',
  // 'OPIM',
  // 'PERS',
  // 'PHRM',
  // 'PHIL',
  // 'PPE',
  // 'PHYS',
  // 'PSCI',
  // 'PRTG',
  // 'PSYC',
  // 'PUBH',
  // 'PUNJ',
  // 'REAL',
  // 'RELS',
  // 'ROML',
  // 'RUSS',
  // 'SKRT',
  // 'STSC',
  // 'SCND',
  // 'SLAV',
  // 'SWRK',
  // 'SOCI',
  // 'SAST',
  // 'SPAN',
  // 'STAT',
  // 'TCOM',
  // 'TELU',
  // 'TAML',
  // 'THAR',
  // 'TRAN',
  // 'TURK',
  // 'URBS',
  // 'URDU',
  // 'VLST',
  // 'WH',
  // 'WHCP',
  // 'WHG',
  // 'WRIT',
  // 'YDSH' ];
var counter = 0;
var reviews = [];
console.log(DEPTS.length);

DEPTS.forEach(function(dept) {

        // var courseDept = course.dept.toLowerCase();
        var courseDept = dept.toLowerCase();
        // var num = course.courseNumber;
        // var courseType = course.type;
        // var inst = course.prof.trim();



    var url = 'http://api.penncoursereview.com/v1/depts/'+courseDept+'/reviews?token=VUFSbua5RgR7Ers7wrivV0MklE48sP';

    callback = function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            reviews.push(chunk);
            // chunk.result.values.forEach(function(course) {
            //     reviews.push(
            //         { inst_first: course.instructor.first_name, 
            //             inst_last: course.instructor.last_name, 
            //             quality: course.ratings.rCourseQuality, 
            //             inst_quality: course.ratings.rInstructorQuality,
            //             difficulty: course.ratings.rDifficulty
            //         });
            // });
        });
        response.on('end', function() {
            console.log(courseDept);
            counter++;
            console.log(counter);
            run();


            // console.log("reviews" + reviews);
        });
    };
    var req = http.get(url, callback);
    req.on('error', function(e) {
        console.log("problem with request" + e.message);
    });

});
var run = function() {
    if (counter == DEPTS.length ) {
        console.log('writing');
        fs.writeFile('./ratings.json', reviews, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('success!');
                module.exports = {
                    reviews: reviews
                };
            }
        });
    }
};

    module.exports =  {
        reviews: reviews
    };

})();