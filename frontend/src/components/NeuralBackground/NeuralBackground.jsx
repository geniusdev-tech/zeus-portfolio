import { useEffect, useRef } from 'react';
import './NeuralBackground.css';

export default function NeuralBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let particles = [];
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 55 : 130;
        const connectionDistance = isMobile ? 140 : 200;
        const mouse = { x: null, y: null, radius: 150 };
        let phase = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5 + 0.5;
                this.pulse = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.pulse += 0.015;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse interaction
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += dx * force * 0.02;
                        this.y += dy * force * 0.02;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                const alpha = 0.28 + ((Math.sin(this.pulse) + 1) * 0.18);
                ctx.fillStyle = `rgba(0, 255, 140, ${alpha})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            phase += 0.0045;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gridShift = Math.sin(phase) * 18;
            ctx.save();
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.035)';
            ctx.lineWidth = 1;
            for (let x = -40; x < canvas.width + 40; x += 48) {
                ctx.beginPath();
                ctx.moveTo(x + gridShift, 0);
                ctx.lineTo(x + gridShift, canvas.height);
                ctx.stroke();
            }
            for (let y = -40; y < canvas.height + 40; y += 48) {
                ctx.beginPath();
                ctx.moveTo(0, y - gridShift * 0.5);
                ctx.lineTo(canvas.width, y - gridShift * 0.5);
                ctx.stroke();
            }
            ctx.restore();

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const linkAlpha = 0.22 * (1 - dist / connectionDistance);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 229, 255, ${linkAlpha})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();

                        if (Math.random() > 0.992) {
                            const midX = (particles[i].x + particles[j].x) * 0.5;
                            const midY = (particles[i].y + particles[j].y) * 0.5;
                            ctx.fillStyle = 'rgba(0, 255, 140, 0.28)';
                            ctx.fillRect(midX - 1, midY - 1, 2, 2);
                        }
                    }
                }
            }

            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            for (let i = 0; i < 18; i++) {
                const y = ((phase * 1200) + i * 83) % canvas.height;
                ctx.fillRect(0, y, canvas.width, 1);
            }
            ctx.restore();

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="neural-bg" />;
}
