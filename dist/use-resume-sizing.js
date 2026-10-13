import {useLayoutEffect} from 'https://esm.sh/react@18.3.1';
import {fitFontSize} from './font-fit.js';
export function useResumeSizing(ref, name, font, format, photo) {
  useLayoutEffect(() => {
    const paper = ref.current;
    if (!paper) return;
    const resize = () => {
      const heading = paper.querySelector('.resume-head h2');
      if (!heading) return;
      const available = heading.parentElement.clientWidth;
      const body = Math.max(10, Math.min(14, paper.clientWidth / 595 * 12));
      paper.style.setProperty('--resume-body', body + 'px');
      const computed = getComputedStyle(heading);
      const context = document.createElement('canvas').getContext('2d');
      const text = format === 'ats' ? name.toUpperCase() : name;
      const size = fitFontSize(text || 'Your name', available - 4, (value, size) => {
        context.font = `bold ${size}px ${computed.fontFamily}`;
        return context.measureText(value).width;
      }, body * 2.5, body * 1.5);
      heading.style.fontSize = size + 'px';
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(paper);
    document.fonts?.ready.then(() => { if (paper.isConnected) resize(); });
    return () => observer.disconnect();
  }, [ref, name, font, format, photo]);
}
