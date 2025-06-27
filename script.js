    const APP_VERSION = '0.1.0'
    
    let dlcount = null;
    let drank = null;

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
        let drank = Number(localStorage.getItem('drank'));
        let dlcount = Number(localStorage.getItem('dlcount'));
        const glugg = new Audio('glugg.mp3')
        if(dlcount > 0){
            dlcount--;
            drank++;
            document.getElementById('remainingLbl').textContent = dlcount;
            localStorage.setItem('dlcount', dlcount);
            localStorage.setItem('drank', drank);
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

        export function pressDrinkBtn(){
        window.addEventListener('pointercancel', drinkAnim2);
        const drinkBtn = document.getElementById('drinkBtnId');
        if(drinkBtn){
            ['pointerdown'].forEach(evt =>
            drinkBtn.addEventListener(evt, drinkAnim)
            );
        }
    }

        export function releaseDrinkBtn(){
        window.addEventListener('pointercancel', drinkAnim2);
        const drinkBtn = document.getElementById('drinkBtnId');
        if(drinkBtn){
            ['pointerup'].forEach(evt =>
            drinkBtn.addEventListener(evt, drinkAnim2)
            );
        }
    }

    function drinkAnim(e){
        
        const img = document.querySelector('.cupBtn img');
        img.style.transform = 'scale(1.3)';
    }
        function drinkAnim2(e){
        
        const img = document.querySelector('.cupBtn img');
        img.style.transform = 'scale(1.1)';
    }

    //RESET BUTTON
    function handleResetClick(e){
    if(confirm("Reset the cup? Journal will not be affected.")){   
        e.preventDefault();
        localStorage.removeItem('dlcount');
        localStorage.removeItem('drank');

        dlcount = null;
        window.location.href = 'index.html';
    }

    }
    
    
    export function initResetBtn(){
        const resetBtn = document.getElementById('resetBtnId');
        if(resetBtn) {
            ['pointerup'].forEach(evt =>
            resetBtn.addEventListener(evt, handleResetClick)
            );
        }
    }

    

    //JOURNAL BUTTON
    function handleJournalClick(e){
        window.location.href = 'page3.html';
    }

    export function initJournalBtn(){
        const journalBtn = document.getElementById('journalBtnId');
        if(journalBtn){
            journalBtn.addEventListener('pointerup', handleJournalClick);
        }
    }

    //BACK BUTTON
    function handleBackClick(e){
        window.location.href = 'page2.html';
    }

    export function initBackBtn(){
        const backBtn = document.getElementById('backBtnId');
        if(backBtn){
            backBtn.addEventListener('pointerup', handleBackClick);
        }
    }

    //MAKE ENTRY BUTTON
    function handleEntryClick(e){
        journal();
    }

    export function initEntryBtn(){
        const entryBtn = document.getElementById('entryBtnId');
        if(entryBtn){
            entryBtn.addEventListener('pointerup', handleEntryClick);
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
        document.getElementById('remainingLbl').textContent = `${remaining}`;
        }
    }

    //LOCAL TIME
    export function initLocalTime(){
        const day = new Date().toLocaleDateString(undefined, { weekday: 'long' });
        document.getElementById('timeDisplayId').textContent = day;


    }

    
    //TIMER (Background tasks not possible in regular PWA)
    export function newDayReset(){

        let timestamp = new Intl.DateTimeFormat('nb-NO').format(new Date());
        const currentDay = new Date().getDay().toLocaleString();
        let currentHour = new Date().getHours().toLocaleString();
        let currentMin = new Date().getMinutes().toLocaleString();
        let currentSec = new Date().getSeconds().toLocaleString();
        let paragraph = document.getElementById('logParaId');
    }

    //LOGGER
    export function journal(){
        let drank = Number(localStorage.getItem('drank'));
        let dlcount = Number(localStorage.getItem('dlcount'));
        let timestamp = new Intl.DateTimeFormat('nb-NO').format(new Date());
        let paragraph = document.getElementById('logParaId');

        let existingLog = localStorage.getItem('paragraph') || '';
        let newEntry = `${timestamp}, ${drank} dl consumed`;

        let updatedLog = existingLog + newEntry + '\n';

        paragraph.innerText = updatedLog;
        localStorage.setItem('paragraph', updatedLog);

    }
    

    
    


