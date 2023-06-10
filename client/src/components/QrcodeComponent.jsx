import QRCode from 'qrcode';
import { useEffect, useRef } from 'react';

export default function QrcodeComponent({ ticketId }) {
  const canvasRef = useRef();

  useEffect(() => {
    QRCode.toCanvas(
      canvasRef.current,
      ticketId || ' ',
      { width: 180 },
      error => {
        if (error) {
          console.error(error);
        } else {
          console.log(`QRCode Success!!`);
        }
      }
    );
  }, [ticketId]);

  return <canvas ref={canvasRef} />;
}
