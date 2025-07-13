document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const buttons = document.querySelectorAll('.image-button');
    const product_ex=document.getElementById("link_btn");
    // 페이지 로드 시 첫 번째 버튼에 해당하는 이미지로 main 배경 설정
    // 그리고 첫 번째 버튼을 활성화 상태로 유지
    if (buttons.length > 0) {
        const initialImage = buttons[0].dataset.image;
        if (initialImage) {
            mainContent.style.backgroundImage = `url('${initialImage}')`;
        }
        buttons[0].classList.add('active'); // 첫 번째 버튼을 활성화
    }
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 버튼에서 'active' 클래스 제거
            buttons.forEach(btn => btn.classList.remove('active'));

            // 클릭된 버튼에 'active' 클래스 추가하여 하이라이트
            this.classList.add('active');

            // 클릭된 버튼의 data-image 값 가져오기
            const imageUrl = this.dataset.image;
            product_ex.textContent=this.dataset.image.toString()
            // main-content의 배경 이미지 변경
            if (imageUrl) {
                mainContent.style.backgroundImage = `url('${imageUrl}')`;
            }
        });
    });
});