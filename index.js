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

        contentTitle.setAttribute('id', 'content-title');
        contentOptions.classList.add('content__options');
        contentTime.setAttribute('id', 'content-time');
        contentTimeline.setAttribute('id', 'content-timeline');

        if(time==='w'){
            contentTitle.innerText = report.title;
            contentOptions.innerText = '...'
            contentTime.innerText = `${report.timeframes.weekly.current}hrs`
            contentTimeline.innerText = `Last Week - ${report.timeframes.weekly.previous}hrs`;
        }else if(time === 'm'){
            //TODO:
        }else{
            //TODO:
        }

        contentHeader.append(contentTitle, contentOptions)
        contentDescription.append(contentTime, contentTimeline)

        reportContent.append(contentHeader, contentDescription)
        reportContainer.appendChild(reportContent);
        mainContainer.appendChild(reportContainer);
    })
}

loadData('w')