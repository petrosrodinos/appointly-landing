export const MapPreview = ({ lat, lng }: { lat: number; lng: number }) => {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden">
      <iframe title="Map preview" src={mapUrl} width="100%" height="100%" loading="lazy" allowFullScreen />
    </div>
  );
};
