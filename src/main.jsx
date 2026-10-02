import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const scenes=[
{img:"01-instagram.png",date:"04 OCTOBER 2022",title:"It started with a follow.",cap:"Two strangers. One Instagram notification. And a friendship that had no idea where it was going.",motion:"kenburn"},
{img:"02-talking.png",date:"THEN",title:"A few messages became a habit.",cap:"One conversation became ten. Ten became every day. Somewhere in between, talking to you became my favourite part of the day.",motion:"float"},
{img:"03-btech.png",date:"A NEW CHAPTER",title:"Then she entered B.Tech.",cap:"New classes. New routines. And somehow, even more reasons to talk.",motion:"pan"},
{img:"04-midnight.png",date:"12:00 AM → 2:00 AM",title:"Midnight was never really late.",cap:"While the world slept, we were still there — laughing, sharing everything, and forgetting to check the time.",motion:"zoom"},
{img:"05-love-starts.png",date:"04 OCTOBER 2024 • COLLEGE FEST",title:"That was when friendship became love.",cap:"No proposal. No grand announcement. Just one beautiful day when what we already had quietly became something more.",motion:"drift"},
{img:"06-temple.png",date:"DURGAMMA TEMPLE",title:"A little blessing.",cap:"In front of Ammavaru, one tiny red dot became one of the most unforgettable moments of our story.",motion:"temple"},
{img:"07-fights.png",date:"REAL LOVE ISN’T ALWAYS EASY",title:"We fought too.",cap:"Some days were messy. Some words hurt. But even on the hardest days, the love underneath never disappeared.",motion:"shake"},
{img:"08-tears.png",date:"SOME DAYS HURT",title:"And sometimes, she cried.",cap:"Behind every tear was a girl who cared deeply. Behind every silence was a boy who still wanted to make things right.",motion:"soft"},
{img:"09-comfort.png",date:"AND THEN",title:"He came back to her.",cap:"He didn't need perfect words. He just needed to be there. And slowly, the distance became closeness again.",motion:"rise"},
{img:"10-way-back.png",date:"AFTER EVERY FIGHT",title:"We always find our way back.",cap:"No matter how many fights we have, in the end we find our way back to each other.",motion:"warm"},
{img:"11-final-moments.png",date:"EVERY CHAPTER",title:"And somehow, it is still us.",cap:"From one follow to a thousand little memories — this is not just a story we remember. It is the story we are still writing.",motion:"final"}
];

const photos=[
["photo1.png","Even the quietest moments feel special when they are with you."],
["photo2.png","We were just walking… but somehow, every ordinary moment became a memory."],
["photo3.png","In a crowd full of people, I still find myself looking for you first."],
["photo4.png","Some smiles are memories. This one is a piece of my heart."],
["photo5.png","Different days. Different moments. Same two people — still choosing each other."]
];

function App(){

 const [open,setOpen]=useState(false);
 const [pass,setPass]=useState("");
 const [i,setI]=useState(0);
 const [mode,setMode]=useState("title");
 const [photo,setPhoto]=useState(0);
 const [music,setMusic]=useState(false);

 useEffect(()=>{
   const a=document.getElementById("music");
   if(!a)return;

   if(music){
     a.play().catch(()=>{});
   }else{
     a.pause();
   }
 },[music]);

 if(!open){
   return (
     <Gate
       pass={pass}
       setPass={setPass}
       onOpen={()=>{
         setOpen(true);
         setMode("title");
         setMusic(true);
       }}
     />
   );
 }

 const advance=()=>{

   if(mode==="title"){
     setMode("story");
     return;
   }

   if(mode==="story"){
     if(i<scenes.length-1){
       setI(i+1);
     }else{
       setMode("photos");
       setPhoto(0);
     }
     return;
   }

   if(mode==="photos"){
     if(photo<photos.length-1){
       setPhoto(photo+1);
     }else{
       setMode("letter");
     }
     return;
   }

   if(mode==="letter"){
     setMode("end");
     return;
   }
 };

 const back=(e)=>{
   e.stopPropagation();

   if(mode==="story" && i>0){
     setI(i-1);
   }

   else if(mode==="photos" && photo>0){
     setPhoto(photo-1);
   }

   else if(mode==="photos" && photo===0){
     setMode("story");
     setI(scenes.length-1);
   }

   else if(mode==="letter"){
     setMode("photos");
     setPhoto(photos.length-1);
   }

   else if(mode==="end"){
     setMode("letter");
   }
 };

 return (
   <div className="movie" onClick={advance}>

     <audio
  id="music"
  loop
  src="/music/Alaakaa Loova (Orchestral Version).mp3"
/>

     <div className="film-grain"/>
     <div className="black-vignette"/>

     {mode!=="title" && (
       <header>
         <span>OUR STORY</span>
         <span className="dot">•</span>
         <span>BBHAVYA × BAKKAMMA</span>

         <div className="tools">

           <button
             onClick={e=>{
               e.stopPropagation();
               setMusic(!music);
             }}
           >
             {music?"MUSIC ON":"MUSIC OFF"}
           </button>

           <button onClick={back}>
             BACK
           </button>

         </div>
       </header>
     )}

     {mode==="title" && <AnniversaryTitle/>}

     {mode==="story" &&
       <Story
         scene={scenes[i]}
         n={i}
       />
     }

     {mode==="photos" &&
       <Photos n={photo}/>
     }

     {mode==="letter" &&
       <Letter/>
     }

     {mode==="end" &&
       <End/>
     }

     {mode!=="title" && (
       <footer>

         <span>
           {
             mode==="story"
               ? `CHAPTER ${String(i+1).padStart(2,"0")} / 11`
               : mode.toUpperCase()
           }
         </span>

         <div className="line">
           <i
             style={{
               width:
                 mode==="story"
                   ? `${((i+1)/11)*100}%`
                   : "100%"
             }}
           />
         </div>

         <span>CONTINUE</span>

       </footer>
     )}

   </div>
 );
}


function Gate({pass,setPass,onOpen}){

 return (
   <div className="gate">

     <div className="gatebox">

       <small>A PRIVATE LOVE FILM</small>

       <h1>For Bakkamma.</h1>

       <p>
         Some stories are watched. This one is felt.
       </p>

       <input
         type="password"
         value={pass}
         onChange={e=>setPass(e.target.value)}
         onKeyDown={e=>
           e.key==="Enter" &&
           pass==="ab@2218" &&
           onOpen()
         }
         placeholder="secret phrase"
       />

       <button
         disabled={pass!=="ab@2218"}
         onClick={onOpen}
       >
         ENTER THE FILM
       </button>

     </div>

   </div>
 );
}


function AnniversaryTitle(){

 return (
   <section className="anniversary-title">

     <div className="anniversary-glow"/>

     <div className="anniversary-content">

       <small>
         04 OCTOBER 2026
       </small>

       <h1>
         Happy 2 Years
         <br/>
         <em>Bakkamma.</em>
       </h1>

       <div className="anniversary-divider"/>

       <h2>
         2 Years of Love
       </h2>

       <p>
         4 Years of Friendship
       </p>

       <div className="anniversary-years">
         <span>2022</span>
         <i>→</i>
         <span>2026</span>
       </div>

       <div className="title-hint">
         OUR STORY BEGINS
       </div>

     </div>

   </section>
 );
}


function Story({scene,n}){

 return (
   <section
     className={`story ${scene.motion}`}
     key={scene.img}
   >

     <div
       className="bg"
       style={{
         "--scene-bg":`url(/story/${scene.img})`
       }}
     >
       <img
         src={"/story/"+scene.img}
         alt=""
       />
     </div>

     <div className="wash"/>

     <div className="copy">

       <small>
         {scene.date}
       </small>

       <h1>
         {scene.title}
       </h1>

       <p>
         {scene.cap}
       </p>

     </div>

     <div className="scene-no">
       {String(n+1).padStart(2,"0")}
     </div>

   </section>
 );
}


function Photos({n}){

 return (
   <section className="photos">

     <small>
       THE REAL MEMORIES
     </small>

     <div className="realcard">

       <div className="count">
         0{n+1}
       </div>

       <div
         className="photo-bg"
         style={{
           backgroundImage:
             `url(/photos/${photos[n][0]})`
         }}
       />

       <img
         src={"/photos/"+photos[n][0]}
         alt=""
         onError={e=>{
           e.currentTarget.style.display="none";
           e.currentTarget.nextSibling.style.display="flex";
         }}
       />

       <div className="missing">

         <img
           src="/reference.png"
           alt=""
         />

         <span>
           Place {photos[n][0]} inside{" "}
           <b>public/photos</b>
         </span>

       </div>

     </div>

     <h2>
       {photos[n][1]}
     </h2>

   </section>
 );
}


function Letter(){

 return (
   <section className="letter">

     <article>

       <small>
         TO MY BAKKAMMA ❤️
       </small>

       <h1>
         My favourite chapter is still us.
       </h1>

       <p>
         Nuvvu na life lo undadam naaku chala special.
       </p>

       <p>
         Nenu baagunnana, naaku emaina problem unda ani
         eppudu care tho adugutav. Naaku em kavalo
         cheppakundane ardham cheskuntav.
       </p>

       <p>
         Nee daggara unna last rupee aina na kosam
         spend cheyyadaniki venakalaadavu. Aa care,
         aa love, aa little things anni na heart lo
         eppatiki untayi.
       </p>

       <p>
         Nuvvu naaku just oka person kaadu…
         naaku comfort, care, happiness. ❤️
       </p>

       <p>
         I wish the beautiful rest of my life has you
         in it, just like this — caring for me,
         annoying me, loving me and standing beside me. 🫶🏻
       </p>

       <p>
         <strong>
           Love you more than u know my Bakkamma. ❤️
         </strong>
       </p>

       <div className="sign">
         Always yours,
         <br/>
         the boy who will keep choosing you.
       </div>

     </article>

   </section>
 );
}


function End(){

 return (
   <section className="end">

     <img
       src="/reference.png"
       alt=""
     />

     <div>

       <small>
         THE STORY CONTINUES
       </small>

       <h1>
         Still my favourite person.
         <br/>
         Still my favourite story.
       </h1>

       <strong>
         I Love You Bakkamma
       </strong>

       <p>
         forever, in every chapter.
       </p>

     </div>

   </section>
 );
}


createRoot(
 document.getElementById("root")
).render(
 <App/>
);