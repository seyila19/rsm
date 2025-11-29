"use client";

import React, { useState } from "react";

type Phase = "intro" | "map" | "planet";

export default function SpaceJourneyPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [activePlanet, setActivePlanet] = useState(0);

  const labels = ["Discovery", "Creativity", "Iteration"];

  const handleBegin = () => setPhase("map");

  const handleOpenPlanet = (index: number) => {
    setActivePlanet(index);
    setPhase("planet");
  };

  const handleBackToMap = () => {
    setPhase("map");
  };

  const handleNextPlanetFromMap = () => {
    setActivePlanet((prev) => (prev + 1) % 3);
  };

  const handlePrevPlanetFromMap = () => {
    setActivePlanet((prev) => (prev + 2) % 3); // move left in a 3 planet loop
  };

  const handleNextFromPlanet = () => {
    setActivePlanet((prev) => (prev + 1) % 3);
    setPhase("map");
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-50">
        {/* GLOBAL BACKGROUND */}
        <div
          className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,#020617,transparent_60%),radial-gradient(circle_at_bottom,#020617,transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-[-30%] star-layer-1" />
          <div className="absolute inset-[-30%] star-layer-2" />
          <div className="absolute inset-[-30%] star-layer-3" />
          <TwinkleStars />
          <BrightStar top="12%" left="18%" size={5} />
          <BrightStar top="30%" left="72%" size={4} />
          <BrightStar top="54%" left="26%" size={4} />
          <BrightStar top="78%" left="80%" size={5} />
          <BrightStar top="42%" left="88%" size={4} />
          <div className="absolute -left-32 top-20 h-56 w-56 rounded-full bg-gradient-to-br from-sky-500 via-sky-300 to-indigo-800 opacity-80 blur-[0.5px] shadow-[0_0_70px_rgba(56,189,248,0.85)]" />
          <div className="absolute -right-28 top-40 h-44 w-44 rounded-full bg-gradient-to-br from-fuchsia-400 via-violet-500 to-indigo-900 opacity-80 blur-[0.5px] shadow-[0_0_70px_rgba(217,70,239,0.9)]" />
          <div className="absolute left-[6%] bottom-6 h-36 w-36 rounded-full bg-gradient-to-br from-amber-300 via-orange-500 to-rose-700 opacity-85 blur-[0.4px] shadow-[0_0_60px_rgba(249,115,22,0.9)]" />
          <div className="absolute right-[4%] bottom-[-3rem] h-44 w-44 ring-planet" />
          <div className="shooting shooting-1" />
          <div className="shooting shooting-2" />
          <div className="shooting shooting-3" />
        </div>

        {/* MAIN */}
        <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-10 pt-10">
          {/* course badge */}
          <div className="pointer-events-none absolute top-4 left-1/2 z-0 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/80 px-4 py-1 text-[0.7rem] text-slate-300/90 shadow-[0_0_30px_rgba(15,23,42,0.9)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <span className="font-semibold tracking-[0.2em] text-slate-200">
              RSM359 FINAL
            </span>
          </div>

          {phase === "intro" && <IntroScreen onStart={handleBegin} />}

          {phase === "map" && (
            <SolarMapScreen
              activePlanet={activePlanet}
              labels={labels}
              onSelectPlanet={handleOpenPlanet}
              onPrev={handlePrevPlanetFromMap}
              onNext={handleNextPlanetFromMap}
            />
          )}

          {phase === "planet" && (
            <PlanetDetailScreen
              activePlanet={activePlanet}
              labels={labels}
              onBack={handleBackToMap}
              onNext={handleNextFromPlanet}
            />
          )}
        </main>
      </div>

      {/* CUSTOM CSS */}
      <style jsx global>{`
        .star-layer-1,
        .star-layer-2,
        .star-layer-3 {
          background-repeat: repeat;
          background-size: 1000px 1000px;
        }
        .star-layer-1 {
          background-image: radial-gradient(
              2px 2px at 20% 30%,
              rgba(255, 255, 255, 0.6) 0,
              transparent 55%
            ),
            radial-gradient(
              1px 1px at 80% 60%,
              rgba(255, 255, 255, 0.4) 0,
              transparent 55%
            ),
            radial-gradient(
              1px 1px at 40% 80%,
              rgba(255, 255, 255, 0.3) 0,
              transparent 55%
            );
          animation: space-drift-1 140s linear infinite;
          opacity: 0.9;
        }
        .star-layer-2 {
          background-image: radial-gradient(
              2px 2px at 10% 10%,
              rgba(148, 163, 184, 0.8) 0,
              transparent 55%
            ),
            radial-gradient(
              2px 2px at 70% 40%,
              rgba(125, 211, 252, 0.9) 0,
              transparent 55%
            ),
            radial-gradient(
              1px 1px at 30% 90%,
              rgba(96, 165, 250, 0.7) 0,
              transparent 55%
            );
          animation: space-drift-2 200s linear infinite;
          opacity: 0.7;
        }
        .star-layer-3 {
          background-image: radial-gradient(
              3px 3px at 50% 50%,
              rgba(248, 250, 252, 0.9) 0,
              transparent 60%
            ),
            radial-gradient(
              2px 2px at 30% 20%,
              rgba(190, 242, 100, 0.7) 0,
              transparent 60%
            );
          animation: space-drift-3 260s linear infinite;
          opacity: 0.6;
        }

        .twinkle-star {
          position: absolute;
          border-radius: 9999px;
          background: #e5f0ff;
          box-shadow: 0 0 10px rgba(248, 250, 252, 0.9);
          opacity: 0.5;
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        .bright-star {
          position: absolute;
          border-radius: 9999px;
          background: #f9fbff;
          box-shadow: 0 0 16px rgba(248, 250, 252, 0.95);
        }

        .ring-planet {
          position: relative;
          border-radius: 9999px;
          background: radial-gradient(
            circle at 30% 20%,
            #f1f5f9 0,
            #a5b4fc 30%,
            #020617 90%
          );
          box-shadow: 0 0 70px rgba(129, 140, 248, 0.9);
        }
        .ring-planet::before {
          content: "";
          position: absolute;
          inset: 40% -11px;
          border-radius: 9999px;
          border: 2px solid rgba(148, 163, 184, 0.85);
          transform: rotate(-22deg);
          opacity: 0.95;
        }

        .intro-planet-core {
          background: radial-gradient(
              circle at 30% 20%,
              #e5e7eb 0,
              #22d3ee 25%,
              transparent 60%
            ),
            radial-gradient(circle at 70% 90%, #6366f1 0, #020617 65%);
          box-shadow: 0 0 70px rgba(56, 189, 248, 0.95),
            0 0 140px rgba(37, 99, 235, 0.9);
        }

        .journey-planet-1,
        .journey-planet-2,
        .journey-planet-3 {
          position: absolute;
          border-radius: 9999px;
          transition: transform 350ms ease, box-shadow 350ms ease;
        }

        .journey-planet-1 {
          left: 10%;
          top: 55%;
          width: 120px;
          height: 120px;
          background: radial-gradient(
              circle at 30% 20%,
              #fee2e2 0,
              #fb7185 40%,
              #020617 90%
            );
          box-shadow: 0 0 40px rgba(248, 113, 113, 0.9);
          animation: planet-float 8s ease-in-out infinite;
        }

        .journey-planet-2 {
          left: 50%;
          top: 35%;
          width: 150px;
          height: 150px;
          transform: translateX(-50%);
          background: radial-gradient(
              circle at 30% 20%,
              #e5e7eb 0,
              #22d3ee 25%,
              transparent 60%
            ),
            radial-gradient(circle at 70% 90%, #6366f1 0, #020617 65%);
          box-shadow: 0 0 60px rgba(56, 189, 248, 0.95),
            0 0 120px rgba(37, 99, 235, 0.9);
          animation: planet-float 9s ease-in-out infinite;
        }

        .journey-planet-3 {
          right: 10%;
          top: 55%;
          width: 110px;
          height: 110px;
          background: radial-gradient(
              circle at 30% 20%,
              #fef9c3 0,
              #a3e635 40%,
              #020617 90%
            );
          box-shadow: 0 0 40px rgba(132, 204, 22, 0.9);
          animation: planet-float 7.5s ease-in-out infinite;
        }

        .journey-planet-1:hover,
        .journey-planet-2:hover,
        .journey-planet-3:hover {
          transform: translate3d(0, -4px, 0) scale(1.03);
          box-shadow: 0 0 60px rgba(56, 189, 248, 0.9);
        }

        .journey-planet-2::before {
          content: "";
          position: absolute;
          inset: 40% -10px;
          border-radius: 9999px;
          border: 2px solid rgba(148, 163, 184, 0.8);
          transform: rotate(-18deg);
          opacity: 0.9;
        }

        .journey-path {
          position: absolute;
          border-radius: 9999px;
          border: 1px dashed rgba(148, 163, 184, 0.6);
          overflow: hidden;
        }

        .journey-path-1 {
          left: 15%;
          top: 47%;
          width: 40%;
          height: 36%;
        }

        .journey-path-2 {
          right: 15%;
          top: 47%;
          width: 40%;
          height: 36%;
        }

        .journey-orbit {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          pointer-events: none;
          background: radial-gradient(
            circle at 0% 50%,
            rgba(56, 189, 248, 0.9),
            transparent 55%
          );
          opacity: 0.45;
          mix-blend-mode: screen;
          animation: orbit-flow 8s linear infinite;
        }

        .rocket-bob-intro {
          animation: rocket-bob 2.6s ease-in-out infinite;
        }
        .rocket-bob-journey {
          animation: rocket-bob-journey 3.2s ease-in-out infinite;
        }
        .flame-flicker {
          animation: flame-flicker 0.5s ease-in-out infinite alternate;
        }

        .shooting {
          position: absolute;
          width: 180px;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(248, 250, 252, 0.95),
            transparent
          );
          opacity: 0;
          filter: drop-shadow(0 0 10px rgba(248, 250, 252, 0.95));
        }
        .shooting-1 {
          top: 18%;
          left: -25%;
          animation: shooting-star 4.2s linear infinite;
        }
        .shooting-2 {
          top: 48%;
          left: -35%;
          animation: shooting-star 5.1s linear infinite;
          animation-delay: 1.3s;
        }
        .shooting-3 {
          top: 74%;
          left: -20%;
          animation: shooting-star 6.1s linear infinite;
          animation-delay: 2.4s;
        }

        .ping-soft {
          animation: ping-soft 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes orbit-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes space-drift-1 {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-240px, -180px, 0);
          }
        }
        @keyframes space-drift-2 {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(260px, 190px, 0);
          }
        }
        @keyframes space-drift-3 {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-200px, 260px, 0);
          }
        }

        @keyframes twinkle {
          0% {
            opacity: 0.2;
            transform: scale(0.9);
          }
          30% {
            opacity: 0.8;
            transform: scale(1.05);
          }
          60% {
            opacity: 0.35;
            transform: scale(0.95);
          }
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
        }

        @keyframes planet-float {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -6px, 0) scale(1.03);
          }
        }

        @keyframes rocket-bob {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -10px);
          }
        }

        @keyframes rocket-bob-journey {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -6px);
          }
        }

        @keyframes flame-flicker {
          0% {
            transform: scaleY(0.9);
            opacity: 0.65;
          }
          100% {
            transform: scaleY(1.15);
            opacity: 1;
          }
        }

        @keyframes orbit-flow {
          0% {
            transform: translateX(-40%);
          }
          100% {
            transform: translateX(60%);
          }
        }

        @keyframes shooting-star {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          45% {
            transform: translate3d(150vw, 60px, 0);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes ping-soft {
          0% {
            transform: scale(0.5);
            opacity: 0.85;
          }
          80% {
            transform: scale(1.4);
            opacity: 0;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

/* ---------- INTRO SCREEN ---------- */

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="flex w-full max-w-4xl flex-col items-center gap-10 text-center">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/80 px-3 py-1 text-[0.7rem] text-slate-300/90">
          <span className="relative h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]">
            <span className="ping-soft absolute inset-[-5px] rounded-full border border-sky-400/60 opacity-0" />
          </span>
          <span>RSM359 final reflection</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          A quiet{" "}
          <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
            orbit
          </span>
        </h1>
        <p className="text-[0.85rem] text-slate-300/85">
          Click begin to see my journey through RSM359.
        </p>
      </div>

      <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
        <div className="absolute inset-[10%] rounded-full border border-sky-500/25" />
        <div className="absolute inset-[22%] rounded-full border border-dashed border-sky-500/30" />
        <div className="intro-planet-core absolute inset-[22%] rounded-full" />
        <div className="absolute inset-[30%] rounded-full border border-dashed border-slate-700/80 opacity-80" />
        <div className="absolute inset-[-16%] animate-[orbit-slow_26s_linear_infinite]">
          <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-200 via-sky-400 to-slate-900 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
        </div>
        <div className="rocket-bob-intro absolute left-1/2 bottom-[18%] -translate-x-1/2">
          <RocketIcon />
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-sky-400/80 bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 px-6 py-2.5 text-[0.9rem] font-semibold text-slate-950 shadow-[0_14px_30px_rgba(15,23,42,0.9),0_0_18px_rgba(56,189,248,0.9)] transition hover:-translate-y-px hover:shadow-[0_18px_40px_rgba(15,23,42,1),0_0_22px_rgba(56,189,248,1)]"
      >
        Begin reflection
        <span className="text-base">➜</span>
      </button>
    </section>
  );
}

/* ---------- SOLAR MAP SCREEN ---------- */

type SolarMapProps = {
  activePlanet: number;
  labels: string[];
  onSelectPlanet: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

function SolarMapScreen({
  activePlanet,
  labels,
  onSelectPlanet,
  onPrev,
  onNext,
}: SolarMapProps) {
  const positions = [
    { left: "10%", top: "50%" },
    { left: "50%", top: "32%" },
    { left: "90%", top: "50%" },
  ];
  const activePos = positions[activePlanet];

  return (
    <section className="flex w-full max-w-6xl flex-col gap-8">
      <div className="mx-auto max-w-xl space-y-2 text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-400/80">
          RSM359 final reflection
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Three planets, three ways I changed
        </h2>
        <p className="text-[0.85rem] text-slate-300/85">
          This map is my RSM359 journey. Each planet holds a different part of
          what I learned. I can nudge the rocket with the arrows or land
          directly on a planet.
        </p>
      </div>

      <div className="relative mx-auto h-[320px] w-full max-w-5xl">
        <div className="journey-path journey-path-1">
          <div className="journey-orbit" />
        </div>
        <div className="journey-path journey-path-2">
          <div className="journey-orbit" />
        </div>

        {/* planets */}
        <button
          type="button"
          aria-label="Discovery takeaway"
          className="journey-planet-1 cursor-pointer outline-none ring-0"
          onClick={() => onSelectPlanet(0)}
        />
        <button
          type="button"
          aria-label="Creativity takeaway"
          className="journey-planet-2 cursor-pointer outline-none ring-0"
          onClick={() => onSelectPlanet(1)}
        />
        <button
          type="button"
          aria-label="Iteration takeaway"
          className="journey-planet-3 cursor-pointer outline-none ring-0"
          onClick={() => onSelectPlanet(2)}
        />

        {/* labels under planets */}
        <div className="pointer-events-none absolute left-[10%] top-[72%] -translate-x-1/2 text-[0.8rem] text-slate-200/90">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-600/80 bg-slate-950/85 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <span className="font-medium">Discovery</span>
            <span className="text-slate-400/85">Earning speed</span>
          </div>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-[23%] -translate-x-1/2 text-[0.8rem] text-slate-200/90">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-600/80 bg-slate-950/85 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <span className="font-medium">Creativity</span>
            <span className="text-slate-400/85">
              Seeing the familiar differently
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute right-[10%] top-[72%] translate-x-1/2 text-[0.8rem] text-slate-200/90">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-600/80 bg-slate-950/85 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <span className="font-medium">Iteration</span>
            <span className="text-slate-400/85">Living with critique</span>
          </div>
        </div>

        {/* rocket */}
        <div
          className="rocket-bob-journey absolute transition-all duration-900 ease-in-out"
          style={{
            left: activePos.left,
            top: activePos.top,
          }}
        >
          <RocketIcon />
        </div>
      </div>

      {/* controls: arrows + single landing button */}
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 text-[0.8rem]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Move rocket to previous planet"
            onClick={onPrev}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-600/80 bg-slate-950/80 text-sm text-slate-200 transition hover:border-sky-400/80 hover:text-sky-100"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Move rocket to next planet"
            onClick={onNext}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-600/80 bg-slate-950/80 text-sm text-slate-200 transition hover:border-sky-400/80 hover:text-sky-100"
          >
            →
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSelectPlanet(activePlanet)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-sky-400/90 bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 px-5 py-2 text-[0.8rem] font-semibold text-slate-950 shadow-[0_0_22px_rgba(56,189,248,0.9)] transition hover:-translate-y-px hover:shadow-[0_0_32px_rgba(56,189,248,1)]"
        >
          Land and open my {labels[activePlanet]} reflection
        </button>
      </div>
    </section>
  );
}

/* ---------- PLANET DETAIL SCREEN ---------- */

type PlanetDetailProps = {
  activePlanet: number;
  labels: string[];
  onBack: () => void;
  onNext: () => void;
};

function PlanetDetailScreen({
  activePlanet,
  labels,
  onBack,
  onNext,
}: PlanetDetailProps) {
  const progressPercent = ((activePlanet + 1) / 3) * 100;

  return (
    <section className="flex w-full max-w-6xl flex-col gap-8">
      <div className="mx-auto max-w-xl space-y-2 text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-400/80">
          Planet {activePlanet + 1} of 3
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Landing on{" "}
          <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
            {labels[activePlanet]}
          </span>
        </h2>
        <p className="text-[0.85rem] text-slate-300/85">
          A closer look at what changed for me on this stop in the RSM359
          journey.
        </p>
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-4 md:flex-row md:items-stretch">
        <div className="relative mx-auto h-[260px] w-[260px] flex-shrink-0 sm:h-[320px] sm:w-[320px]">
          <div className="absolute inset-[10%] rounded-full border border-sky-500/25" />
          <div className="absolute inset-[22%] rounded-full border border-dashed border-sky-500/30" />
          <div
            className={`absolute inset-[22%] rounded-full ${
              activePlanet === 0
                ? "bg-gradient-to-br from-rose-300 via-rose-500 to-slate-900 shadow-[0_0_70px_rgba(248,113,113,0.9)]"
                : activePlanet === 1
                ? "bg-gradient-to-br from-sky-200 via-sky-500 to-indigo-900 shadow-[0_0_80px_rgba(56,189,248,0.95)]"
                : "bg-gradient-to-br from-lime-200 via-lime-500 to-emerald-900 shadow-[0_0_70px_rgba(132,204,22,0.95)]"
            }`}
          />
          {activePlanet === 1 && (
            <div className="absolute inset-[35%] rounded-full border border-slate-200/70 opacity-80" />
          )}
          <div className="absolute left-[65%] top-[60%] translate-y-[-50%]">
            <AstronautIcon />
          </div>
        </div>

        <div className="relative flex-1 rounded-3xl border border-slate-700/80 bg-slate-950/85 p-5 text-sm leading-relaxed text-slate-200 shadow-[0_18px_50px_rgba(15,23,42,0.9)] sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-[0.7rem] text-slate-400">
            <span className="uppercase tracking-[0.18em]">
              Takeaway {activePlanet + 1} of 3
            </span>
            <div className="h-1.5 flex-1 rounded-full bg-slate-800">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {activePlanet === 0 && <TakeawayOneCopy />}
          {activePlanet === 1 && <TakeawayTwoCopy />}
          {activePlanet === 2 && <TakeawayThreeCopy />}
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-[0.8rem]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-600/80 bg-slate-950/80 px-4 py-1.5 text-slate-200/90 transition hover:border-sky-400/80 hover:text-sky-100"
        >
          Back to orbit
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-sky-400/80 bg-slate-950/90 px-4 py-1.5 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.8)] transition hover:border-sky-300 hover:text-sky-50"
        >
          Next landing
          <span className="text-xs opacity-80">
            ({labels[(activePlanet + 1) % 3]})
          </span>
        </button>
      </div>
    </section>
  );
}

/* ---------- COPY BLOCKS ---------- */

function TakeawayOneCopy() {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-400">
        TAKEAWAY 1 · EARNING SPEED THROUGH DISCOVERY
      </h3>
      <p>
        This project made me see how quickly I move toward answers when I work
        in a team. In the first weeks of RSM359 I was already pushing solutions
        and trying to shape a direction before we had really used the tools from
        class. Assumption dumps, empathy maps, analogous thinking, and early
        interviews were there on the slide, but in my head they were something
        to clear so we could get to the idea.
      </p>
      <p>
        When the first set of ideas did not resonate with the team or with the
        user, I had to go back into those methods for real. Revisiting our
        assumptions showed how much of my thinking came from my own experience
        rather than from the people living the problem. Empathy mapping forced
        me to sit in their motivations and frustrations, not just my guesses.
        Analogous cases opened patterns I would not have found on my own. Once I
        committed to that discovery work, stronger ideas started to feel less
        forced and more grounded in what users actually needed.
      </p>
      <p>
        The shift for me is simple but important. I still value speed and idea
        generation, but I no longer see discovery as wasted time. It is the work
        that earns the right to move fast later. In future projects I want to
        treat tools like assumption dumps, empathy maps, and structured
        interviews as non negotiable gates before I lock in a direction. That is
        how I keep my strengths from turning into shortcuts.
      </p>
    </div>
  );
}

function TakeawayTwoCopy() {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-400">
        TAKEAWAY 2 · CREATIVITY AS SEEING THE FAMILIAR DIFFERENTLY
      </h3>
      <p>
        The creativity self tests showed me how much familiarity can cage my
        thinking. With the teddy bear exercise, my first ideas stayed close to
        what the object already was. I thought about comfort, softness,
        childhood. Everything I wrote down was tied to its original identity as
        a toy. It felt almost wrong to imagine it as anything else.
      </p>
      <p>
        When I forced myself to let go of that identity and look only at shape,
        texture, and size, new uses finally started to appear. The second self
        test reinforced this. Working under tight constraints and allowing only
        one drawing per prompt made me slow down and push past the obvious first
        answer. Instead of filling the page quickly, I spent more time with one
        idea and tried to make it more precise and unusual. Seeing how different
        my classmates outcomes were from the same starting point drove home the
        point that it is not the prompt that limits creativity, it is how
        willing we are to see it differently.
      </p>
      <p>
        As a future leader, that changes how I think about creativity. It is
        less about waiting for a blank canvas and more about re framing what is
        already in front of me. I want to treat familiar processes, products, or
        objects the way we treated that teddy bear and those constrained
        drawings. Ask what else they could be doing for us, on purpose. That is
        a practical way to build originality into my everyday work, not just
        into special assignments.
      </p>
    </div>
  );
}

function TakeawayThreeCopy() {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-400">
        TAKEAWAY 3 · ITERATION AND CRITIQUE AS THE PATH, NOT THE THREAT
      </h3>
      <p>
        Before RSM359 I treated feedback and iteration as something that
        happened after the real work. I liked to show things once they were
        mostly polished. Early prototypes felt like an exposure of what I did
        not know yet. The way we talked about creativity in class challenged
        that. Hearing about practices like the Braintrust and the idea of going
        from suck to non suck made it clear that even the best teams expect
        early versions to be rough.
      </p>
      <p>
        The prototyping we did turned that idea into lived experience. Simple
        sketches, storyboards, and low fidelity mockups did more than visualize
        the idea. They exposed where the team was not aligned and where our
        understanding of the user was thin. Each round of critique changed the
        prototype, but it also sometimes forced us back to the problem statement
        when feedback showed we were solving the wrong thing. Iteration stopped
        being an optional extra and started to feel like the only honest way to
        get to a strong solution.
      </p>
      <p>
        The growth for me is in my posture toward unfinished work. I am less
        attached to being right on the first pass and more willing to put half
        formed ideas on the table so they can be tested, challenged, and
        improved. When I think about leading projects in the future, I want to
        design regular critique and quick prototyping into the process, so my
        need for polish does not quietly block better versions of the idea from
        emerging.
      </p>
    </div>
  );
}

/* ---------- SHARED VISUAL PIECES ---------- */

function BrightStar({
  top,
  left,
  size,
}: {
  top: string;
  left: string;
  size: number;
}) {
  return (
    <div
      className="bright-star"
      style={{ top, left, width: size, height: size }}
    />
  );
}

function RocketIcon() {
  return (
    <div className="relative flex -translate-x-1/2 flex-col items-center gap-1">
      <div className="relative h-14 w-6 rounded-full border border-slate-300/80 bg-gradient-to-b from-slate-100 via-sky-400 to-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.95)]">
        <div className="absolute -top-4 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-slate-200 drop-shadow-[0_0_10px_rgba(148,163,184,0.9)]" />
        <div className="absolute left-1/2 top-3 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-slate-300/70 bg-[radial-gradient(circle_at_30%_20%,#e0f2fe_0,#38bdf8_50%,#0f172a_100%)]" />
        <div className="absolute bottom-2 -left-3 h-3 w-3 -rotate-12 rounded-md bg-slate-900" />
        <div className="absolute bottom-2 -right-3 h-3 w-3 rotate-12 rounded-md bg-slate-900" />
      </div>
      <div className="flame-flicker h-7 w-3 rounded-full bg-gradient-to-b from-amber-300 via-orange-500 to-transparent blur-[1px]" />
    </div>
  );
}

function AstronautIcon() {
  return (
    <div className="relative flex flex-col items-center gap-1">
      <div className="relative h-10 w-8 rounded-2xl bg-slate-900/80 border border-slate-500/80 shadow-[0_0_16px_rgba(15,23,42,0.9)]">
        <div className="absolute -top-5 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full bg-gradient-to-b from-slate-100 via-slate-300 to-slate-700 border border-slate-200 shadow-[0_0_14px_rgba(148,163,184,0.9)]">
          <div className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_30%_20%,#e0f2fe_0,#38bdf8_45%,#020617_100%)]" />
        </div>
        <div className="absolute bottom-1 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full bg-slate-700" />
      </div>
      <div className="flex gap-2">
        <div className="h-2 w-4 rounded-full bg-slate-800" />
        <div className="h-2 w-4 rounded-full bg-slate-800" />
      </div>
    </div>
  );
}

function TwinkleStars() {
  const count = 180;
  const stars = Array.from({ length: count }, (_, i) => {
    const top = ((i * 17) % 100) + (i % 3) * 0.6;
    const left = ((i * 29) % 100) + (i % 5) * 0.4;
    const size = (i % 3) + 1;
    const duration = 3 + (i % 5);
    const delay = (i % 10) * 0.4;
    return { id: i, top: `${top}%`, left: `${left}%`, size, duration, delay };
  });

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="twinkle-star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}
