const translate=require('@vitalets/google-translate-api');
const Cache=require('../models/cache');

async function addIntoDatabase(content,toLan)
{
    try{
                
                let s=await Cache.create({
                    text:content,
                    Language:toLan
                });
                return s;
            }
            catch(err)
            {
                console.log(err);
            }
}
function sendResponse(res,text,fromLanguage,toLanguage)
{
    return res.json(200,{
        data:{ 
                message:"success",
                translatedText:text,
                translateFrom:fromLanguage,
                translatedToLanguage:toLanguage
            }
            });
}

module.exports.home= async function(req,res){
    //remove white spaces from both the end if any
    let content=req.body.content.trim();
    try{
        // searching for text in database
        let searched=await Cache.find({
            // for case insensitive search
            text:  { $regex : new RegExp(content, "i") } 
        }).populate('toLanguages');
        //if found
        if(searched.length!=0){
            
            // searching for language in which we want to convert is present or not
            let found=searched[0].toLanguages.filter((s)=>s.Language.toLocaleUpperCase()==req.body.to.toLocaleUpperCase())
            // if not present
            if(found.length==0)
            {   
                // converting into language
                let output=await translate(content, {to: req.body.to})

                let converted=await addIntoDatabase(output.text,req.body.to);
                converted.toLanguages.push(searched[0]._id);

                // adding converted lanuage to every language 
                searched[0].toLanguages.map((v)=>{
                    v.toLanguages.push(converted._id);
                    converted.toLanguages.push(v._id);
                    v.save();
                });
                converted.save();
                searched[0].toLanguages.push(converted._id);
                searched[0].save();
                // console.log("done");
                 return sendResponse(res,output.text,langs[output.from.language.iso],req.body.to);        
            }
            return sendResponse(res,found[0].text,searched[0].Language,found[0].Language);
        }
        //if we dont find text in data base
        else{
    let output=await translate(content, {to: req.body.to})
        
            // adding to database 
        let s=await addIntoDatabase(content,langs[output.from.language.iso]) ;
            
        let s1=await addIntoDatabase(output.text,req.body.to);
            s.toLanguages.push(s1._id);
            s1.toLanguages.push(s._id);
            
            s1.save();
            
            for(let i=0;i<languages.length;i++)
            {
                if(languages[i]!=langs[output.from.language.iso] && languages[i].toLocaleUpperCase()!=req.body.to.toLocaleUpperCase())
                {
                    let output1=await translate(content, {to:languages[i]});
                    let s2=await addIntoDatabase(output1.text,languages[i]);

                    s=await s.populate('toLanguages');
                     let v=s.toLanguages;
                     
                    for(let j=0;j<v.length;j++)
                    {
                        await v[j].toLanguages.push(s2._id);
                        await s2.toLanguages.push(v[j]._id);
                        await v[j].save();
                
                    }
                    
                    s.toLanguages.push(s2._id);
                    s2.toLanguages.push(s._id);
                    await s2.save();
                    await s.save();
                
                }

            }


            
            
        return sendResponse(res,output.text,langs[output.from.language.iso],req.body.to);
  
    }
            
        
    }catch(err)  {
        console.error(err);
        return res.json(500,{
            data:{ 
                    message:err,
                
                }
                });
    };

}

let languages=['English','Hindi','Telugu','Tamil'];
var langs = {
    'auto': 'Automatic',
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'he': 'Hebrew',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'pa': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};