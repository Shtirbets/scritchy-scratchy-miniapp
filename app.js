(() => {
  const tg = window.Telegram?.WebApp;
  tg?.ready(); tg?.expand();
  const moneyEl = document.querySelector('#money'), ticketsEl = document.querySelector('#tickets'), bestEl = document.querySelector('#best');
  const grid = document.querySelector('#scratchGrid');
  let money = Number(localStorage.money || 100), tickets = Number(localStorage.tickets || 0), best = Number(localStorage.best || 0);
  const save = () => { localStorage.money=money; localStorage.tickets=tickets; localStorage.best=best; moneyEl.textContent=`$${money}`; ticketsEl.textContent=tickets; bestEl.textContent=`$${best}`; };
  function newTicket(){ grid.innerHTML=''; const win=Math.floor(Math.random()*3); for(let i=0;i<9;i++){ const b=document.createElement('button'); b.className='cell'; b.textContent='?'; b.dataset.value=i%3===win?'$25':'$0'; b.addEventListener('pointerdown',()=>{ if(b.classList.contains('revealed'))return; b.classList.add('revealed'); b.textContent=b.dataset.value; if(b.dataset.value!=='$0'){money+=25;best=Math.max(best,25)} tickets++; save(); tg?.HapticFeedback?.impactOccurred('light'); }); grid.appendChild(b); } }
  document.querySelector('#newTicket').addEventListener('click',newTicket); save(); newTicket();
})();
