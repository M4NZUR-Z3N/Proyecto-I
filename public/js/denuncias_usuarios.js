document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 3;                   // denuncias por página
    let currentPage = 1;
  
    
    const items = Array.from(document.querySelectorAll('.denuncias .denun'));
    const totalPages = Math.ceil(items.length / itemsPerPage);
  
    
    const btnPrev  = document.getElementById('anteriorpag');
    const btnNext  = document.getElementById('sigPage');
    const pageInfo = document.getElementById('pagInfo');
  
    function showPage(page) {
      
      page = Math.max(1, Math.min(page, totalPages));
      currentPage = page;
  
      const start = (page - 1) * itemsPerPage;
      const end   = start + itemsPerPage;
  
      items.forEach((el, idx) => {
        el.style.display = (idx >= start && idx < end) ? '' : 'none';
      });
  
      pageInfo.textContent     = `Página ${currentPage} de ${totalPages}`;
      btnPrev.disabled         = currentPage === 1;
      btnNext.disabled         = currentPage === totalPages;
    }
  
    btnPrev.addEventListener('click', () => showPage(currentPage - 1));
    btnNext.addEventListener('click', () => showPage(currentPage + 1));
  
   
    showPage(1);
  });
  
  
  