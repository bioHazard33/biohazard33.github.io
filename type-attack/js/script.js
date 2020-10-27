document.addEventListener('DOMContentLoaded', function() {
    const elem = document.querySelector('select');
    let instance = M.FormSelect.init(elem);
    const startBtn=document.querySelector('#start-btn');

    startBtn.addEventListener('click',()=>{
        let difficulty=document.querySelector('#select').value
        localStorage.setItem('difficulty',difficulty)

        let zen=document.querySelector('#zen').checked
        if(zen===true){
            localStorage.setItem('zen','true')
        }
        else{
            localStorage.setItem('zen','false')
        }

        let bg=document.querySelector('#myVideo')
        bg.style.zIndex=3;

        let ship=document.querySelector('ship')
        
        
        // window.location.href="/game.html" 
    });
});