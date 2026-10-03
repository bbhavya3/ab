import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";


const scenes=[
  {
    img:"01-instagram.png",
    date:"04 OCTOBER 2022",
    title:"It started with a follow.",
    cap:"Do you remember how it all started? Just one Instagram follow… I never imagined that the boy I started talking to would become such an important part of my life.",
    motion:"kenburn"
  },

  {
    img:"02-talking.png",
    date:"THEN",
    title:"A few messages became a habit.",
    cap:"At first, you were just my friend. But somehow, our conversations kept getting longer… and talking to you slowly became a part of my everyday life.",
    motion:"float"
  },

  {
    img:"03-btech.png",
    date:"A NEW CHAPTER",
    title:"Then I entered B.Tech.",
    cap:"Then I entered B.Tech, and somehow you became even more important to me. Between classes, messages and all those little moments, we were slowly getting closer.",
    motion:"pan"
  },

  {
    img:"04-midnight.png",
    date:"12:00 AM → 2:00 AM",
    title:"Midnight was never really late.",
    cap:"Do you remember all those late-night conversations? We would say 'just five more minutes' and suddenly it would be 2 AM. Those nights are some of my favourite memories with you.",
    motion:"zoom"
  },

  {
    img:"05-love-starts.png",
    date:"04 OCTOBER 2024 • COLLEGE FEST",
    title:"That was when friendship became love.",
    cap:"And then came this day… 04 October 2024. Nothing dramatic, no big proposal. Somewhere in that beautiful day, I just realised that what I felt for you was no longer just friendship. It was love.",
    motion:"drift"
  },

  {
    img:"06-temple.png",
    date:"DURGAMMA TEMPLE",
    title:"A little blessing.",
    cap:"I still remember this moment. Standing in front of Ammavaru, when you put that little bottu on my forehead… it felt like one of those moments I would remember forever.",
    motion:"temple"
  },

  {
    img:"07-fights.png",
    date:"REAL LOVE ISN’T ALWAYS EASY",
    title:"We fought too.",
    cap:"Of course, we weren't perfect. We fought, misunderstood each other and sometimes said things we didn't mean. But even when I was angry with you, my heart never really stopped caring.",
    motion:"shake"
  },

  {
    img:"08-tears.png",
    date:"SOME DAYS HURT",
    title:"And sometimes, I cried.",
    cap:"There were days when I cried because of us. Days when everything felt too much. But somewhere inside, I still hoped that we would find our way back to each other.",
    motion:"soft"
  },

  {
    img:"09-comfort.png",
    date:"AND THEN",
    title:"You came to comfort me.",
    cap:"And then you came back to me. Sometimes you didn't need the perfect words… just having you there was enough to make everything feel a little better.",
    motion:"rise"
  },

  {
    img:"10-way-back.png",
    date:"AFTER EVERY FIGHT",
    title:"We always find our way back.",
    cap:"Maybe that's what makes us us. No matter how many times we fight or get hurt, somehow we always find our way back to each other.",
    motion:"warm"
  },

  {
    img:"11-final-moments.png",
    date:"EVERY CHAPTER",
    title:"And somehow, it is still us.",
    cap:"And look at us now… from one Instagram follow to all these memories, we have grown, changed and loved each other through so many chapters. And honestly, I wouldn't want to rewrite a single one.",
    motion:"final"
  }
];


const photos=[
  [
    "photo1.png",
    "Every time I look at this picture, I smile… because even the simplest moments with you mean so much to me."
  ],

  [
    "photo2.png",
    "I don't know if you realise it, but even our most ordinary moments become special memories for me."
  ],

  [
    "photo3.png",
    "Whenever I'm with you, I feel like I'm exactly where I'm supposed to be."
  ],

  [
    "photo4.png",
    "This smile has a little bit of you in it… because so many of my happiest moments have you in them."
  ],

  [
    "photo5.png",
    "Different days, different memories… but the same person beside me. And that's exactly how I want it to stay."
  ]
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

    /* HAPPY 2 YEARS → FILM INTRO */

    if(mode==="title"){

      setMode("intro");

      return;
    }


    /* FILM INTRO → FIRST SCENE */

    if(mode==="intro"){

      setMode("story");
      setI(0);

      return;
    }


    /* STORY */

    if(mode==="story"){

      if(i<scenes.length-1){

        setI(i+1);

      }else{

        setMode("photos");
        setPhoto(0);

      }

      return;
    }


    /* REAL PHOTOS */

    if(mode==="photos"){

      if(photo<photos.length-1){

        setPhoto(photo+1);

      }else{

        setMode("letter");

      }

      return;
    }


    /* LETTER → END */

    if(mode==="letter"){

      setMode("end");

      return;
    }

  };


  const back=(e)=>{

    e.stopPropagation();


    /* STORY → PREVIOUS STORY */

    if(mode==="story" && i>0){

      setI(i-1);

    }


    /* FIRST STORY → FILM INTRO */

    else if(mode==="story" && i===0){

      setMode("intro");

    }


    /* PHOTOS → PREVIOUS PHOTO */

    else if(mode==="photos" && photo>0){

      setPhoto(photo-1);

    }


    /* FIRST PHOTO → LAST STORY */

    else if(mode==="photos" && photo===0){

      setMode("story");
      setI(scenes.length-1);

    }


    /* LETTER → LAST PHOTO */

    else if(mode==="letter"){

      setMode("photos");
      setPhoto(photos.length-1);

    }


    /* END → LETTER */

    else if(mode==="end"){

      setMode("letter");

    }


    /* FILM INTRO → ANNIVERSARY TITLE */

    else if(mode==="intro"){

      setMode("title");

    }

  };


  return (

    <div className="movie" onClick={advance}>

      <audio
        id="music"
        loop
        src="/music/Ne choopule song piano cover.mp3"
      />


      <div className="film-grain"/>
      <div className="black-vignette"/>


      {/* HEADER — hidden during title and film intro */}

      {mode!=="title" && mode!=="intro" && (

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


      {/* ANNIVERSARY TITLE */}

      {mode==="title" && <AnniversaryTitle/>}


      {/* CINEMATIC FILM INTRO */}

      {mode==="intro" && <FilmIntro/>}


      {/* STORY */}

      {mode==="story" && (

        <Story
          scene={scenes[i]}
          n={i}
        />

      )}


      {/* REAL PHOTOS */}

      {mode==="photos" && (

        <Photos n={photo}/>

      )}


      {/* LETTER */}

      {mode==="letter" && (

        <Letter/>

      )}


      {/* FINAL */}

      {mode==="end" && (

        <End/>

      )}


      {/* FOOTER — hidden during title and film intro */}

      {mode!=="title" && mode!=="intro" && (

        <footer>

          <span>
            {mode==="story" ? "OUR STORY" : mode.toUpperCase()}
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



/* =====================================================
   SECRET GATE
   ===================================================== */

function Gate({pass,setPass,onOpen}){

  return (

    <div className="gate">

      <div className="gatebox">

        <small>
          A PRIVATE LOVE FILM
        </small>


        <h1>
          For Bakkamma.
        </h1>


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



/* =====================================================
   ANNIVERSARY TITLE
   ===================================================== */

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

          <em>
            Bakkamma.
          </em>

        </h1>


        <div className="anniversary-divider"/>


        <h2>
          2 Years of Love
        </h2>


        <p>
          4 Years of Friendship
        </p>


        <div className="anniversary-years">

          <span>
            2022
          </span>

          <i>
            →
          </i>

          <span>
            2026
          </span>

        </div>


        <div className="title-hint">
          OUR STORY BEGINS
        </div>

      </div>

    </section>

  );

}



/* =====================================================
   FILM INTRO
   ===================================================== */

function FilmIntro(){

  return (

    <section className="film-intro">

      <div className="film-intro-glow"/>


      <div className="film-intro-content">

        <small>
          OUR STORY
        </small>


        <div className="film-line"/>


        <h1>

          There's a small

          <br/>

          <em>
            film of ours.
          </em>

        </h1>


        <p>

          A story made of little moments,

          <br/>

          memories, fights, laughter and love.

        </p>

      </div>

    </section>

  );

}



/* =====================================================
   STORY
   ===================================================== */

function Story({scene,n}){

  /* LAST SCENE — IMAGE ONLY */

  if(n===scenes.length-1){

    return (

      <section className="last-image-only">

        <img
          src={"/story/"+scene.img}
          alt=""
        />

      </section>

    );

  }


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

    </section>

  );

}



/* =====================================================
   REAL PHOTOS
   ===================================================== */

function Photos({n}){

  const photoFile=photos[n][0];

  /*
    Cache-busting query parameter.
    This helps mobile browsers treat each photo
    as a separate updated image instead of reusing
    an older cached image.
  */

  const photoSrc=`/photos/${photoFile}?v=${n+1}`;


  return (

    <section className="photos">

      <small>
        THE REAL MEMORIES
      </small>


      <div className="realcard">


        <div
          className="photo-bg"
          style={{
            backgroundImage:`url(${photoSrc})`
          }}
        />


        <img
          key={photoSrc}
          src={photoSrc}
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

            Place {photoFile} inside{" "}

            <b>
              public/photos
            </b>

          </span>

        </div>

      </div>


      <h2>
        {photos[n][1]}
      </h2>

    </section>

  );

}



/* =====================================================
   LETTER
   ===================================================== */

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



/* =====================================================
   FINAL
   ===================================================== */

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



/* =====================================================
   APP START
   ===================================================== */

createRoot(
  document.getElementById("root")
).render(
  <App/>
);