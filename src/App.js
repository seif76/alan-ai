import react ,{useEffect , useState}  from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import NewsCards from "./compononts/newsCards/newsCards";
import classNames from "classnames";
import wordsToNumbers from 'words-to-numbers';

import useStyles from "./styles";

const alanKey = "b604b3081852c2a8ecae7500799b2cf72e956eca572e1d8b807a3e2338fdd0dc/stage";


const App = () => {
    
   const [newArticles, setnewArticles] = useState([]);
   const classes = useStyles();

   const [activeArticle, setactiveArticle] = useState(-1);
   const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        alanBtn({
            key:alanKey,
            onCommand: ({ command, articles , number  }) => {
                if(command === "newHeadlines" ){
                    
                    setnewArticles(articles);
                    setactiveArticle(-1);
                    //console.log(body);
                         
                }else if (command === "highlight"){
                    setactiveArticle((prevalue)=> prevalue + 1 );

                }else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > articles.length) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                  }
            }
        })
    } , [])
    
    
    
    return (
        
       <div>
           <div className={classes.logoContainer} >

             <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo" />

           </div>
           <NewsCards articles={newArticles} activeArticle={activeArticle} />
       </div>

     )
}

export default App;