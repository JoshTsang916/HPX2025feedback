import './style.css'

document.querySelector<HTMLDivElement>('#app')

const form = document.getElementById('feedbackForm') as HTMLFormElement;
const container = document.querySelector('.container') as HTMLDivElement;

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values
    const formData = new FormData(form);
    const encouragement = formData.get('encouragement');
    const feedback = formData.get('feedback');

    // Disable button to prevent double submit
    const submitBtn = form.querySelector('.submit-btn') as HTMLButtonElement;
    const originalBtnText = submitBtn.innerText;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = '傳送中...';
    }

    // Send to n8n webhook
    fetch('https://joshtsang0916.zeabur.app/webhook/HPX2025feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encouragement,
        feedback,
        timestamp: new Date().toISOString()
      }),
    })
      .then(response => {
        if (response.ok) {
          // Show success message
          container.innerHTML = `
          <div class="success-message">
            <h1 class="pow-text">POW!</h1>
            <h2 style="margin-top: 20px; font-size: 2rem; color: var(--color-black);">收到你的反饋了！</h2>
            <p style="margin-top: 10px; font-size: 1.2rem;">感謝你的聲音！</p>
            <button onclick="location.reload()" class="submit-btn" style="margin-top: 30px;">再來一發</button>
          </div>
        `;
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('傳送失敗，請檢查網路連線或稍後再試！');
        // Reset button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        }
      });
  });
}
