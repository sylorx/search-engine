import { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particles - daha az ve daha yavaş
    const particles = [];
    const particleCount = 30;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3; // Çok daha yavaş
        this.speedY = (Math.random() - 0.5) * 0.3;
        // Daha soft renkler - mavi tonları
        const hue = 200 + Math.random() * 60; // 200-260 arası (mavi-mor)
        this.color = `hsla(${hue}, 60%, 70%, 0.4)`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Floating shapes - daha az ve daha büyük
    const shapes = [];
    const shapeCount = 8;
    
    class FloatingShape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 120 + 80; // Daha büyük
        this.speedX = (Math.random() - 0.5) * 0.15; // Çok yavaş
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.003; // Çok yavaş dönüş
        this.type = Math.floor(Math.random() * 3); // Sadece circle, square, hexagon
        // Soft mavi-mor tonları
        const hue = 200 + Math.random() * 60;
        this.color = `hsla(${hue}, 50%, 65%, 0.06)`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color.replace('0.1', '0.3');
        ctx.lineWidth = 2;
        
        switch(this.type) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;
          case 1: // Square
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
          case 3: // Hexagon
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const x = (this.size / 2) * Math.cos(angle);
              const y = (this.size / 2) * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
        }
        
        ctx.restore();
      }
    }
    
    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new FloatingShape());
    }
    
    // Animation loop
    let animationId;
    function animate() {
      // Daha soft temizleme - dark mode için kontrol
      const isDark = document.body.classList.contains('dark');
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.1)' : 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw floating shapes first (background)
      shapes.forEach(shape => {
        shape.update();
        shape.draw();
      });
      
      // Draw particles with subtle connections
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Connect nearby particles - daha az ve daha soft
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.15;
            ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.5 }}
      />
      
      {/* Gradient overlays - daha soft ve sakin */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>
    </>
  );
}

export default AnimatedBackground;
