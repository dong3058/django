document.addEventListener('DOMContentLoaded',()=>{
    const mainContent = document.getElementById('main-content');
    const buttons = document.querySelectorAll('.product-div');
    const product_ex=document.getElementsByClassName("product-description");

        if (buttons.length > 0) {
        const initialImage = buttons[0].dataset.image;
        if (initialImage) {
            mainContent.style.backgroundImage = `url('${initialImage}')`;
        }
        product_ex[0].textConten=`url('${initialImage}')`;
        buttons[0].classList.add("active")
    }
    buttons.forEach(button => {
        button.addEventListener('click', function() {

            buttons.forEach(btn => btn.classList.remove("active"));


            this.classList.add('active')


            const imageUrl = this.dataset.image;
            product_ex[0].textContent=this.dataset.image.toString()

            if (imageUrl) {
                mainContent.style.backgroundImage = `url('${imageUrl}')`;
            }
        });
    });

})