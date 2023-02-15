const dailyButton = document.getElementById('daily');
const weeklyButton = document.getElementById('weekly');
const monthlyButton = document.getElementById('monthly');

async function loadData(time){
    const request = await fetch('data.json');
    const reports = await request.json();

    const mainContainer = document.querySelector('.main__report');
    mainContainer.innerText = '';
    
    reports.forEach((report)=>{

        const reportContainer = document.createElement('div');
        const reportContent = document.createElement('div');
        const contentHeader = document.createElement('div') 
        const contentDescription = document.createElement('div')

        const contentTitle = document.createElement('span');
        const contentOptions = document.createElement('span')
        const contentTime = document.createElement('span')
        const contentTimeline = document.createElement('span')

        reportContainer.classList.add('report__container');
        reportContent.classList.add('report__content');
        contentHeader.classList.add('content__header');
        contentDescription.classList.add('content__description')

        contentTitle.classList.add('content__title');
        contentOptions.classList.add('content__options');
        contentTime.classList.add('content__time');
        contentTimeline.classList.add('content__timeline');

        let word = time.charAt().toUpperCase() + time.slice(1, (time.length -2))
        word.charAt(0) === 'D' ? word = 'Day' : null;

        contentTitle.innerText = report.title;
        contentOptions.innerText = '...'
        contentTime.innerText = `${report.timeframes[time].current}hrs`
        contentTimeline.innerText = `Last ${word} - ${report.timeframes[time].previous}hrs`;
        reportContainer.style.backgroundImage = `url('${report.image}')`;
        reportContainer.style.backgroundColor = report.color;

        contentHeader.append(contentTitle, contentOptions)
        contentDescription.append(contentTime, contentTimeline)

        reportContent.append(contentHeader, contentDescription)
        reportContainer.appendChild(reportContent);
        mainContainer.appendChild(reportContainer);
    })
}

dailyButton.onclick = (e)=>{changeTimeline(e)}
weeklyButton.onclick = (e)=>{changeTimeline(e)}
monthlyButton.onclick = (e)=>{changeTimeline(e)}

function changeTimeline(event){
    dailyButton.classList.toggle('timeline--active', false);
    weeklyButton.classList.toggle('timeline--active', false);
    monthlyButton.classList.toggle('timeline--active', false);

    event.target.classList.toggle('timeline--active', true);

    loadData(event.target.textContent.toLowerCase())
}

loadData('weekly')