import { useState, useEffect } from 'react';

interface HeroProps {
  name: string;
}

const Hero = ({ name }: HeroProps) => {
  const backgroundImages = [
    '/IMG_0295.jpeg',
    '/IMG_1466.jpeg',
    '/IMG_1624.jpeg'
  ];
  
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * backgroundImages.length)
  );

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 30000); // Rotate every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className={`relative z-10 flex min-h-screen items-center justify-center px-4 text-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center">
          <h1 className="font-inter mb-4 text-4xl font-light tracking-wider sm:text-5xl md:text-6xl">
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
