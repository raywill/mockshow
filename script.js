const runButton = document.getElementById('run-button');
const simButton = document.getElementById('sim-button');
const codeButton = document.getElementById('code-button');
const editor = document.getElementById('editor');
const terminal = document.getElementById('terminal');
const editorTab = document.getElementById('editor-tab');
const terminalTab = document.getElementById('terminal-tab');
const cursor = document.getElementById('cursor');
const terminalContent = document.getElementById('terminal-content');

document.addEventListener('DOMContentLoaded', (event) => {
    if (editor) {
        editor.focus();
    }
    // init view
    simButton.style.display = 'inline';
    runButton.style.display = 'inline';
    codeButton.style.display = 'none';
});


runButton.addEventListener('click', function() {
    editorTab.style.display = 'none';
    terminalTab.style.display = 'block';
    terminalContent.textContent = ''; // Clear terminal

    simButton.style.display = 'none';
    runButton.style.display = 'none';
    codeButton.style.display = 'inline';

    runSimulation(editor.value.split('\n'));
});

simButton.addEventListener('click', function() {
    // switch tab
    editorTab.style.display = 'none';
    terminalTab.style.display = 'block';
    // switch button
    simButton.style.display = 'none';
    runButton.style.display = 'none';
    codeButton.style.display = 'inline';
    console.log(editorTab.style.display);
});

codeButton.addEventListener('click', function() {
    // switch tab
    editorTab.style.display = 'block';
    terminalTab.style.display = 'none';
    // switch button
    codeButton.style.display = 'none';
    runButton.style.display = 'inline';
    simButton.style.display = 'inline';

    // ready to edit
    editor.focus();
});

function scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
}


function runSimulation(lines) {
    function* lineGenerator(lines) {
        for (let line of lines) {
            yield line;
        }
    }

    const gen = lineGenerator(lines);
    function nextLine() {
        scrollToBottom(terminal); 
        const next = gen.next();
        if (next.done) return;
        const line = next.value;
        if (line === '') {
            terminalContent.textContent += '\n';
            nextLine();
        } else if (line.startsWith('> ')) {
            terminalContent.textContent += line.substring(2).trim();
            setTimeout(() => {
                nextLine();
            }, 1000);
        } else if (line.startsWith('pause ')) {
            const pauseSeconds = parseInt(line.substring(6).trim());
            setTimeout(() => {
                nextLine();
            }, pauseSeconds);
        } else if (line.startsWith('- ')) {
            simulateTyping(line.substring(2).trim() + '\n');
        } else {
            setTimeout(() => {
                terminalContent.textContent += line + '\n';
                nextLine();
            }, 10);
        }
    }

    function simulateTyping(text, index = 0, typingSpeed = 100) {
        cursor.style.display = 'inline-block'; // 确保在输入开始时显示光标
        cursor.classList.remove('blink'); // 在打字时停止光标闪烁
        if (index < text.length) {
            terminalContent.textContent += text[index++];
            setTimeout(() => simulateTyping(text, index, typingSpeed), typingSpeed);
        } else {
            // 输入完成后, 如果停留时间超过 1s, 则恢复光标闪烁
            setTimeout(() => {
                cursor.classList.add('blink');
            }, 1000);
            nextLine();
        }
    }

    nextLine();
}

