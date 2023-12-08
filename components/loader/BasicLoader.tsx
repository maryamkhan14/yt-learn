import { cn } from "@/lib/utils";

interface BasicLoaderProps {
  title: string;
  desc: string;
  loaderStyles?: string;
  circleStyles?: string;
  pathStyles?: string;
  circleStrokeWidth?: string;
  pathStrokeWidth?: string;
}
function BasicLoader({
  title,
  desc,
  loaderStyles,
  circleStyles,
  pathStyles,
  circleStrokeWidth,
  pathStrokeWidth,
}: BasicLoaderProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-live="polite"
      aria-busy="true"
      aria-labelledby="title-05a desc-05a"
      className={cn("animate h-6 w-6 animate-spin", loaderStyles)}
    >
      <title id="title-05a">{title}</title>
      <desc id="desc-05a">{desc}</desc>
      <circle
        cx="12"
        cy="12"
        r="10"
        className={cn("stroke-slate-200", circleStyles)}
        strokeWidth={circleStrokeWidth ?? "4"}
      />
      <path
        d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
        className={cn("stroke-pink-500", pathStyles)}
        strokeWidth={pathStrokeWidth ?? "4"}
      />
    </svg>
  );
}

export default BasicLoader;
