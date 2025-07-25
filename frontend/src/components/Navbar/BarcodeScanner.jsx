import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import PropTypes from 'prop-types';

function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader();
    const controls = codeReaderRef.current.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, err) => {
        if (result) {
          onDetected(result.getText());
          onClose();
        }
      }
    );
    return () => {
      // Proper cleanup: stop the video stream
      if (controls && typeof controls.stop === 'function') {
        controls.stop();
      }
    };
  }, [onDetected, onClose]);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50'>
      <video ref={videoRef} className='w-full max-w-xs rounded shadow-lg' autoPlay />
      <button
        onClick={onClose}
        className='cursor-pointer mt-4 px-4 py-2 bg-primary-btn text-white shadow hover:bg-secondary-btn'
      >
        Fermer
      </button>
    </div>
  );
}

BarcodeScanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BarcodeScanner;
