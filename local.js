// local.js - Gerenciamento de informações de IP e localização

async function fetchIPInfo() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    document.getElementById('ipv4').innerText = data.ip || 'N/A';
    document.getElementById('ipv6').innerText = data.ipv6 || 'N/A';
    document.getElementById('country').innerText = data.country_name || 'N/A';
    document.getElementById('region').innerText = data.region || 'N/A';
    document.getElementById('city').innerText = data.city || 'N/A';
    document.getElementById('isp').innerText = data.org || 'N/A';
  } catch (error) {
    console.log('Erro ao buscar IP:', error);
    document.getElementById('ipv4').innerText = 'Erro ao carregar';
  }
}

function openIPPanel() {
  document.getElementById('ipModal').classList.add('active');
  fetchIPInfo();
}

function closeIPPanel() {
  document.getElementById('ipModal').classList.remove('active');
}
