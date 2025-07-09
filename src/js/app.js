document.addEventListener('DOMContentLoaded', function () {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function getInputValues(prefix) {
        return months.map(m => {
            const id = `${prefix}-${m.slice(0,3).toLowerCase()}`;
            const val = document.getElementById(id)?.value;
            return val ? Number(val) : 0;
        });
    }

    let chart;
    function renderChart() {
        const incomeData = getInputValues('income');
        const expenseData = getInputValues('expenses');
        const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
        if (chart) chart.destroy();
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    },
                    {
                        label: 'Expenses',
                        data: expenseData,
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Update chart when tab is shown
    document.getElementById('chart-tab').addEventListener('shown.bs.tab', renderChart);

    // Optionally, update chart live when inputs change
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function () {
            if (document.getElementById('chart').classList.contains('active')) {
                renderChart();
            }
        });
    });

      document.getElementById('downloadChart').addEventListener('click', function() {
      const canvas = document.getElementById('incomeExpenseChart');
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'income-expense-chart.png';
      link.click();
    });
    

});