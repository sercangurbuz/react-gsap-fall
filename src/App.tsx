import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import MainScene from './MainScene';
import { gsap, Back, Elastic, Bounce, Power4, Linear } from 'gsap';
import { useCallback } from 'react';

/**
 *  Main App Scene Component
 */
function App() {
  /* -------------------------------------------------------------------------- */
  /*                                    Actors                                  */
  /* -------------------------------------------------------------------------- */

  //Falling leaves
  const backFallingLeavesRef = useRef<(SVGGElement | null)[]>([]);
  //Text stuffs
  const textGreetingRef = useRef<(SVGPathElement | null)[]>([]);
  const textLine1Ref = useRef<(SVGPathElement | null)[]>([]);
  const textLine2Ref = useRef<(SVGPathElement | null)[]>([]);
  //Leafs
  const treeLeafsRef = useRef<(SVGGElement | null)[]>([]);
  const treeFloorLeafsRef = useRef<(SVGGElement | null)[]>([]);
  //Bird
  const birdRef = useRef<SVGGElement | null>(null);
  const birdHatRef = useRef<SVGGElement | null>(null);
  const leftEyeRef = useRef<SVGGElement | null>(null);
  const rightEyeRef = useRef<SVGGElement | null>(null);
  //Nest
  const nestAndLeafsRef = useRef<SVGGElement | null>(null);
  //Tree
  const treeTrunkRef = useRef<SVGGElement | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */

  const [ready, setReady] = useState<boolean>();

  /* -------------------------------------------------------------------------- */
  /*                                   Scenes                                   */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Clear Stage ------------------------------ */

  const clearStage = useCallback(() => {
    const tl = gsap.timeline();

    const elemsToReset = [
      backFallingLeavesRef.current,
      textLine1Ref.current,
      textLine2Ref.current,
      textGreetingRef.current,
      treeLeafsRef.current,
      nestAndLeafsRef.current,
      treeTrunkRef.current,
      birdRef.current,
    ];

    //hide elems initially
    tl.set(elemsToReset, {
      autoAlpha: 0,
    })
      //position shift initially
      .set(birdRef.current, { y: '+=65' })
      .set(treeFloorLeafsRef.current, {
        y: '+=275',
        onComplete() {
          setReady(true);
        },
      });

    return tl;
  }, []);

  /* ------------------------------- Vegetation ------------------------------- */

  const enterFloorVegetation = useCallback(() => {
    const tl = gsap.timeline();

    tl.to(treeFloorLeafsRef.current, {
      duration: 1,
      stagger: 0.01,
      ease: Back.easeInOut,
      y: 0,
    })
      .fromTo(
        treeTrunkRef.current,
        {
          duration: 1.1,
          scaleY: 0.2,
          autoAlpha: 0,
          transformOrigin: 'center bottom',
        },
        {
          duration: 1.1,
          scaleY: 1,
          autoAlpha: 1,
          transformOrigin: 'center bottom',
          ease: Back.easeInOut,
        }
      )
      .fromTo(
        treeTrunkRef.current,
        {
          duration: 0.9,
          scaleX: 0.2,
          autoAlpha: 0,
          transformOrigin: 'center bottom',
        },
        {
          duration: 0.9,
          scaleX: 1,
          autoAlpha: 1,
          transformOrigin: 'center bottom',
          ease: Back.easeInOut,
        },
        '-=0.9'
      );
    return tl;
  }, []);

  /* ---------------------------------- Tree ---------------------------------- */

  const enterTreeStuff = useCallback(() => {
    const treeLeafAnim = (tl: gsap.core.Timeline) => {
      return tl.fromTo(
        treeLeafsRef.current,
        {
          scale: 0.2,
          autoAlpha: 0,
          transformOrigin: 'center bottom',
        },
        {
          stagger: 0.02,
          duration: 0.5,
          scale: 1,
          autoAlpha: 1,
        }
      );
    };

    const nestAnim = (tl: gsap.core.Timeline) => {
      return tl
        .fromTo(
          nestAndLeafsRef.current,
          { y: 0, scale: 0.2, autoAlpha: 0, transformOrigin: 'center center' },
          {
            duration: 1,
            y: '-=15',
            scale: 1,
            autoAlpha: 1,
            ease: Elastic.easeOut,
            transformOrigin: 'center center',
          },
          '+=0.1'
        )
        .to(
          nestAndLeafsRef.current,
          {
            duration: 0.3,
            y: '+=15',
            ease: Bounce.easeOut,
          },
          '-=0.3'
        )
        .add('nest-pop-in');
    };

    const birdPeekingAnim = (tl: gsap.core.Timeline) => {
      return tl
        .to(birdRef.current, {
          duration: 1.1,
          y: '-=39',
          autoAlpha: 1,
          ease: Power4.easeIn,
        })
        .add('bird-peeking');
    };

    const birdBlinkAnim = (tl: gsap.core.Timeline) => {
      return tl
        .to(
          [leftEyeRef.current, rightEyeRef.current],
          {
            keyframes: [
              {
                autoAlpha: 0,
                duration: 0.2,
              },
              {
                autoAlpha: 1,
                duration: 0.2,
              },
              {
                autoAlpha: 0,
                duration: 0.2,
                delay: 0.2,
              },
              {
                autoAlpha: 1,
                duration: 0.2,
              },
            ],
          },
          '+=0.3'
        )
        .add('bird-blinks');
    };

    const resetBirdHat = (tl: gsap.core.Timeline) => {
      return tl.set(birdHatRef.current, { rotation: 12, x: '+=6' });
    };

    const birdAnim = (tl: gsap.core.Timeline) => {
      return tl
        .to(birdRef.current, {
          y: '-=34',
          duration: 0.8,
          ease: Power4.easeInOut,
        })
        .to(birdRef.current, {
          y: '+=8',
          duration: 0.3,
          ease: Back.easeOut,
        });
    };

    const birdBlinkingAnim = (tl: gsap.core.Timeline) => {
      tl.to([leftEyeRef.current, rightEyeRef.current], {
        repeat: -1,
        repeatDelay: 4,
        delay: 1,
        keyframes: [
          {
            autoAlpha: 0,
            duration: 0.2,
          },
          {
            autoAlpha: 1,
            duration: 0.2,
          },
        ],
      });
    };

    const birdHatAnim = (tl: gsap.core.Timeline) => {
      return tl
        .to(
          birdHatRef.current,
          {
            y: '-=12',
            duration: 0.4,
          },
          '-=0.6'
        )
        .to(
          birdHatRef.current,
          {
            y: 0,
            duration: 0.3,
            rotation: 0,
            x: 0,
            onComplete: birdBlinkingAnim,
            onCompleteParams: [tl],
          },
          '-=0.2'
        );
    };

    const mainTL = gsap.timeline();

    return gsap.utils.pipe(
      treeLeafAnim,
      nestAnim,
      resetBirdHat,
      birdPeekingAnim,
      birdBlinkAnim,
      birdAnim,
      birdHatAnim
    )(mainTL);
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                 Text anims                                 */
  /* -------------------------------------------------------------------------- */

  const enterGreetingText = useCallback(() => {
    const tl = gsap.timeline();

    const startLoops = () => {
      //start bg color loop
      const colors = ['#edcc93', '#f7e3ae', '#f3ebcc', '#edcc93'];
      const bgTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      bgTl
        .to(document.body, { backgroundColor: colors[0], duration: 3 })
        .to(document.body, { backgroundColor: colors[1], duration: 3 }, '+=2')
        .to(document.body, { backgroundColor: colors[2], duration: 3 }, '+=2')
        .to(document.body, { backgroundColor: colors[3], duration: 3 }, '+=2');

      //start falling leaves loop
      gsap.set(backFallingLeavesRef.current, { y: -100, autoAlpha: 0.2 });

      const brownLeaf = backFallingLeavesRef.current[0];
      const redLeaf = backFallingLeavesRef.current[1];
      const orangeLeaf = backFallingLeavesRef.current[2];

      const repeatFall = (leaf: HTMLElement) => {
        const range = Math.random() * 800;
        const newXPosition = range - 400;

        gsap.set(leaf, {
          x: newXPosition,
          y: -100,
          autoAlpha: 0.2,
          rotation: Math.random() * 360,
        });
        gsap.to(leaf, {
          duration: 10 + Math.random() * 10,
          y: '+=1200',
          autoAlpha: 1,
          onComplete: repeatFall,
          onCompleteParams: [leaf],
          ease: Linear.easeNone,
        });
      };

      gsap.set(brownLeaf, {
        y: '+=1200',
        autoAlpha: 1,
        duration: 10 + Math.random() * 10,
        onComplete: repeatFall,
        onCompleteParams: [brownLeaf],
        ease: Linear.easeNone,
      });
      gsap.set(redLeaf, {
        y: '+=1200',
        autoAlpha: 1,
        duration: 10 + Math.random() * 10,
        onComplete: repeatFall,
        onCompleteParams: [redLeaf],
        ease: Linear.easeNone,
      });
      gsap.set(orangeLeaf, {
        y: '+=1200',
        autoAlpha: 1,
        duration: 10 + Math.random() * 10,
        onComplete: repeatFall,
        onCompleteParams: [orangeLeaf],
        ease: Linear.easeNone,
      });
    };

    tl.fromTo(
      textLine1Ref.current,
      { y: '-=50', autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, onComplete: startLoops }
    )
      .fromTo(
        textLine2Ref.current,
        { y: '-=25', autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1 }
      )
      .fromTo(
        textGreetingRef.current,
        {
          scale: 2,
          autoAlpha: 0,
          transformOrigin: 'center center',
        },
        {
          duration: 0.5,
          scale: 1,
          autoAlpha: 1,
          stagger: 0.1,
        }
      );

    return tl;
  }, []);

  /* ------------------------------- Main Stage ------------------------------- */

  /**
   * Main stage
   */
  const startMainScene = useCallback(() => {
    const tl = gsap.timeline();
    //add main timeline
    tl.add(clearStage(), 'scene-clear-stage')
      .add(enterFloorVegetation(), 'scene-floor-vegatation')
      .add(enterTreeStuff(), 'scene-enter-treestuff')
      .add(enterGreetingText(), 'scene-enter-greeting');
  }, [clearStage, enterFloorVegetation, enterGreetingText, enterTreeStuff]);

  useEffect(() => {
    startMainScene();
  }, [startMainScene]);

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      className="card container"
      style={{ display: ready ? 'block' : 'hidden' }}
    >
      <MainScene
        backFallingLeavesRef={backFallingLeavesRef}
        textLine1Ref={textLine1Ref}
        textLine2Ref={textLine2Ref}
        textGreetingRef={textGreetingRef}
        treeLeafsRef={treeLeafsRef}
        treeFloorLeafsRef={treeFloorLeafsRef}
        birdRef={birdRef}
        birdHatRef={birdHatRef}
        leftEyeRef={leftEyeRef}
        rightEyeRef={rightEyeRef}
        nestAndLeafsRef={nestAndLeafsRef}
        treeTrunkRef={treeTrunkRef}
      />
    </div>
  );
}

export default App;
