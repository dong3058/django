const itemsPerPage = 10;
const maxPageButtons = 5;
let currentPage = 1;
let totalPages = 1;

async function fetchData(page=1) {
    try {
        const response = await fetch(`/pages/get/notifylists/${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        displayData(result.data);
        totalPages = result.data.totalCount;
        currentPage = result.data.currentPage;
        setupPagination();
    } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
        const dataContainer = document.getElementById('data-container');
        dataContainer.innerHTML = '<p>데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</p>';
    }
}
function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    if (data.length === 0) {
        dataContainer.innerHTML = '<p>표시할 데이터가 없습니다.</p>';
        return;
    }

    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('data-item');
                div.innerHTML = `
            <a href="/pages/file/${item.id}/" class="data-item-link">
                <strong>${item.title}</strong>
                <small>작성일: ${item.pub_date}</small>
            </a>
        `;
        dataContainer.appendChild(div);
    });
}

function setupPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
    const currentButtonGroup = Math.ceil(currentPage / maxPageButtons);
    let startPage = (currentButtonGroup - 1) * maxPageButtons + 1;
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);


    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '이전';
        prevButton.addEventListener('click', () => {
            currentPage = currentPage - 1; // 단순히 1페이지 감소
            fetchData(currentPage);
        });
        paginationContainer.appendChild(prevButton);
    }
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            fetchData(currentPage);
        });
        paginationContainer.appendChild(button);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '다음';
        nextButton.addEventListener('click', () => {
            currentPage = currentPage + 1;
            fetchData(currentPage);
        });
        paginationContainer.appendChild(nextButton);
    }
}


fetchData(currentPage);