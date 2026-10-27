// The core data structure: a JavaScript array acting as a Stack
let prepStack = [];

// DOM Element references
const ingredientInput = document.getElementById('ingredientInput');
const pushBtn = document.getElementById('pushBtn');
const popBtn = document.getElementById('popBtn');
const clearBtn = document.getElementById('clearBtn');
const stackVisual = document.getElementById('stackVisual');
const stackCount = document.getElementById('stackCount');

function updateUI() {
    stackVisual.innerHTML = '';

    if (prepStack.length === 0) {
        stackVisual.innerHTML = `<div style="text-align: center; color: var(--text-muted); margin-top: auto; margin-bottom: auto;">Stack is empty. Add ingredients or load a preset!</div>`;
    }

    prepStack.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'stack-item';
        div.innerHTML = `<span>${index === prepStack.length - 1 ? '🔥 ' : ''} ${item}</span> <span style="font-size:0.75rem; opacity:0.7;">index: ${index}</span>`;
        stackVisual.appendChild(div);
    });

    stackCount.textContent = `${prepStack.length} items`;
}

function handlePush() {
    const value = ingredientInput.value.trim();
    if (!value) return;

    // Push operation
    prepStack.push(value);
    ingredientInput.value = '';
    updateUI();
}

function handlePop() {
    if (prepStack.length === 0) {
        alert("Stack is already empty!");
        return;
    }
    // Pop operation (removes the last element added)
    prepStack.pop();
    updateUI();
}

function handleClear() {
    prepStack = [];
    updateUI();
}

// Event Listeners
pushBtn.addEventListener('click', handlePush);
ingredientInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handlePush();
});

popBtn.addEventListener('click', handlePop);
clearBtn.addEventListener('click', handleClear);

// Preset pills event handling
document.querySelectorAll('.preset-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const items = pill.getAttribute('data-preset').split(',');
        prepStack = [...items];
        updateUI();
    });
});

// Initial render
updateUI();