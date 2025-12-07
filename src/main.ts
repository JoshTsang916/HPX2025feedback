import './style.css'

document.querySelector<HTMLDivElement>('#app')

const form = document.getElementById('feedbackForm') as HTMLFormElement;
const container = document.querySelector('.container') as HTMLDivElement;

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get values (in a real app, send these to a server)
    const formData = new FormData(form);
    const encouragement = formData.get('encouragement');
    const feedback = formData.get('feedback');
    
    console.log('Encouragement:', encouragement);
    console.log('Feedback:', feedback);

    // Show success message
    container.innerHTML = `
      <div class="success-message">
        <h1 class="pow-text">POW!</h1>
        <h2 style="margin-top: 20px; font-size: 2rem; color: var(--color-black);">收到你的反饋了！</h2>
        <p style="margin-top: 10px; font-size: 1.2rem;">感謝你的聲音！</p>
        <button onclick="location.reload()" class="submit-btn" style="margin-top: 30px;">再來一發</button>
      </div>
    `;
  });
}
