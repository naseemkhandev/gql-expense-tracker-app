const GridBackground = ({ children }) => {
  return (
    <div className="w-full bg-black text-white bg-grid-white/[0.2] relative min-h-dvh">
      <div className="absolute pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  );
};
export default GridBackground;
