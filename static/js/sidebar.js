document.addEventListener('DOMContentLoaded',()=>{
    const sidebar=document.getElementsByClassName("sidebar")[0];
    const normal_bar=document.getElementsByClassName("normal-bar")[0];
    const hidden_bar=document.getElementsByClassName("hidden-bar")[0];
    sidebar.addEventListener('mouseenter',()=>{
            normal_bar.style.display="none";
            sidebar.style.height="300px";
            hidden_bar.style.display="flex";})
    sidebar.addEventListener("mouseleave",()=>{
            normal_bar.style.display="flex";
            sidebar.style.height="100px";
            hidden_bar.style.display="none";
    })
})