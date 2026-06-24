// controller.js - Controle de robôs RoboCore

const robots = [
  {
    id: 'explorer1253',
    name: 'explorer1253',
    status: 'active',
    type: 'RoboExplorer'
  },
  {
    id: 'alfa675742',
    name: 'alfa675742',
    status: 'development',
    type: 'RoboAlfa'
  }
];

let selectedRobot = null;
let checklist = {
  wifi: false,
  computer: false,
  robot: false
};

// Inicializar lista de robôs
function initRobotList() {
  const robotList = document.getElementById('robotList');
  robotList.innerHTML = '';
  
  robots.forEach(robot => {
    const item = document.createElement('div');
    item.className = 'robot-item';
    item.innerHTML = `
      <span class="robot-name">${robot.name}</span>
      <span class="arrow">→</span>
    `;
    item.onclick = () => selectRobot(robot);
    robotList.appendChild(item);
  });
}

// Selecionar robô e mostrar detalhes
function selectRobot(robot) {
  selectedRobot = robot;
  
  // Atualizar visual
  document.querySelectorAll('.robot-item').forEach(item => {
    item.classList.remove('active');
  });
  event.target.closest('.robot-item').classList.add('active');
  
  // Mostrar detalhes
  const detailPanel = document.getElementById('detailPanel');
  
  if (robot.status === 'development') {
    detailPanel.innerHTML = `
      <div style="text-align: center;">
        <p class="detail-message">🚧 Este robô ainda está em desenvolvimento</p>
        <p style="margin-top: 20px; color: #0c0;">Volte em breve para acessar o controle completo.</p>
      </div>
    `;
    resetChecklist();
  } else if (robot.id === 'explorer1253') {
    showExplorerChecklist();
  }
}

// Mostrar checklist para explorer1253
function showExplorerChecklist() {
  resetChecklist();
  const detailPanel = document.getElementById('detailPanel');
  
  detailPanel.innerHTML = `
    <div>
      <h3 style="text-shadow: 0 0 10px #0f0; margin-bottom: 25px;">Verificação de Controle</h3>
      <ul class="checklist">
        <li class="checklist-item" id="check1">
          <div class="checkbox" onclick="toggleCheck(1)">
            <span id="check1-icon"></span>
          </div>
          <label class="checkbox-label">
            Rede WiFi (PlacaControladoraWiFi) conectada
          </label>
        </li>
        <li class="checklist-item" id="check2">
          <div class="checkbox" onclick="toggleCheck(2)">
            <span id="check2-icon"></span>
          </div>
          <label class="checkbox-label">
            Computador pronto para o controle
          </label>
        </li>
        <li class="checklist-item" id="check3">
          <div class="checkbox" onclick="toggleCheck(3)">
            <span id="check3-icon"></span>
          </div>
          <label class="checkbox-label">
            Robô pronto e em perfeito funcionamento
          </label>
        </li>
      </ul>
      <button class="unlock-button" id="unlockBtn" onclick="unlockControl()">
        DESBLOQUEAR CONTROLE
      </button>
    </div>
  `;
}

// Toggle checkbox
function toggleCheck(num) {
  const keys = ['wifi', 'computer', 'robot'];
  const key = keys[num - 1];
  checklist[key] = !checklist[key];
  
  const checkItem = document.getElementById(`check${num}`);
  const icon = document.getElementById(`check${num}-icon`);
  
  if (checklist[key]) {
    checkItem.classList.add('checked');
    icon.innerText = '✓';
  } else {
    checkItem.classList.remove('checked');
    icon.innerText = '';
  }
  
  checkUnlockButton();
}

// Verificar se todos os itens estão checados
function checkUnlockButton() {
  const allChecked = Object.values(checklist).every(v => v === true);
  const unlockBtn = document.getElementById('unlockBtn');
  
  if (allChecked && unlockBtn) {
    unlockBtn.classList.add('visible');
  } else if (unlockBtn) {
    unlockBtn.classList.remove('visible');
  }
}

// Desbloquear controle do robô
function unlockControl() {
  window.open('http://192.168.4.1', '_blank');
}

// Resetar checklist
function resetChecklist() {
  checklist = { wifi: false, computer: false, robot: false };
}

// Abrir painel de notas
function openNotesPanel() {
  document.getElementById('notesModal').classList.add('active');
  loadNotes();
}

function closeNotesPanel() {
  document.getElementById('notesModal').classList.remove('active');
  saveNotes();
}

// Salvar e carregar notas do localStorage
function saveNotes() {
  const notes = document.getElementById('notesTextarea').value;
  localStorage.setItem('viquinhoNotes', notes);
}

function loadNotes() {
  const notes = localStorage.getItem('viquinhoNotes') || '';
  document.getElementById('notesTextarea').value = notes;
}

// Formatação de texto
function formatText(action) {
  const textarea = document.getElementById('notesTextarea');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);
  
  if (!selected) return;
  
  let formatted = '';
  
  switch(action) {
    case 'bold':
      formatted = `**${selected}**`;
      break;
    case 'italic':
      formatted = `*${selected}*`;
      break;
    case 'underline':
      formatted = `__${selected}__`;
      break;
    case 'strikethrough':
      formatted = `~~${selected}~~`;
      break;
    case 'clear':
      if(confirm('Deseja limpar todas as notas?')) {
        textarea.value = '';
        saveNotes();
      }
      return;
    case 'download':
      downloadNotes();
      return;
  }
  
  textarea.value = textarea.value.substring(0, start) + formatted + textarea.value.substring(end);
  saveNotes();
}

// Download das notas
function downloadNotes() {
  const notes = document.getElementById('notesTextarea').value;
  const blob = new Blob([notes], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notas-viquinho.txt';
  a.click();
}

// Abrir painel do robô
function openRobotPanel() {
  document.getElementById('robotModal').classList.add('active');
  initRobotList();
}

function closeRobotPanel() {
  document.getElementById('robotModal').classList.remove('active');
}
