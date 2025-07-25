import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import PropTypes from 'prop-types';

function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert(
        'Camera access is not supported in this browser. Please use a modern browser like Safari, Chrome, or Firefox.'
      );
      onClose();
      return;
    }

    // Detect iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Use larger or default constraints for iOS
    const constraints = {
      video: {
        facingMode: { ideal: 'environment' },
      },
    };

    codeReaderRef.current = new BrowserMultiFormatReader();
    let controls;
    codeReaderRef.current
      .decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            onDetected(result.getText());
            onClose();
          }
        },
        constraints
      )
      .then((c) => {
        controls = c;
      })
      .catch(() => {
        alert('Camera permission denied or not available.');
        onClose();
      });

    return () => {
      if (controls && typeof controls.stop === 'function') {
        controls.stop();
      }
    };
  }, [onDetected, onClose]);

  // Use larger video area for iOS
  const videoClass = /iPad|iPhone|iPod/.test(navigator.userAgent)
    ? 'w-full h-80'
    : 'w-64 h-40';

  return (
    <div className='fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50'>
      <div className='bg-black rounded shadow-lg p-2 flex flex-col items-center'>
        <video
          ref={videoRef}
          className={videoClass}
          autoPlay
          playsInline
          style={{ objectFit: 'cover' }}
        />
        <button
          onClick={onClose}
          className='cursor-pointer mt-2 px-4 py-2 bg-primary-btn text-white shadow hover:bg-secondary-btn'
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

BarcodeScanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BarcodeScanner;
