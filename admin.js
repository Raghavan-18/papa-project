document.addEventListener('DOMContentLoaded', () => {
    const widgetsContainer = document.getElementById('widgetsContainer');

    const widgetsData = [
        {
            title: 'Total Users',
            value: dashboardStats.totalUsers,
            icon: 'fa-users',
            color: 'var(--primary-blue)'
        },
        {
            title: 'Total Schemes',
            value: dashboardStats.totalSchemes,
            icon: 'fa-folder-open',
            color: 'var(--accent-cyan)'
        },
        {
            title: 'Active Applications',
            value: dashboardStats.activeApplications,
            icon: 'fa-file-invoice',
            color: '#f59e0b'
        },
        {
            title: 'Success Rate',
            value: dashboardStats.successRate,
            icon: 'fa-chart-line',
            color: '#10b981'
        }
    ];

    if (widgetsContainer) {
        widgetsData.forEach(widget => {
            const card = document.createElement('div');
            card.className = 'dashboard-section widget-card';
            card.style.margin = '0';
            
            card.innerHTML = `
                <div class="widget-icon" style="background: ${widget.color}; box-shadow: 0 4px 10px ${widget.color}40;">
                    <i class="fa-solid ${widget.icon}"></i>
                </div>
                <div class="widget-info">
                    <h4>${widget.title}</h4>
                    <div class="value">${widget.value}</div>
                </div>
            `;
            
            widgetsContainer.appendChild(card);
        });
    }
});
