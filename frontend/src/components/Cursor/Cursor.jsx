import './Cursor.css';

export default function Cursor({ cursorRef, ringRef }) {
  return (
    <>
      <div className="z-cursor" ref={cursorRef} />
      <div className="z-cursor-ring" ref={ringRef} />
    </>
  );
}
