import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 181;
const FRAME_ASPECT = 480 / 868; // exact aspect ratio of new 868x480 video frames (~0.553)

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

  // Window geometry for smooth responsive layout morphing
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  // Track window resize with debounced update
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 50);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
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

  // Draw current frame to canvas with crisp retina filtering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate frame index based on scroll (phase 1: 0 to 0.70)
    const playPhase = Math.min(1, scrollProgress / 0.70);
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(playPhase * (TOTAL_FRAMES - 1)))
    );

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      // Use exact device pixel ratio capped at 2 for crisp retina rendering without memory bloat
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const displayWidth = Math.round(canvas.clientWidth);
      const displayHeight = Math.round(canvas.clientHeight);

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Force highest-quality bicubic resampling filter
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Math for object-fit: cover with pixel-perfect integer alignment
      const cw = displayWidth;
      const ch = displayHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = Math.round(iw * scale);
      const nh = Math.round(ih * scale);
      const cx = Math.round((cw - nw) / 2);
      const cy = Math.round((ch - nh) / 2);

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, cx, cy, nw, nh);
      ctx.restore();
    }
  }, [scrollProgress, imagesLoaded, dimensions]);

  // Phase transition calculation (0.70 to 1.0)
  const isTransitioning = scrollProgress >= 0.70;
  const t = Math.max(0, Math.min(1, (scrollProgress - 0.70) / 0.30));

  // Breakpoints
  const isDesktop = dimensions.width >= 1024;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const isMobile = dimensions.width < 768;

  // Container geometry
  const maxContainerWidth = 1280;
  const containerMarginLeft = Math.max(16, (dimensions.width - maxContainerWidth) / 2 + (isDesktop ? 48 : 24));
  
  // Dock dimensions calculated adaptively for EVERY screen size
  let dockWidth, dockHeight, dockLeft, dockTop;

  if (isDesktop) {
    // Desktop: side-by-side left dock
    dockWidth = Math.min(540, dimensions.width * 0.40);
    dockHeight = dockWidth * FRAME_ASPECT;
    dockLeft = containerMarginLeft;
    dockTop = Math.max(96, (dimensions.height - dockHeight - 110) / 2);
  } else if (isTablet) {
    // Tablet: sleek centered top banner
    dockWidth = Math.min(580, dimensions.width - 48);
    dockHeight = dockWidth * FRAME_ASPECT;
    dockLeft = (dimensions.width - dockWidth) / 2;
    dockTop = 88;
  } else {
    // Mobile: responsive top letterbox banner
    dockWidth = dimensions.width - 32;
    const maxDockH = Math.min(185, dimensions.height * 0.25);
    dockHeight = Math.min(maxDockH, dockWidth * FRAME_ASPECT);
    dockLeft = 16;
    dockTop = 84;
  }

  // Smoothly interpolated geometry for the video container
  const curLeft = 0 + (dockLeft - 0) * t;
  const curTop = 0 + (dockTop - 0) * t;
  const curWidth = dimensions.width + (dockWidth - dimensions.width) * t;
  const curHeight = dimensions.height + (dockHeight - dimensions.height) * t;
  const curBorderRadius = t * 6;

  const currentFrameNumber = Math.min(
    TOTAL_FRAMES,
    Math.max(1, Math.floor((Math.min(1, scrollProgress / 0.70)) * TOTAL_FRAMES))
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
      style={{ height: '340vh' }} // Extended scroll track for comfortable, synchronised frame playback
    >
      {/* Sticky viewport frame container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0e0e0e]">
        
        {/* ============================================================== */}
        {/* DYNAMIC SCROLL VIDEO CONTAINER (FULLSCREEN -> DOCKED)          */}
        {/* ============================================================== */}
        <div
          className={`absolute overflow-hidden z-20 transition-shadow duration-300 ${
            t > 0.05
              ? 'border border-[#b58a58] shadow-[0_25px_60px_rgba(0,0,0,0.95)]'
              : 'border-0 shadow-none'
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
            className="w-full h-full block bg-[#0e0e0e] object-cover"
            style={{ imageRendering: 'auto' }}
          />

          {/* DOCKED BADGE & OVERLAY (Appears when video finishes and docks) */}
          <div
            className="absolute inset-0 flex flex-col justify-between p-2.5 sm:p-3.5 pointer-events-none transition-opacity duration-300"
            style={{ opacity: t > 0.8 ? (t - 0.8) / 0.2 : 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="bg-[#0e0e0e]/90 text-[#eebe87] font-mono text-[9px] sm:text-[10px] tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[#b58a58]/60 uppercase flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse inline-block"></span>
                REC // 01:81 MOTION
              </span>
              <span className="bg-[#0e0e0e]/90 text-[#d3c4b6] font-mono text-[9px] sm:text-[10px] px-2 py-0.5 border border-[#2a2a2a]">
                181 FRAMES
              </span>
            </div>

            <div className="flex items-center justify-between pointer-events-auto">
              <span className="text-[10px] sm:text-[11px] font-label-sm uppercase tracking-widest text-[#eebe87] font-semibold drop-shadow-md">
                BARBELL SNATCH VECTOR
              </span>
              <button
                onClick={handleReplay}
                className="bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 font-bold flex items-center gap-1 transition-colors shadow-md active:scale-95"
                title="Replay sequence"
              >
                <span className="material-symbols-outlined text-[13px] sm:text-[14px]">replay</span>
                REPLAY
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHASE 1: ZERO TEXT SCROLL HINT (Active only at beginning)       */}
        {/* ============================================================== */}
        <div
          className="absolute inset-x-0 bottom-8 sm:bottom-12 z-30 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 px-4 text-center"
          style={{
            opacity: scrollProgress < 0.15 ? 1 - scrollProgress / 0.15 : 0,
          }}
        >
          <div className="flex flex-col items-center gap-2.5 sm:gap-3">
            <span className="font-label-lg text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#eebe87] font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#eebe87] animate-ping inline-block"></span>
              SCROLL TO COMMENCE // DISCIPLINE IN MOTION
            </span>
            <div className="w-4 h-8 sm:w-5 sm:h-9 rounded-full border-2 border-[#eebe87]/70 flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm">
              <div className="w-1 sm:w-1.5 h-2 sm:h-2.5 bg-[#eebe87] rounded-full animate-bounce"></div>
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#9c8e82] tracking-widest">
              FRAME {String(currentFrameNumber).padStart(3, '0')} / 181
            </span>
          </div>
        </div>

        {/* Mid-playback subtle scrub bar indicator */}
        <div
          className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-12 lg:right-12 z-30 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: scrollProgress > 0.05 && scrollProgress < 0.70 ? 0.7 : 0,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-[9px] sm:text-[10px] text-[#eebe87] tracking-wider font-semibold">
              00:{String(currentFrameNumber).padStart(3, '0')}
            </span>
            <div className="flex-1 h-0.5 bg-[#2a2a2a] relative overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#eebe87] transition-all duration-75"
                style={{ width: `${Math.min(100, (scrollProgress / 0.70) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#9c8e82] tracking-wider">
              181 FPS
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHASE 2: HERO TEXT CLUSTER & TELEMETRY STRIP                  */}
        {/* ============================================================== */}
        <div
          className="relative z-20 max-w-7xl w-full h-full mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-8 pointer-events-none"
        >
          {/* Main Grid: On desktop Left is reserved for docked video; Right holds text.
              On mobile/tablet: text appears below docked video with adaptive spacing. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-1">
            
            {/* Left Column Spacer on desktop (matches docked video footprint) */}
            <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />

            {/* Right Column (or Mobile Stack): Monumental Hero Typography */}
            <div
              className="lg:col-span-7 space-y-4 sm:space-y-6 pt-2 lg:pt-0"
              style={{
                marginTop: !isDesktop && t > 0.1 ? `${Math.round((dockHeight + 20) * t)}px` : '0px',
                opacity: t,
                transform: `translateX(${(1 - t) * (isDesktop ? 60 : 0)}px) translateY(${(1 - t) * (isDesktop ? 0 : 30)}px)`,
                pointerEvents: t > 0.7 ? 'auto' : 'none',
                transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
              }}
            >
              {/* Bronze Kicker Metadata */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#b58a58] inline-block animate-pulse" />
                <p className="font-label-lg text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-[#eebe87] uppercase font-semibold">
                  EST. 2018 // HIGH-PERFORMANCE SANCTUARY
                </p>
              </div>

              {/* Monumental Headline */}
              <div>
                <h1 className="font-display-xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase text-[#e5e2e1] tracking-tight leading-[0.92] mb-3 sm:mb-6 font-bold">
                  BUILT THROUGH<br />
                  <span className="text-[#b58a58] tracking-wider">DISCIPLINE.</span>
                </h1>
                <p className="font-body-lg text-xs sm:text-base lg:text-lg text-[#d3c4b6] max-w-xl font-light tracking-wide mb-5 sm:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  Train with purpose. Build strength. Become harder to stop. Architectural strength culture engineered for uncompromised physiological mastery and lifelong athletic durability.
                </p>
              </div>

              {/* Action Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <button
                  onClick={() => onOpenIntake('membership')}
                  className="inline-flex items-center justify-center bg-[#b58a58] hover:bg-[#eebe87] text-[#402500] font-label-lg text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-200 font-bold shadow-lg hover:shadow-[#eebe87]/20 active:scale-95"
                >
                  START YOUR JOURNEY
                  <span className="material-symbols-outlined ml-2 text-[16px] sm:text-[18px]">north_east</span>
                </button>
                <a
                  href="#facility"
                  className="inline-flex items-center justify-center bg-transparent hover:bg-[#2a2a2a] text-[#e5e2e1] hover:text-[#eebe87] font-label-lg text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 border border-[#4f453a] hover:border-[#b58a58] transition-all duration-200 font-medium"
                >
                  EXPLORE THE FACILITY
                  <span className="material-symbols-outlined ml-2 text-[16px] sm:text-[18px]">arrow_downward</span>
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* TELEMETRY STATS STRIP (Slides up smoothly)                    */}
          {/* ============================================================== */}
          <div
            className="w-full bg-[#1c1b1b]/90 backdrop-blur-md border border-[#2a2a2a] mt-3 sm:mt-6 pointer-events-auto"
            style={{
              opacity: t,
              transform: `translateY(${(1 - t) * 30}px)`,
              transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            }}
          >
            <div className="px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
              <div className="flex flex-col border-l border-[#4f453a]/60 pl-2.5 sm:pl-4 group hover:border-[#eebe87] transition-colors">
                <span className="font-headline-lg text-base sm:text-xl lg:text-2xl uppercase text-[#e5e2e1] font-semibold tracking-wider">
                  12,000 SQ FT
                </span>
                <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#9c8e82] tracking-widest mt-0.5">
                  Architectural Facility
                </span>
              </div>
              <div className="flex flex-col border-l border-[#4f453a]/60 pl-2.5 sm:pl-4 group hover:border-[#eebe87] transition-colors">
                <span className="font-headline-lg text-base sm:text-xl lg:text-2xl uppercase text-[#eebe87] font-semibold tracking-wider">
                  1 : 4
                </span>
                <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#9c8e82] tracking-widest mt-0.5">
                  Coach to Athlete Ratio
                </span>
              </div>
              <div className="flex flex-col border-l border-[#4f453a]/60 pl-2.5 sm:pl-4 group hover:border-[#eebe87] transition-colors">
                <span className="font-headline-lg text-base sm:text-xl lg:text-2xl uppercase text-[#e5e2e1] font-semibold tracking-wider">
                  100%
                </span>
                <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#9c8e82] tracking-widest mt-0.5">
                  Calibrated Equipment
                </span>
              </div>
              <div className="flex flex-col border-l border-[#4f453a]/60 pl-2.5 sm:pl-4 group hover:border-[#eebe87] transition-colors">
                <span className="font-headline-lg text-base sm:text-xl lg:text-2xl uppercase text-[#eebe87] font-semibold tracking-wider">
                  24 / 7
                </span>
                <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#9c8e82] tracking-widest mt-0.5">
                  Biometric Keycard Access
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
