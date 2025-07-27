document.addEventListener('DOMContentLoaded', function() {
    const tabHeaders = document.querySelectorAll('.tab-header-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {

            tabHeaders.forEach(item => item.classList.remove('active'));

            tabPanes.forEach(pane => pane.classList.remove('active'));

            this.classList.add('active');

            const targetTabId = this.dataset.tab;

            document.getElementById(targetTabId).classList.add('active');
        });
    });
});