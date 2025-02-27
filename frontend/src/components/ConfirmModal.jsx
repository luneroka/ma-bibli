import React from 'react';

function ConfirmModal({ visible, onConfirm, message = 'Êtes-vous sûr ?' }) {
  if (!visible) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white-100 bg-opacity-50'>
      <div className='bg-white-100 p-6 rounded shadow-md max-w-sm mx-auto'>
        <p className='mb-4 text-black text-base'>{message}</p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={() => onConfirm(true)}
            className='cursor-pointer px-4 py-2 bg-alert-green-bg text-alert-green-txt rounded hover:bg-green-500 hover:text-white-100'
          >
            Oui
          </button>
          <button
            onClick={() => onConfirm(false)}
            className='cursor-pointer px-4 py-2 bg-alert-red-bg text-red-txt rounded hover:bg-red-500 hover:text-white-100'
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
