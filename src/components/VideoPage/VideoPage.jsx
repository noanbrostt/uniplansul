import React, { useState, useEffect, useRef } from 'react';

const VideoPage = () => {
  const [currentTime, setCurrentTime] = useState(0); // Tempo atual do vídeo
  const [duration, setDuration] = useState(0); // Duração total do vídeo
  const videoRef = useRef(null); // Referência do vídeo

  const videoDuration = duration;

  // Função para salvar o tempo assistido
  const saveCurrentTime = (time) => {
    localStorage.setItem('videoTime', time); // Salva o tempo em que o aluno pausou
  };

  // Função para salvar o tempo máximo assistido
  const saveMaxWatchedTime = (time) => {
    localStorage.setItem('maxWatchedTime', time); // Salva o tempo máximo assistido
  };

  // Recuperar o tempo assistido do localStorage
  const getLastWatchedTime = () => {
    return parseFloat(localStorage.getItem('videoTime')) || 0;
  };

  // Recuperar o tempo máximo assistido do localStorage
  const getMaxWatchedTime = () => {
    return parseFloat(localStorage.getItem('maxWatchedTime')) || 0;
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    // Quando o vídeo for carregado, obtemos a duração total
    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration); // Definindo a duração total do vídeo
    };

    // Adiciona o evento de quando os metadados do vídeo são carregados (duração)
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Definir o ponto inicial do vídeo para onde o aluno parou
    const lastTime = getLastWatchedTime();
    if (lastTime) {
      videoRef.current.currentTime = lastTime; // Inicia no ponto onde o aluno parou
    }

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Controla o tempo do vídeo
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const current = video.currentTime;
    setCurrentTime(current);

    // Atualiza o tempo máximo assistido
    const maxTime = getMaxWatchedTime();
    if (current > maxTime) {
      saveMaxWatchedTime(current); // Atualiza o tempo máximo assistido
    }

    saveCurrentTime(current); // Salva o tempo atual (onde o aluno pausou)
  };

  // Impede que o aluno avance além do ponto máximo assistido
  const handleSeeking = () => {
    const video = videoRef.current;
    const maxWatchedTime = getMaxWatchedTime();

    if (video.currentTime > maxWatchedTime) {
      video.currentTime = maxWatchedTime; // Impede de avançar além do ponto máximo assistido
    }
  };

  return (
    <div className="video-page">
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls
        onTimeUpdate={handleTimeUpdate} // Atualiza o tempo assistido
        onSeeking={handleSeeking} // Limita a tentativa de avanço
        onPause={() => saveCurrentTime(currentTime)} // Salva a última posição se o vídeo for pausado
        autoPlay
      >
        <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
      <div>
        <p>Tempo Assistido: {Math.floor(currentTime)} / {Math.floor(videoDuration)}</p>
        <p>Tempo Máximo Assistido: {Math.floor(getMaxWatchedTime())} / {Math.floor(videoDuration)}</p>
      </div>
    </div>
  );
};

export default VideoPage;
