import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Loader.css'; // CSS for preloader & canvas

export default function Loader() {
  const navigate = useNavigate();

  useEffect(() => {
    const line1 = "> run sanketJadhav.me";
    const line2 = "> load sanket.core...";

    const el1 = document.querySelector('.a-preloader-run-text');
    const el2 = document.querySelector('.a-preloader-loading-text');
    const percentEl = document.querySelector('.a-preloader-percent');
    const canvas = document.getElementById('matrixCanvas');

    function typeText(element, text, delay = 100) {
      return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
          element.textContent += text[i];
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, delay);
      });
    }

    function loadingCounter(delay = 30) {
      return new Promise(resolve => {
        let count = 1;
        const interval = setInterval(() => {
          percentEl.textContent = "..." + count + "%";
          count++;
          if (count > 100) {
            clearInterval(interval);
            resolve();
          }
        }, delay);
      });
    }

    // --- MATRIX RAIN ---
    const ctx = canvas.getContext('2d');
    const letters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const matrix = letters.split('');
    let fontSize = 16;
    let columns = Math.floor(window.innerWidth / fontSize);
    let drops = Array(columns).fill(1);

    function drawMatrixRain() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(drawMatrixRain);
    }

    function startMatrixRain() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
      drawMatrixRain();
    }

    async function runPreloader() {
      await typeText(el1, line1, 80);
      await new Promise(r => setTimeout(r, 300));
      await typeText(el2, line2, 80);
      await new Promise(r => setTimeout(r, 300));
      await loadingCounter(30);

      // Start matrix for 2 seconds
      canvas.style.display = 'block';
      startMatrixRain();

      setTimeout(() => {
        navigate("/"); // Navigate to home page
      }, 2000);
    }

    runPreloader();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    });

  }, [navigate]);

  return (
    <div className="a-preloader-wrapper">
      <canvas id="matrixCanvas"></canvas>
      <div className="a-preloader-content">
        <p className="a-preloader-text a-preloader-run-text"></p>
        <p className="a-preloader-text a-preloader-loading-text"></p>
        <p className="a-preloader-percent"></p>
      </div>
    </div>
  );
}
