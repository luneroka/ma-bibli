import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import PropTypes from 'prop-types';

function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Detect iPhone device
  const isIPhone = /iPhone/.test(navigator.userAgent);

  // Photo scanning function for iPhone
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const img = new Image();
      img.onload = async () => {
        try {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageReader = new BrowserMultiFormatReader();
          const result = await imageReader.decodeFromCanvas(canvas);

          if (result) {
            onDetected(result.getText());
            onClose();
          } else {
            alert("Aucun code-barres trouvé dans l'image. Veuillez réessayer.");
          }
        } catch (err) {
          console.error('Error scanning image:', err);
          alert(
            "Impossible de scanner le code-barres depuis l'image. Essayez une photo plus nette."
          );
        }
      };

      img.onerror = () => {
        alert("Impossible de charger l'image. Veuillez réessayer.");
      };

      img.src = URL.createObjectURL(file);
    } catch (err) {
      console.error('Error processing photo:', err);
      alert('Erreur lors du traitement de la photo. Veuillez réessayer.');
    }

    event.target.value = '';
  };

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
        (result) => {
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

        {/* iPhone photo scanning option */}
        {isIPhone && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className='cursor-pointer mt-2 px-4 py-2 bg-secondary-btn text-white shadow hover:bg-primary-btn text-small'
          >
            📷 Scanner Photo
          </button>
        )}

        <button
          onClick={onClose}
          className='cursor-pointer mt-2 px-4 py-2 bg-primary-btn text-white shadow hover:bg-secondary-btn'
        >
          Fermer
        </button>

        {/* Hidden file input for iPhone photo capture */}
        {isIPhone && (
          <>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              capture='environment'
              onChange={handlePhotoUpload}
              className='hidden'
            />
            <canvas ref={canvasRef} className='hidden' />
          </>
        )}
      </div>
    </div>
  );
}

BarcodeScanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BarcodeScanner;
