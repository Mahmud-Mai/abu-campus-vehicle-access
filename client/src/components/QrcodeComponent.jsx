import QRCode from 'qrcode';
import { useEffect, useRef } from 'react';

export default function QRCodeComponent() {
  const canvasRef = useRef();

  useEffect(ticketId => {
    QRCode.toCanvas(
      canvasRef.current,
      ticketId || ' ',
      { width: 180 },
      error => error && console.error(error)
    );
  }, []);

  return <canvas ref={canvasRef} />;
}
