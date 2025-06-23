    const APP_VERSION = '0.0.7'
    let dlcount = null;

    // Initialize Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`sw.js?v=${APP_VERSION}`)
        .then(() => console.log('SW registered'))
        .catch(console.error);
    }

    //START BUTTON
    function handleStartClick(e){
        e.preventDefault();
        const goal = document.getElementById('goal');
        dlcount = Number(goal.value);
        localStorage.setItem('dlcount', dlcount);
        window.location.href = 'page2.html';
        console.log('dlcount set to', dlcount);
    }

    export function initStartBtn() {
        const startBtn = document.getElementById('readyChoice');
        if(startBtn){
            ['pointerup'].forEach(evt =>
                startBtn.addEventListener(evt, handleStartClick)
            );
        }
    }
    
    //DRINK BUTTON
    function handleDrinkClick(e){
        e.preventDefault();
        let dlcount = Number(localStorage.getItem('dlcount'));
        const glugg = new Audio('glugg.mp3')
        if(dlcount > 0){
            dlcount--;
            document.getElementById('remainingLbl').textContent = 'Remaining: ' + dlcount;
            localStorage.setItem('dlcount', dlcount);
            console.log('Remaining desiliters:', dlcount);
            glugg.play();
            
            if (dlcount === 0){
                console.log('Desiliters reached!')
            }
        }
        else
        {
            console.log('Desiliters reached!')
            return;
        }
    }
    
    export function initDrinkBtn(){
        const drinkBtn = document.getElementById('drinkBtnId');
        if(drinkBtn){
            ['pointerup'].forEach(evt =>
            drinkBtn.addEventListener(evt, handleDrinkClick)
            );
        }
    }

    //RESET BUTTON
    function handleResetClick(e){
        e.preventDefault();
        localStorage.clear();
        dlcount = null;
        window.location.href = 'index.html';
    }
    
    export function initResetBtn(){
        const resetBtn = document.getElementById('resetBtnId');
        if(resetBtn) {
            ['pointerup'].forEach(evt =>
            resetBtn.addEventListener(evt, handleResetClick)
            );
        }
    }
    //PAGE CHECKER
    export function initPageChecker(){
        if(window.location.pathname.endsWith('index.html')&& localStorage.getItem('dlcount')){
            window.location.href = 'page2.html'
            console.log('Page was checked');
        }
    }

    //CURRENT DL
    export function initCurrentDl(){
        if(!localStorage.getItem('dlcount') == 0){
        const remaining = localStorage.getItem('dlcount');
        document.getElementById('remainingLbl').textContent = `Remaining: ${remaining}`;
        }
    }

    //LOCAL TIME
    export function initLocalTime(){
        const day = new Date().toLocaleDateString(undefined, { weekday: 'long' });
        document.getElementById('timeDisplayId').textContent = day;
    }

    
    


