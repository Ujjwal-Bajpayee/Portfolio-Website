"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Pro Comet Cursor
 * - Main glass dot + velocity-based comet body (6 segments)
 * - Professional, minimal, high-perf
 */
const CometCursor: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const segmentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // bail on touch-like pointers or reduced motion
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (hasCoarse) return; // don’t override system cursor on touch

    const ctx = gsap.context(() => {
      const head = headRef.current!;
      const segments = segmentsRef.current!;
      const root = rootRef.current!;

      // ensure pointer-events pass through
      gsap.set([root, head, segments], { pointerEvents: "none" });

      // position anchors
      gsap.set([head, ...segments], {
        xPercent: -50,
        yPercent: -50,
        force3D: true,
      });

      // quick setters
      const setHeadX = gsap.quickSetter(head, "x", "px");
      const setHeadY = gsap.quickSetter(head, "y", "px");
      const setHeadScaleX = gsap.quickSetter(head, "scaleX");
      const setHeadScaleY = gsap.quickSetter(head, "scaleY");
      const setHeadRotate = gsap.quickSetter(head, "rotate");
      const setHeadOpacity = gsap.quickSetter(head, "opacity");

      const segSetters = segments.map((el) => ({
        x: gsap.quickSetter(el, "x", "px"),
        y: gsap.quickSetter(el, "y", "px"),
        rot: gsap.quickSetter(el, "rotate"),
        scx: gsap.quickSetter(el, "scaleX"),
        scy: gsap.quickSetter(el, "scaleY"),
        op: gsap.quickSetter(el, "opacity"),
      }));

      // state
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const lerpPos = { ...pos };
      let vx = 0,
        vy = 0; // velocity
      let lastX = pos.x,
        lastY = pos.y;
      const trail: { x: number; y: number }[] = Array(segments.length)
        .fill(0)
        .map(() => ({ x: pos.x, y: pos.y }));

      const onMove = (e: PointerEvent) => {
        pos.x = e.clientX;
        pos.y = e.clientY;
      };

      const hoverTargets =
        "a, button, input, select, textarea, [role='button'], [data-cursor='interactive']";
      let hovering = false;

      const isInteractive = (el: Element | null): boolean => {
        if (!el) return false;
        if (el.matches?.(hoverTargets)) return true;
        return isInteractive(el.parentElement);
      };

      const onOver = (e: PointerEvent) => {
        const target = e.target as Element;
        const active = isInteractive(target);
        if (active === hovering) return;
        hovering = active;
        if (hovering) {
          gsap.to(head, { scale: 1.2, duration: 0.18, ease: "power2.out" });
          root.style.setProperty("--cc-accent", "var(--cc-accent-hover)");
        } else {
          gsap.to(head, { scale: 1, duration: 0.18, ease: "power2.out" });
          root.style.setProperty("--cc-accent", "var(--cc-accent-base)");
        }
      };

      const onDown = () =>
        gsap.to(head, { scale: 0.9, duration: 0.12, ease: "power2.out" });
      const onUp = () =>
        gsap.to(head, {
          scale: hovering ? 1.2 : 1,
          duration: 0.12,
          ease: "power2.out",
        });

      // animate loop with GSAP ticker (stable vs RAF drift)
      const stiffness = 0.22; // follow speed
      const damping = 0.14; // trail smoothing
      const maxStretch = 1.35;

      const tick = () => {
        // compute velocity
        vx = pos.x - lastX;
        vy = pos.y - lastY;
        lastX = pos.x;
        lastY = pos.y;

        // ease follower
        lerpPos.x += (pos.x - lerpPos.x) * stiffness;
        lerpPos.y += (pos.y - lerpPos.y) * stiffness;

        // head transform
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        const speed = Math.hypot(vx, vy);
        const stretch = Math.min(1 + speed * 0.02, maxStretch);
        const squash = 1 / stretch;

        setHeadX(lerpPos.x);
        setHeadY(lerpPos.y);
        setHeadRotate(angle);
        setHeadScaleX(stretch);
        setHeadScaleY(squash);
        setHeadOpacity(1);

        // trail positions: lead with head, then ease each toward previous
        let prevX = lerpPos.x,
          prevY = lerpPos.y;
        for (let i = 0; i < trail.length; i++) {
          const t = trail[i];
          t.x += (prevX - t.x) * (damping - i * 0.012); // each segment lags more
          t.y += (prevY - t.y) * (damping - i * 0.012);
          prevX = t.x;
          prevY = t.y;

          const seg = segSetters[i];
          // subtle scaling/opacity falloff
          const p = (i + 1) / (trail.length + 1);
          const s = 1 + (stretch - 1) * (1 - p) * 0.7;
          const sy = 1 / s;
          const op = 0.35 * (1 - p);

          seg.x(t.x);
          seg.y(t.y);
          seg.rot(angle);
          seg.scx(s);
          seg.scy(sy);
          seg.op(op);
        }
      };

      const onVisibility = () =>
        document.hidden ? gsap.ticker.sleep() : gsap.ticker.wake();

      // init pos to center
      setHeadX(lerpPos.x);
      setHeadY(lerpPos.y);

      if (!reduceMotion) gsap.ticker.add(tick);

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerover", onOver, { passive: true });
      window.addEventListener("pointerout", onOver, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);

      // optional: hide native cursor (desktop only)
      // document.documentElement.style.cursor = "none";

      return () => {
        if (!reduceMotion) gsap.ticker.remove(tick);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerover", onOver);
        window.removeEventListener("pointerout", onOver);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        document.removeEventListener("visibilitychange", onVisibility);
        // document.documentElement.style.cursor = "";
      };
    });

    return () => ctx.revert();
  }, []);

  // Build 6 trail segments
  const setSegRef = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    if (!segmentsRef.current[i]) segmentsRef.current[i] = el;
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{
        // theming hooks
        // tweak these vars to fit your brand
        // Example (light): accent-base cyan, hover shifts slightly greener
        // Example (dark): raise alpha/blur a bit
        ["--cc-accent-base" as any]: "rgba(0, 200, 255, 0.9)",
        ["--cc-accent-hover" as any]: "rgba(80, 240, 200, 0.95)",
        ["--cc-glass" as any]: "rgba(255,255,255,0.12)",
        ["--cc-blur" as any]: "8px",
      }}
    >
      {/* Head (glassy, subtle glow) */}
      <div
        ref={headRef}
        className="absolute w-6 h-6 rounded-full"
        style={{
          left: 0,
          top: 0,
          background:
            "radial-gradient(circle at 30% 30%, var(--cc-accent, var(--cc-accent-base)) 0%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 70%)",
          boxShadow:
            "0 6px 20px rgba(0,0,0,0.16), 0 0 24px var(--cc-accent, var(--cc-accent-base))",
          backdropFilter: "blur(var(--cc-blur))",
          WebkitBackdropFilter: "blur(var(--cc-blur))",
          transformOrigin: "50% 50%",
          willChange: "transform, opacity",
          // dynamic accent via root style var
          ["--cc-accent" as any]: "var(--cc-accent-base)",
        }}
      />

      {/* Trail segments (capsules) */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => setSegRef(el, i)}
          className="absolute rounded-full"
          style={{
            left: 0,
            top: 0,
            width: `${18 - i * 2}px`,
            height: `${18 - i * 2}px`,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0) 80%)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
            filter: "saturate(110%)",
            transformOrigin: "50% 50%",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
};

export default CometCursor;
