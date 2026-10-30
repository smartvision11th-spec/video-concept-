import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 181;
const VIDEO_WIDTH = 868;
const VIDEO_HEIGHT = 480;
const FRAME_ASPECT = VIDEO_HEIGHT / VIDEO_WIDTH; // 480 / 868 ≈ 0.552995

export default function Hero({ onOpenIntake }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Smooth scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  // Window geometry synchronized with viewport
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : VIDEO_WIDTH,
    height: typeof window !== 'undefined' ? window.innerHeight : VIDEO_HEIGHT,
  });

  // Track window resize and orientation change immediately
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize(); // sync immediately on mount
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Preload all 181 frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/hero-frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  // Smooth lerp scroll listener with requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollableDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDist));
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Lerp loop for buttery-smooth motion
    const updateLerp = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.12;
      setScrollProgress(currentProgressRef.current);
      animationFrameIdRef.current = requestAnimationFrame(updateLerp);
    };

    animationFrameIdRef.current = requestAnimationFrame(updateLerp);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  // Breakpoints
  const isDesktop = dimensions.width >= 1024;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const isMobile = dimensions.width < 768;

  // Phase 1: Video playback occupies scroll from 0.0 to 0.70 (Frame 1 to 181)
  const playPhase = Math.min(1, scrollProgress / 0.70);
  const frameIndex = Math.min(
    TOTAL_FRAMES - 1,
    Math.max(0, Math.floor(playPhase * (TOTAL_FRAMES - 1)))
  );

  // Draw current frame to canvas:
  // Native resolution 868 x 480 is strictly preserved for 1:1 pixel rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      if (canvas.width !== VIDEO_WIDTH || canvas.height !== VIDEO_HEIGHT) {
        canvas.width = VIDEO_WIDTH;
        canvas.height = VIDEO_HEIGHT;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.clearRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
      ctx.drawImage(img, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    }
  }, [frameIndex, imagesLoaded]);

  // Phase 2: Docking transition happens ONLY AFTER the video ends (0.70 to 0.92)
  // At scrollProgress < 0.70, t is strictly 0 (Zero text, pure fullscreen video)
  const t = Math.max(0, Math.min(1, (scrollProgress - 0.70) / 0.22));

  // =========================================================================
  // SYNCHRONIZED VIDEO & HERO SECTION GEOMETRY (868 x 480 ASPECT RATIO)
  // =========================================================================
  const winW = dimensions.width;
  const winH = dimensions.height;

  // Initial full video frame sizing (Strictly preserving 868:480)
  const scale = Math.min(winW / VIDEO_WIDTH, (winH - (isMobile ? 110 : 80)) / VIDEO_HEIGHT);
  const initWidth = Math.round(VIDEO_WIDTH * scale);
  const initHeight = Math.round(VIDEO_HEIGHT * scale);
  const initLeft = Math.round((winW - initWidth) / 2);
  const initTop = Math.round((winH - initHeight) / 2);

  // Docked corner video frame sizing (Strictly preserving 868:480)
  let dockWidth, dockHeight, dockLeft, dockTop;

  if (isDesktop) {
    dockWidth = Math.min(480, Math.round(winW * 0.35));
    dockHeight = Math.round(dockWidth * FRAME_ASPECT);
    dockLeft = Math.max(32, Math.round((winW - 1280) / 2 + 48));
    dockTop = Math.max(84, Math.round((winH - dockHeight - 80) / 2));
  } else if (isTablet) {
    dockWidth = Math.min(340, Math.round(winW * 0.44));
    dockHeight = Math.round(dockWidth * FRAME_ASPECT);
    dockLeft = 24;
    dockTop = 76;
  } else {
    dockWidth = Math.min(220, Math.round(winW * 0.58));
    dockHeight = Math.round(dockWidth * FRAME_ASPECT);
    dockLeft = 16;
    dockTop = 68;
  }

  // Smoothly interpolated geometry for video container
  const curLeft = initLeft + (dockLeft - initLeft) * t;
  const curTop = initTop + (dockTop - initTop) * t;
  const curWidth = initWidth + (dockWidth - initWidth) * t;
  const curHeight = initHeight + (dockHeight - initHeight) * t;
  const curBorderRadius = isMobile ? (t > 0.05 ? 6 : 4) : Math.min(8, 4 + t * 4);

  const currentFrameNumber = Math.min(
    TOTAL_FRAMES,
    Math.max(1, Math.floor(playPhase * TOTAL_FRAMES))
  );

  const handleReplay = () => {
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0e0e0e]"
      style={{ height: '260vh' }} // Calibrated scroll track pinned until video ends and docks
    >
      {/* Sticky viewport frame container: Stays pinned while scrolling through track */}
      <div className="sticky top-0 h-screen sm:h-[100dvh] w-full overflow-hidden bg-[#0e0e0e] z-10">
        
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(181,138,88,0.06)_0%,transparent_75%)]" />

        {/* ============================================================== */}
        {/* DYNAMIC SCROLL VIDEO CONTAINER (SYNCHRONIZED WITH 868x480)     */}
        {/* ============================================================== */}
        <div
          className={`absolute overflow-hidden z-20 transition-shadow duration-300 ${
            t > 0.05
              ? 'border border-[#b58a58] shadow-[0_25px_60px_rgba(0,0,0,0.95)]'
              : 'border border-[#4f453a]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
          }`}
          style={{
            left: `${curLeft}px`,
            top: `${curTop}px`,
            width: `${curWidth}px`,
            height: `${curHeight}px`,
            borderRadius: `${curBorderRadius}px`,
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block bg-[#0e0e0e] object-contain"
            style={{ imageRendering: 'auto' }}
          />

          {/* DOCKED BADGE & OVERLAY (Appears ONLY AFTER video finishes and docks into left corner) */}
          <div
            className="absolute inset-0 flex flex-col justify-between p-2 sm:p-2.5 pointer-events-none transition-opacity duration-300"
            style={{ opacity: t > 0.8 ? (t - 0.8) / 0.2 : 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="bg-[#0e0e0e]/90 text-[#eebe87] font-mono text-[8px] sm:text-[9px] tracking-widest px-1.5 py-0.5 border border-[#b58a58]/60 uppercase flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block"></span>
                REC // 01:81
              </span>
              <span className="bg-[#0e0e0e]/90 text-[#d3c4b6] font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 border border-[#2a2a2a]">
                181 FRAMES
              </span>
            </div>

            <div className="flex items-center justify-between pointer-events-auto">
              <span className="text-[8px] sm:text-[10px] font-label-sm uppercase tracking-widest text-[#eebe87] font-semibold drop-shadow-md truncate max-w-[120px]">
                SNATCH VECTOR
              </span>
              <button
                onClick={handleReplay}
                className="bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-sm text-[8px] sm:text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold flex items-center gap-1 transition-colors shadow-md active:scale-95"
                title="Replay sequence"
              >
                <span className="material-symbols-outlined text-[12px] sm:text-[13px]">replay</span>
                REPLAY
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHASE 1: ZERO TEXT SCROLL HINT (Active only at beginning)       */}
        {/* ============================================================== */}
        <div
          className="absolute inset-x-0 bottom-5 sm:bottom-8 z-30 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 px-4 text-center"
          style={{
            opacity: scrollProgress < 0.15 ? 1 - scrollProgress / 0.15 : 0,
          }}
        >
          <div className="flex flex-col items-center gap-1.5 sm:gap-2.5">
            <span className="font-label-lg text-[9px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.35em] text-[#eebe87] font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#eebe87] animate-ping inline-block"></span>
              SCROLL TO COMMENCE // DISCIPLINE IN MOTION
            </span>
            <div className="w-4 h-6 sm:w-5 sm:h-8 rounded-full border border-[#eebe87]/70 flex items-start justify-center p-1 bg-black/50 backdrop-blur-sm">
              <div className="w-1 sm:w-1.5 h-1.5 sm:h-2 bg-[#eebe87] rounded-full animate-bounce"></div>
            </div>
            <span className="font-mono text-[8px] sm:text-[10px] text-[#9c8e82] tracking-widest">
              FRAME {String(currentFrameNumber).padStart(3, '0')} / 181
            </span>
          </div>
        </div>

        {/* Mid-playback subtle scrub bar indicator */}
        <div
          className="absolute bottom-2.5 left-4 right-4 sm:bottom-3 sm:left-6 sm:right-6 lg:left-12 lg:right-12 z-30 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: scrollProgress > 0.05 && scrollProgress < 0.70 ? 0.7 : 0,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-[8px] sm:text-[10px] text-[#eebe87] tracking-wider font-semibold">
              00:{String(currentFrameNumber).padStart(3, '0')}
            </span>
            <div className="flex-1 h-0.5 bg-[#2a2a2a] relative overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#eebe87] transition-all duration-75"
                style={{ width: `${Math.min(100, (scrollProgress / 0.70) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[8px] sm:text-[10px] text-[#9c8e82] tracking-wider">
              181 FPS
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHASE 2: HERO TEXT CLUSTER & TELEMETRY STRIP                  */}
        {/* (Appears ONLY AFTER video playback ends and morphs into dock) */}
        {/* ============================================================== */}
        <div
          className="relative z-20 max-w-7xl w-full h-full mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-between pt-16 sm:pt-20 pb-2.5 sm:pb-4 pointer-events-none"
        >
          {/* Main Grid: On desktop Left is reserved for docked video; Right holds text. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-center flex-1 my-auto">
            
            {/* Left Column Spacer on desktop (matches docked video footprint) */}
            <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />

            {/* Right Column (or Mobile Stack): Monumental Hero Typography */}
            <div
              className="lg:col-span-7 space-y-2 sm:space-y-3.5 pt-0.5 lg:pt-0"
              style={{
                marginTop: !isDesktop && t > 0.05 ? `${Math.round((dockHeight + 10) * t)}px` : '0px',
                opacity: t,
                transform: `translateX(${(1 - t) * (isDesktop ? 60 : 0)}px) translateY(${(1 - t) * (isDesktop ? 0 : 20)}px)`,
                pointerEvents: t > 0.7 ? 'auto' : 'none',
                transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
              }}
            >
              {/* Bronze Kicker Metadata */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#b58a58] inline-block animate-pulse" />
                <p className="font-label-lg text-[8.5px] sm:text-xs tracking-[0.18em] sm:tracking-[0.25em] text-[#eebe87] uppercase font-semibold">
                  EST. 2018 // HIGH-PERFORMANCE SANCTUARY
                </p>
              </div>

              {/* Monumental Headline */}
              <div>
                <h1 className="font-display-xl text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase text-[#e5e2e1] tracking-tight leading-[0.92] mb-1 sm:mb-2.5 font-bold">
                  BUILT THROUGH<br />
                  <span className="text-[#b58a58] tracking-wider">DISCIPLINE.</span>
                </h1>
                <p className="font-body-lg text-xs sm:text-sm lg:text-base text-[#d3c4b6] max-w-xl font-light tracking-wide mb-2.5 sm:mb-4 lg:mb-5 leading-relaxed line-clamp-2 sm:line-clamp-2 lg:line-clamp-3">
                  Train with purpose. Build strength. Become harder to stop. Architectural strength culture engineered for uncompromised physiological mastery and lifelong athletic durability.
                </p>
              </div>

              {/* Action Cluster (Start Your Journey & Explore The Facility) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3.5 pt-0.5">
                <button
                  onClick={() => onOpenIntake('membership')}
                  className="inline-flex items-center justify-center bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs sm:text-sm tracking-widest uppercase px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-200 font-bold shadow-lg hover:shadow-[#eebe87]/20 active:scale-95"
                >
                  START YOUR JOURNEY
                  <span className="material-symbols-outlined ml-2 text-[15px] sm:text-[17px]">north_east</span>
                </button>
                <a
                  href="#facility"
                  className="inline-flex items-center justify-center bg-transparent hover:bg-[#2a2a2a] text-[#e5e2e1] hover:text-[#eebe87] font-label-lg text-xs sm:text-sm tracking-widest uppercase px-4 sm:px-6 py-2.5 sm:py-3 border border-[#4f453a] hover:border-[#b58a58] transition-all duration-200 font-medium text-center"
                >
                  EXPLORE THE FACILITY
                  <span className="material-symbols-outlined ml-2 text-[15px] sm:text-[17px]">arrow_downward</span>
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* TELEMETRY STATS STRIP (Cleanly visible below Explore Facility) */}
          {/* ============================================================== */}
          <div
            className="w-full bg-[#1c1b1b]/95 backdrop-blur-md border border-[#2a2a2a] mt-2 sm:mt-3 lg:mt-4 pointer-events-auto shadow-xl"
            style={{
              opacity: t,
              transform: `translateY(${(1 - t) * 15}px)`,
              pointerEvents: t > 0.7 ? 'auto' : 'none',
              transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            }}
          >
            <div className="px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
              <div className="flex flex-col border-l border-[#4f453a]/60 pl-2.5 sm:pl-4 group hover:border-[#eebe87] transition-colors">
                <span className="font-headline-lg text-xs sm:text-base lg:text-xl uppercase text-[#e5e2e1] font-semibold tracking-wider">
                  12,000 SQ FT
                </span>
                <span className="font-label-sm text-[8px] sm:text-[9px] lg:text-[10px] uppercase text-[#9c8e82] tracking-widest mt-0.5">
                  Architectural Facility
                </span>
              </div>
              <div className="flex flex-col border-l border-[#4f453a]/60 pl-2.5 sm:pl-4 group hover:border-[#eebe87] transition-colors">
                <span className="font-headline-lg text-xs sm:text-base lg:text-xl uppercase text-[#eebe87] font-semibold tracking-wider">
                  1 : 4
                </span>
                <span className="font-label-sm text-[8px] sm:text-[9px] lg:text-[10px] uppercase text-[#9c8e82] tracking-widest mt-0.5">
                  Coach to Athlete Ratio
                </span>
              </div>
              <div className="flex flex-col border-l border-[#4f453a]/60 pl-2.5 sm:pl-4 group hover:border-[#eebe87] transition-colors">
                <span className="font-headline-lg text-xs sm:text-base lg:text-xl uppercase text-[#e5e2e1] font-semibold tracking-wider">
                  100%
                </span>
                <span className="font-label-sm text-[8px] sm:text-[9px] lg:text-[10px] uppercase text-[#9c8e82] tracking-widest mt-0.5">
                  Calibrated Equipment
                </span>
              </div>
              <div className="flex flex-col border-l border-[#4f453a]/60 pl-2.5 sm:pl-4 group hover:border-[#eebe87] transition-colors">
                <span className="font-headline-lg text-xs sm:text-base lg:text-xl uppercase text-[#eebe87] font-semibold tracking-wider">
                  24 / 7
                </span>
                <span className="font-label-sm text-[8px] sm:text-[9px] lg:text-[10px] uppercase text-[#9c8e82] tracking-widest mt-0.5">
                  Biometric Access
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
