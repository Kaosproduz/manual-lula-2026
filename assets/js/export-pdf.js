// export-pdf.js — botão "Exportar PDF": aciona a impressão nativa do navegador,
// que usa print.css para gerar um PDF fiel ao layout (Salvar como PDF no destino).

(function () {
  const btn = document.getElementById('export-pdf');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.print();
  });
})();
