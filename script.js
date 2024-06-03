document.addEventListener("DOMContentLoaded", function() {
    function updateTimeAndDate() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const date = now.toDateString();
        
        document.getElementById('time').textContent = time;
        document.getElementById('date').textContent = date;

        // Update theme based on time of day
        const bodyClass = document.body.classList;
        bodyClass.remove('day', 'afternoon', 'night');
        
        if (hours >= 6 && hours < 12) {
            bodyClass.add('day');
        } else if (hours >= 12 && hours < 18) {
            bodyClass.add('afternoon');
        } else {
            bodyClass.add('night');
        }
    }

    async function fetchNews() {
        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?sources=the-times-of-india&apiKey=e9de46fe7be04ebfb330f39025a83e7a');
            const data = await response.json();
            const newsList = document.getElementById('news-list');
            newsList.innerHTML = '';

            data.articles.forEach(article => {
                const li = document.createElement('li');
                li.textContent = article.title;
                newsList.appendChild(li);
            });
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    updateTimeAndDate();
    setInterval(updateTimeAndDate, 1000);
    fetchNews();
    setInterval(fetchNews, 60000); // Update news every minute
});
