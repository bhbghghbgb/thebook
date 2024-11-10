// CHUA DUOC

// using hook implementation of saltycrane/use-fit-text (https://github.com/saltycrane/use-fit-text/tree/39d540ad7eafde9ce8cb4335a023664c5023416b)
// borrowing some element processing logic of STRML/textFit (https://github.com/STRML/textFit/blob/7a1eed6db54a97798556eed3c57b2ce1f87dbab4/textFit.js)
// with some adjustments:
// - dumb down to only project requirement
// - can accept a list of fixed sont sizes to choose
// - rewritten to utilise both settimeout + requestanimationframe
// - can get dimensions to fit to from a function (in case of fitting remaining space in a flexbox, can obtain available height)
// - clone to another element to calculate to avoid layout thrashing
// - in pixel instead of percentage
// - resize observer is used on parent element
// dependencies:
// - use-resize-observer
// - react-timing-hooks
// - jquery
//
// original implementation v2.4.0
// import {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from "react";
// import ResizeObserver from "resize-observer-polyfill";

// export type TLogLevel = "debug" | "info" | "warn" | "error" | "none";

// export type TOptions = {
//   logLevel?: TLogLevel;
//   maxFontSize?: number;
//   minFontSize?: number;
//   onFinish?: (fontSize: number) => void;
//   onStart?: () => void;
//   resolution?: number;
// };

// const LOG_LEVEL: Record<TLogLevel, number> = {
//   debug: 10,
//   info: 20,
//   warn: 30,
//   error: 40,
//   none: 100,
// };

// // Suppress `useLayoutEffect` warning when rendering on the server
// // https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
// const useIsoLayoutEffect =
//   typeof window !== "undefined" &&
//   window.document &&
//   window.document.createElement
//     ? useLayoutEffect
//     : useEffect;

// const useFitText = ({
//   logLevel: logLevelOption = "info",
//   maxFontSize = 100,
//   minFontSize = 20,
//   onFinish,
//   onStart,
//   resolution = 5,
// }: TOptions = {}) => {
//   const logLevel = LOG_LEVEL[logLevelOption];

//   const initState = useCallback(() => {
//     return {
//       calcKey: 0,
//       fontSize: maxFontSize,
//       fontSizePrev: minFontSize,
//       fontSizeMax: maxFontSize,
//       fontSizeMin: minFontSize,
//     };
//   }, [maxFontSize, minFontSize]);

//   const ref = useRef<HTMLDivElement>(null);
//   const innerHtmlPrevRef = useRef<string>();
//   const isCalculatingRef = useRef(false);
//   const [state, setState] = useState(initState);
//   const { calcKey, fontSize, fontSizeMax, fontSizeMin, fontSizePrev } = state;

//   // Montior div size changes and recalculate on resize
//   let animationFrameId: number | null = null;
//   const [ro] = useState(
//     () =>
//       new ResizeObserver(() => {
//         animationFrameId = window.requestAnimationFrame(() => {
//           if (isCalculatingRef.current) {
//             return;
//           }
//           onStart && onStart();
//           isCalculatingRef.current = true;
//           // `calcKey` is used in the dependencies array of
//           // `useIsoLayoutEffect` below. It is incremented so that the font size
//           // will be recalculated even if the previous state didn't change (e.g.
//           // when the text fit initially).
//           setState({
//             ...initState(),
//             calcKey: calcKey + 1,
//           });
//         });
//       }),
//   );

//   useEffect(() => {
//     if (ref.current) {
//       ro.observe(ref.current);
//     }
//     return () => {
//       animationFrameId && window.cancelAnimationFrame(animationFrameId);
//       ro.disconnect();
//     };
//   }, [animationFrameId, ro]);

//   // Recalculate when the div contents change
//   const innerHtml = ref.current && ref.current.innerHTML;
//   useEffect(() => {
//     if (calcKey === 0 || isCalculatingRef.current) {
//       return;
//     }
//     if (innerHtml !== innerHtmlPrevRef.current) {
//       onStart && onStart();
//       setState({
//         ...initState(),
//         calcKey: calcKey + 1,
//       });
//     }
//     innerHtmlPrevRef.current = innerHtml;
//   }, [calcKey, initState, innerHtml, onStart]);

//   // Check overflow and resize font
//   useIsoLayoutEffect(() => {
//     // Don't start calculating font size until the `resizeKey` is incremented
//     // above in the `ResizeObserver` callback. This avoids an extra resize
//     // on initialization.
//     if (calcKey === 0) {
//       return;
//     }

//     const isWithinResolution = Math.abs(fontSize - fontSizePrev) <= resolution;
//     const isOverflow =
//       !!ref.current &&
//       (ref.current.scrollHeight > ref.current.offsetHeight ||
//         ref.current.scrollWidth > ref.current.offsetWidth);
//     const isFailed = isOverflow && fontSize === fontSizePrev;
//     const isAsc = fontSize > fontSizePrev;

//     // Return if the font size has been adjusted "enough" (change within `resolution`)
//     // reduce font size by one increment if it's overflowing.
//     if (isWithinResolution) {
//       if (isFailed) {
//         isCalculatingRef.current = false;
//         if (logLevel <= LOG_LEVEL.info) {
//           console.info(
//             `[use-fit-text] reached \`minFontSize = ${minFontSize}\` without fitting text`,
//           );
//         }
//       } else if (isOverflow) {
//         setState({
//           fontSize: isAsc ? fontSizePrev : fontSizeMin,
//           fontSizeMax,
//           fontSizeMin,
//           fontSizePrev,
//           calcKey,
//         });
//       } else {
//         isCalculatingRef.current = false;
//         onFinish && onFinish(fontSize);
//       }
//       return;
//     }

//     // Binary search to adjust font size
//     let delta: number;
//     let newMax = fontSizeMax;
//     let newMin = fontSizeMin;
//     if (isOverflow) {
//       delta = isAsc ? fontSizePrev - fontSize : fontSizeMin - fontSize;
//       newMax = Math.min(fontSizeMax, fontSize);
//     } else {
//       delta = isAsc ? fontSizeMax - fontSize : fontSizePrev - fontSize;
//       newMin = Math.max(fontSizeMin, fontSize);
//     }
//     setState({
//       calcKey,
//       fontSize: fontSize + delta / 2,
//       fontSizeMax: newMax,
//       fontSizeMin: newMin,
//       fontSizePrev: fontSize,
//     });
//   }, [
//     calcKey,
//     fontSize,
//     fontSizeMax,
//     fontSizeMin,
//     fontSizePrev,
//     onFinish,
//     ref,
//     resolution,
//   ]);

//   return { fontSize: `${fontSize}%`, ref };
// };

// export default useFitText;

import { useEffect, useRef } from "react";
import useResizeObserver from "use-resize-observer";
import { useDebounce, useAnimationFrame } from "react-timing-hooks";
import $ from "jquery";
export type TOptions = {
  fixedFontSizes?: number[];
  maxFontSize?: number;
  minFontSize?: number;
  resolution?: number;
  depthLimit?: number;
  getWidthFn?: () => string | number;
  getHeightFn?: () => string | number;
};

const useFitTextTuViet = ({
  // mangadex setup:     setup(e) {
  //   const t = ["1.5rem", "1.3125rem", "1rem", "0.875rem"]
  //   , u = ["4.5rem", "4rem", "3.5rem", "3rem", "2.5rem", "2rem", "1.75rem", ...t]
  //   , r = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (c => setTimeout(c, 1e3 / 60))
  //   , a = e
  //   , n = D(null)
  //   , o = {
  //     lock: !1,
  //     size: 0,
  //     lastSize: -1
  // }
  fixedFontSizes = [
    "4.5rem",
    "4rem",
    "3.5rem",
    "3rem",
    "2.5rem",
    "2rem",
    "1.75rem",
    "1.5rem",
    "1.3125rem",
    "1rem",
    "0.875rem",
  ].map(function (s) {
    return parseFloat(s) * 16;
  }),
  maxFontSize = 4.5 * 16,
  minFontSize = 0.875 * 16,
  resolution = 0.05 * 16,
  depthLimit = 5,
  getWidthFn,
  getHeightFn,
}: TOptions = {}) => {
  if (fixedFontSizes) {
    fixedFontSizes.sort((a, b) => a - b);
    maxFontSize = fixedFontSizes[fixedFontSizes.length - 1];
    minFontSize = fixedFontSizes[0];
  }

  const ref = useRef<HTMLDivElement>(null);
  const isCalculatingRef = useRef(false);
  const countRef = useRef(0);
  const raf = useAnimationFrame(() => {
    console.info("[use-fit-text-tuviet] animation");
    const origEl = ref.current;
    if (!origEl) return;
    countRef.current += 1;
    // Don't start calculating font size until the `resizeKey` is incremented
    // above in the `ResizeObserver` callback. This avoids an extra resize
    // on initialization.
    if (countRef.current < 2) return;
    if (isCalculatingRef.current) return;
    // acquire lock
    isCalculatingRef.current = true;
    // clone element
    const cloneEl = $(origEl).clone();
    // define how to get dimensions
    if (!getWidthFn) getWidthFn = () => origEl.offsetWidth;
    if (!getHeightFn) getHeightFn = () => origEl.offsetHeight;
    // mangadex impl:
    // g.style.position = "fixed",
    // g.style.visibility = "hidden",
    // g.style.left = -(f.width * 2) + "px",
    // g.style.top = -(x * 2) + "px",
    // g.style.width = f.width + "px",
    // g.style.height = x + "px";
    const width = parseFloat(getWidthFn());
    const height = parseFloat(getHeightFn());
    // hide the element from view
    cloneEl.css({
      position: "fixed",
      visibility: "hidden",
      left: -(width * 2) + "px",
      top: -(height * 2) + "px",
      width: width + "px",
      height: height + "px",
    });
    // styles won't be calculated if element not present in DOM
    $("body").append(cloneEl);
    // some utility functions
    const isWithinResolution = (fontSize, fontSizePrev) =>
      Math.abs(fontSize - fontSizePrev) <= resolution;
    const isOverflow = () =>
      cloneEl[0].scrollHeight > cloneEl[0].offsetHeight ||
      cloneEl[0].scrollWidth > cloneEl[0].offsetWidth;
    const isFailed = (fontSize, fontSizePrev) =>
      isOverflow() && fontSize === fontSizePrev;
    const isAsc = (fontSize, fontSizePrev) => fontSize > fontSizePrev;
    // font size init impl   const initState = useCallback(() => {
    //     return {
    //       calcKey: 0,
    //       fontSize: maxFontSize,
    //       fontSizePrev: minFontSize,
    //       fontSizeMax: maxFontSize,
    //       fontSizeMin: minFontSize,
    //     };
    //   }, [maxFontSize, minFontSize]);
    let fs = maxFontSize;
    let fsp = minFontSize;
    let fsmx = maxFontSize;
    let fsmn = minFontSize;
    for (let depth = 1; ; depth++) {
      if (depth > depthLimit) {
        console.info(
          "[use-fit-text-tuviet] depth limit reached without fitting text"
        );
        break;
      }
      // Return if the font size has been adjusted "enough" (change within `resolution`)
      // reduce font size by one increment if it's overflowing.
      if (isWithinResolution(fs, fsp)) {
        if (isFailed(fs, fsp)) {
          console.info(
            `[use-fit-text-tuviet] reached \`minFontSize = ${minFontSize}\` without fitting text`
          );
          break;
        } else if (isOverflow()) {
          fs = isAsc(fs, fsp) ? fsp : fsmn;
        } else {
          console.info("[use-fit-text-tuviet] completed fitting text");
          break;
        }
      }
      // Binary search to adjust font size
      let delta: number;
      let newMax = fsmx;
      let newMin = fsmn;
      if (isOverflow()) {
        delta = isAsc(fs, fsp) ? fsp - fs : fsmn - fs;
        newMax = Math.min(fsmx, fs);
      } else {
        delta = isAsc(fs, fsp) ? fsmx - fs : fsp - fs;
        newMin = Math.max(fsmn, fs);
      }
      fsp = fs;
      fs = fs + delta / 2;
      fsmx = newMax;
      fsmn = newMin;
      // Set the guessed font size to the element
      cloneEl.css("font-size", fs);
    }
    // whether failed or not, set the guessed font-size to the original element anyway
    $(origEl).css("font-size", fs);
    // release lock
    isCalculatingRef.current = false;
  });
  let rafId: number | null = null;
  const db = useDebounce(() => {
    console.info("[use-fit-text-tuviet] debounce");
    rafId = raf();
  }, 200);
  let dbId: number | null = null;
  useResizeObserver<HTMLDivElement>({
    // observe parent element instead (flexbox)
    ref: ref.current?.parentElement,
    onResize: ({ width, height }) => {
      console.info(`[use-fit-text-tuviet] resize ${width}x${height}`);
      if (width && height) {
        dbId = db();
      }
    },
  });
  useEffect(() => {
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (dbId) clearTimeout(dbId);
      // resize observer can stop automatically
    };
  }, [dbId, rafId]);
  return { ref };
};

export default useFitTextTuViet;
