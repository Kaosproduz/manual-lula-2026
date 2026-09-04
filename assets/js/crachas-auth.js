// crachas-auth.js — trava simples de senha para a página de verificação de crachás.
// Não é segurança real (a senha fica visível no código-fonte) — só evita acesso casual.

(function () {
  var PASSWORD = 'Lula132026';
  var SESSION_KEY = 'crachas-unlocked';

  var body = document.body;
  var gate = document.getElementById('access-gate');
  var form = document.getElementById('access-gate-form');
  var input = document.getElementById('access-gate-input');
  var error = document.getElementById('access-gate-error');

  if (!gate || !form || !input) return;

  var unlock = function () {
    gate.hidden = true;
    body.classList.remove('is-locked');
  };

  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    unlock();
    return;
  }

  body.classList.add('is-locked');
  gate.hidden = false;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      unlock();
    } else {
      error.hidden = false;
      input.value = '';
      input.focus();
    }
  });
})();
