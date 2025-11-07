import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Forçar reprodução do vídeo em dispositivos móveis
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log('Auto-play blocked, attempting to play on user interaction');

          // Tentar reproduzir após qualquer interação do usuário
          const playOnInteraction = () => {
            videoRef.current?.play();
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('click', playOnInteraction);
          };

          document.addEventListener('touchstart', playOnInteraction);
          document.addEventListener('click', playOnInteraction);
        }
      }
    };

    playVideo();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source
          src="https://cdn.pixabay.com/video/2022/10/10/134308-759254371_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay escuro para melhorar contraste */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-green-950/60" />

      {/* Gradiente base escuro para verde */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-neutral-950/40 to-green-950/30" />

      {/* Grade animada neon com opacidade reduzida */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,211,102,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,211,102,0.06)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-scroll" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,211,102,0.12)_2px,transparent_2px),linear-gradient(to_bottom,rgba(37,211,102,0.12)_2px,transparent_2px)] bg-[size:120px_120px] animate-grid-scroll-slow" />
      </div>

      {/* Esferas neon flutuantes - opacidade ajustada */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-primary/15 rounded-full blur-[120px] animate-float-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/12 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-float-medium" />
    </div>
  );
}