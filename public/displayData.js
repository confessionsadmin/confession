document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
  
      const container = document.getElementById('data-container');
      data.forEach(item => {
        const box = document.createElement('div');
        box.className = 'box';
        const messageWithBreaks = item.message.replace(/\n/g, '<br>');
      box.innerHTML = ` ${messageWithBreaks}<br><br>To: ${item.to}<br>From: ${item.from}`;
        container.appendChild(box);
      });
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  