let loadedData;

const cardContainer = document.getElementById('card-container');

// sort area start here:-
const sortView = document.getElementById('sort-view');
sortView.addEventListener('click', function () {
    const sortedData = loadedData.sort((a, b) => b.others.views.slice(0, -1) - a.others.views.slice(0, -1));
    cardContainer.innerHTML = '';
    console.log(sortedData);
    sortedData.forEach((individualData) => {
        // console.log(individualData.others.posted_date);
        let seconds = individualData.others.posted_date;
        let hours = parseInt(seconds / 3600);
        let remainingSeconds = seconds % 3600;
        let minute = parseInt(remainingSeconds / 60);
        // console.log(`hours: ${hours} minute: ${minute}`);
        let formattedTime = `hours: ${hours} minute: ${minute}`;
        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure class="flex-col !items-end">
        <img class="h-48 object-cover w-full" src="${individualData.thumbnail}" alt="">
        <p class="bg-black text-white p-2 rounded z-20 relative -top-14">${formattedTime}</p>
                </figure>    
                <div class="avatar flex items-center gap-3 mt-5">
                    <div class="w-14 rounded-full ml-1">
                        <img src="${individualData.authors[0].profile_picture}" alt="">
                    </div>
                    <h2 class="text-xl text-[#171717] font-bold">${individualData.title}</h2>
                </div>
                <div class="my-1 ml-[4.5rem]">
                    <span class="text-lg font-medium text-[#171717B3]">${individualData.authors[0].profile_name}
                        <i class="fa-solid fa-certificate text-[#2568EF]"></i>
                    </span>
                    <p class="text-lg text-[#171717B3]">${individualData.others.views} views</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    })
});


// tab container start here:-
const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    const tabData = data.data;
    tabData.forEach((category) => {
        // console.log(category)
        const tabDiv = document.createElement('div');
        tabDiv.classList = ('p-1 md:p-2 lg:p-4');
        tabDiv.innerHTML = `
        <a onclick="handleTab('${category.category_id}')" class="btn cursor-pointer rounded text-[#171717B3] px-3 py-1 text-lg font-medium hover:bg-[#FF1F3D] hover:text-white">${category.category}</a>
        `;
        tabContainer.appendChild(tabDiv);
    })
};

const handleTab = async (handleId) => {
    // console.log(handleId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${handleId}`);
    const data = await response.json();
    console.log(data.data.length);

    loadedData = data.data;

    if (data.data.length === 0) {
        cardContainer.innerHTML = `
        <figure class="flex flex-col items-center text-center">
        <img src="./images/icon.png" alt="">
        <p class="text-2xl font-bold text-[#171717]">Oops!! Sorry, There is no content here</p>
        </figure>
        `
        return undefined;
    }
    cardContainer.innerHTML = '';
    const cardData = data.data;
    cardData.forEach((individualData) => {
        // console.log(individualData.others.posted_date);
        let seconds = individualData.others.posted_date;
        let hours = parseInt(seconds / 3600);
        let remainingSeconds = seconds % 3600;
        let minute = parseInt(remainingSeconds / 60);
        // console.log(`hours: ${hours} minute: ${minute}`);
        let formattedTime = `hours: ${hours} minute: ${minute}`;
        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                <figure class="flex-col !items-end">
                    <img class="h-48 object-cover w-full" src="${individualData.thumbnail}" alt="">
                    <p class="bg-black text-white p-2 rounded z-20 relative -top-14">${formattedTime}</p>
                </figure>   
                <div class="avatar flex items-center gap-3 mt-5">
                    <div class="w-14 rounded-full ml-1">
                        <img src="${individualData.authors[0].profile_picture}" alt="">
                    </div>
                    <h2 class="text-xl text-[#171717] font-bold">${individualData.title}</h2>
                </div>
                <div class="my-1 ml-[4.5rem]">
                    <span class="text-lg font-medium text-[#171717B3]">${individualData.authors[0].profile_name}
                        <i class="fa-solid fa-certificate text-[#2568EF]"></i>
                    </span>
                    <p class="text-lg text-[#171717B3]">${individualData.others.views} views</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    })
}

handleCategory();

handleTab('1000');

