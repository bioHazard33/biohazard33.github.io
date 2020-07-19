var before=document.querySelector('.before');
var after=document.querySelector('.after');
var btn=document.querySelector('.btn');

btn.addEventListener('click',()=>{
    before.style.display="none";
    after.style.display="block"
})