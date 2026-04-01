import { useEffect, useRef } from 'react';
import './NeuralBackground.css';

export default function NeuralBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;
        let animationFrameId;

        let particles = [];
        const isMobile = window.innerWidth < 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const particleCount = isMobile ? 36 : 100;
        const connectionDistance = isMobile ? 120 : 190;
        const mouse = { x: null, y: null, radius: 180 };
        const scroll = { y: 0, targetY: 0 };
        let phase = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawStaticBackdrop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
            ctx.lineWidth = 1;
            const gridGap = 56;
            for (let x = -gridGap; x < canvas.width + gridGap; x += gridGap) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = -gridGap; y < canvas.height + gridGap; y += gridGap) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            ctx.restore();
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.size = Math.random() * 1.6 + 0.4;
                this.pulse = Math.random() * Math.PI * 2;
                this.baseOpacity = 0.2 + Math.random() * 0.15;
                this.glitchTimer = 0;
            }

            update() {
                // Parallax effect
                const parallaxY = scroll.y * 0.15;
                
                this.x += this.vx;
                this.y += this.vy;
                this.pulse += 0.018;

                if (this.x < -10 || this.x > canvas.width + 10) this.vx *= -1;
                if (this.y < -10 || this.y > canvas.height + 10) this.vy *= -1;

                // Mouse interaction
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = (this.y + parallaxY) - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += dx * force * 0.025;
                        this.y += dy * force * 0.025;
                        
                        if (Math.random() > 0.985) {
                            this.glitchTimer = 8;
                        }
                    }
                }

                if (this.glitchTimer > 0) this.glitchTimer--;
            }

            draw() {
                const drawY = this.y - (scroll.y * 0.15);
                
                ctx.beginPath();
                const currentRadius = this.glitchTimer > 0 ? this.size * 2.5 : this.size;
                ctx.arc(this.x, drawY, currentRadius, 0, Math.PI * 2);
                
                const alphaMod = (Math.sin(this.pulse) + 1) * 0.15;
                const alpha = this.glitchTimer > 0 ? 0.8 : this.baseOpacity + alphaMod;
                
                ctx.fillStyle = this.glitchTimer > 0 
                    ? `rgba(20, 184, 166, ${alpha})`
                    : `rgba(16, 185, 129, ${alpha})`;
                ctx.fill();
                
                if (this.glitchTimer > 0) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            phase += 0.005;
            // Smooth scroll tracking
            scroll.y += (scroll.targetY - scroll.y) * 0.08;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Parallax Grid
            const gridShift = (Math.sin(phase) * 12) + (scroll.y * 0.05);
            ctx.save();
            ctx.strokeStyle = 'rgba(20, 184, 166, 0.04)';
            ctx.lineWidth = 1;
            const step = 64;
            for (let x = -step; x < canvas.width + step; x += step) {
                ctx.beginPath();
                ctx.moveTo(x + (gridShift % step), 0);
                ctx.lineTo(x + (gridShift % step), canvas.height);
                ctx.stroke();
            }
            for (let y = -step; y < canvas.height + step; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y - (gridShift * 0.8 % step));
                ctx.lineTo(canvas.width, y - (gridShift * 0.8 % step));
                ctx.stroke();
            }
            ctx.restore();

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = (particles[i].y - (scroll.y * 0.15)) - (particles[j].y - (scroll.y * 0.15));
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        let linkAlpha = 0.18 * (1 - dist / connectionDistance);
                        
                        // Mouse glow on lines
                        if (mouse.x !== null) {
                            const mdx = (particles[i].x + particles[j].x) * 0.5 - mouse.x;
                            const mdy = (particles[i].y + particles[j].y) * 0.5 - (scroll.y * 0.15) - mouse.y;
                            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                            if (mdist < 120) {
                                linkAlpha *= 2.5;
                                ctx.shadowBlur = 4;
                                ctx.shadowColor = 'rgba(20, 184, 166, 0.4)';
                            }
                        }

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(20, 184, 166, ${linkAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y - (scroll.y * 0.15));
                        ctx.lineTo(particles[j].x, particles[j].y - (scroll.y * 0.15));
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleScroll = () => {
            scroll.targetY = window.scrollY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();

        if (prefersReducedMotion.matches) {
            drawStaticBackdrop();
            return () => {
                window.removeEventListener('resize', resizeCanvas);
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="neural-bg" />;
}

