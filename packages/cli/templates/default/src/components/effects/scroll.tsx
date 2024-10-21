'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

type SmoothScrollProps = {
  intensity: number;
};

export default function SmoothScroll(props: SmoothScrollProps) {
  const { intensity } = props;
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (lenis.current) lenis.current!.scrollTo(0, { immediate: true });
  }, [lenis]);

  useEffect(() => {
    const overlayElement = document.getElementById('overlay');
    if (overlayElement) {
      const handleMutation = (
        mutationsList: MutationRecord[],
        observer: MutationObserver
      ) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const hasChildren = overlayElement.children.length > 0;
            if (hasChildren) {
              // Check if the html tag has the style "overflow: hidden;"
              const htmlElement = document.documentElement;
              const computedStyle = window.getComputedStyle(htmlElement);
              const isOverflowHidden =
                computedStyle.getPropertyValue('overflow') === 'hidden';
              if (isOverflowHidden) {
                overlayElement.setAttribute('data-lenis-prevent', 'true');
              }
            }
          }
        }
      };
      const observer = new MutationObserver(handleMutation);

      const config = { childList: true };
      observer.observe(overlayElement, config);

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const allElements = document.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.getPropertyValue('overflow') === 'auto') {
        element.setAttribute('data-lenis-prevent', 'true');
      }
    }
  }, []);

  useEffect(() => {
    lenis.current = new Lenis({ duration: intensity / 10 });
    const raf = (time: number) => {
      if (lenis.current) {
        lenis.current.raf(time);
        requestAnimationFrame(raf);
      }
    };
    requestAnimationFrame(raf);

    return () => {
      if (lenis.current) {
        lenis.current.destroy();
        lenis.current = null;
      }
    };
  }, []);

  // Fix the Anchor link
  useEffect(() => {
    const anchorLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href]')
    );

    const handleClick = (href: string) => (e: MouseEvent) => {
      e.preventDefault();
      lenis.current?.scrollTo(href);
    };

    anchorLinks
      .filter(a => a.href.includes('#'))
      .forEach(a => {
        const href = `#${a.href.split('#').pop()}`;
        const clickHandler = handleClick(href);
        a.addEventListener('click', clickHandler);
        a.dataset.clickHandler = String(anchorLinks.indexOf(a)); // Armazena o índice do handler
      });

    return () => {
      anchorLinks
        .filter(a => a.href.includes('#'))
        .forEach(a => {
          const clickHandler = handleClick(`#${a.href.split('#').pop()}`);
          a.removeEventListener('click', clickHandler);
          delete a.dataset.clickHandler;
        });
    };
  }, [lenis]);

  return <></>;
}
