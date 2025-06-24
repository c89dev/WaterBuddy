    const APP_VERSION = '0.0.8'
    let dlcount = null;
    TextTrackList = new Text;

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
            document.getElementById('remainingLbl').textContent = dlcount;
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
    if(confirm("Are you sure you want to Reset?")){   
        e.preventDefault();
        localStorage.clear();
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

    
    //TIMER
    export function newDayReset(){

        const currentDay = new Date().getDay().toLocaleString();
        let currentHour = new Date().getHours().toLocaleString();
        let currentMin = new Date().getMinutes().toLocaleString();
        let currentSec = new Date().getSeconds().toLocaleString();
        
        if (currentHour == 0 && currentMin == 0 && currentSec < 1){
            console.log("WRITING LOG")
            console.log("RESETTING")
        }
    }

    //LOGGER
    export function journal(){
        journal.addEventListener(handleResetClick);{

        }
    }

    
    


