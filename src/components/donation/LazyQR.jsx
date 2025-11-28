import React, { lazy, Suspense } from 'react';

const QRCode = lazy(() => import('react-qr-code'));

export default function LazyQRCode({ value, size }) {
  if (!value) return null;
  
  return (
    <Suspense fallback={<div>Loading QR Code...</div>}>
      <QRCode value={value} size={size} />
    </Suspense>
  );
}