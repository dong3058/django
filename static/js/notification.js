document.addEventListener('DOMContentLoaded', function() {
    console.log('notification.js loaded. DOM Content Loaded.');

    const dataContainer = document.getElementById('data-container');
    const paginationContainer = document.getElementById('pagination-container');

    const itemsPerPage = 5;
    const maxPageButtons = 5;
    let currentPage = 1;
    let totalPages = 1;

    async function fetchData(page = 1) {
        try {

            const response = await fetch(`/pages/get/notifylists/${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Fetched data:', result);


            if (Array.isArray(result.data) && typeof result.totalCount === 'number') {
                displayData(result.data);

                totalPages = Math.ceil(result.totalCount / itemsPerPage);
                currentPage = result.currentPage || page;

                setupPagination();
            } else {
                console.error('서버 응답 데이터 형식이 올바르지 않습니다:', result);
                dataContainer.innerHTML = '<p class="text-center text-red-500">데이터 형식이 올바르지 않습니다.</p>';
            }

        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
            dataContainer.innerHTML = '<p class="text-center text-red-500">데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</p>';
        }
    }


    function displayData(items) {
        console.log('Displaying items:', items);
        dataContainer.innerHTML = '';
        if (items.length === 0) {
            dataContainer.innerHTML = '<p class="text-center text-gray-500">표시할 데이터가 없습니다.</p>';
            return;
        }

        items.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('data-item');

            formatedate=item.pub_date.substring(0,10)
            div.innerHTML = `
                <a href="/pages/file/${item.id}/" class="data-item-link">
                    <h3>${item.title}</h3>
                    <p class="text-sm">작성일: ${formatedate || '날짜 미정'}</p>
                </a>
            `;
            dataContainer.appendChild(div);
        });
    }


    function setupPagination() {
        console.log(`Setting up pagination. Current Page: ${currentPage}, Total Pages: ${totalPages}`);
        paginationContainer.innerHTML = '';


        const currentButtonGroup = Math.ceil(currentPage / maxPageButtons);
        let startPage = (currentButtonGroup - 1) * maxPageButtons + 1;
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);


        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = '이전';
            prevButton.classList.add('page-button');
            prevButton.addEventListener('click', () => {
                fetchData(currentPage - 1);
            });
            paginationContainer.appendChild(prevButton);
        }


        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('page-button');
            button.dataset.page = i;

            if (i === currentPage) {
                button.classList.add('active');
            }


            button.addEventListener('click', function() {
                const pageNumber = parseInt(this.dataset.page);
                fetchData(pageNumber);
            });

            paginationContainer.appendChild(button);
        }

        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = '다음';
            nextButton.classList.add('page-button');
            nextButton.addEventListener('click', () => {
                fetchData(currentPage + 1);
            });
            paginationContainer.appendChild(nextButton);
        }
    }

    fetchData(currentPage);
});
