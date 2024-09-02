import { useEffect, useMemo, useRef } from "react";
import Layout from "../components/layout/Layout";
import Typewriter from "typewriter-effect/dist/core";
import "../components/styles/PageNotFound.css";

const PageNotFound = () => {
  const typewriterRef = useRef(null);

  const quotes = useMemo(()=>[
    "Rocking a sherwani? Just remember: the more layers, the more chances to hide your snacks!",
    "Warning: Wearing lehengas may cause excessive compliments",
    "Why wear boring when you can wear a kurta and make every uncle at the wedding jealous?",
    "Juttis are like magic shoes—one wear and you'll be twirling like nobody's watching!",
    "Kurtas are so comfortable, you might just forget you're wearing pants!",
    "Lehengas so gorgeous, they might just make your ex reconsider their life choices!",
    "Lehenga for her, kurta for you—because why should she have all the fun?",
    "Juttis: Because every king needs his royal footwear!",
    "Jhumkas: because every outfit needs a little extra ding-ding!",
    "Kurtas are designed to make you look effortlessly stylish—no gym required!",
    "Dressing ethnic: because you can’t wear pajamas to every function (but we won’t judge if you try)!",
    "Dressed to impress? More like dressed to cause a traffic jam with all those heads turning!",
    "Why go for casual when you can be fabulously ethnic? Life’s too short for boring clothes!",
    "Lehengas: the only reason you need to practice your twirl and pose game!",
  ],[]);

  useEffect(() => {
    if (typewriterRef.current) {
      new Typewriter(typewriterRef.current, {
        strings: quotes,
        autoStart: true,
        loop: true,
        delay: 40,
        deleteSpeed: 10,
        pause: 10,
      });
    }
  }, [quotes]); 


  return (
    <Layout>
      <div className="pageNotFound">
        <div id="typewriterPnf">
          <p ref={typewriterRef}></p>
        </div>
        <div className="pnf">
          <div className="pnf-left">
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <br />
            <p>Sorry, This page is not found</p>
            <p>
              The link you followed is probably broken or the page has been
              removed
            </p>
          </div>
          <video autoPlay loop muted playsInline>
            <source src="pnf-robo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
