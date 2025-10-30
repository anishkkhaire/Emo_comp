function MoodChart({ data }) {
  try {
    const chartRef = React.useRef(null);
    const chartInstanceRef = React.useRef(null);

    React.useEffect(() => {
      if (chartRef.current) {
        if (data.length === 0) {
          return;
        }
        const ctx = chartRef.current.getContext('2d');
        
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const emotionScores = {
          joy: 5,
          surprise: 4,
          neutral: 3,
          fear: 2,
          sadness: 1,
          anger: 1
        };

        const recentData = data.slice(0, 20).reverse();
        const labels = recentData.map((item, index) => {
          const date = new Date(item.objectData.timestamp);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        const values = recentData.map(item => emotionScores[item.objectData.emotion] || 3);

        chartInstanceRef.current = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Emotional State',
              data: values,
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointHoverRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              y: {
                min: 0,
                max: 6,
                ticks: {
                  callback: (value) => {
                    const emotionLabels = ['', 'Low', 'Calm', 'Neutral', 'Good', 'Great'];
                    return emotionLabels[value] || '';
                  }
                }
              }
            }
          }
        });
      }

      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    }, [data]);

    if (data.length === 0) {
      return null;
    }

    return (
      <div className="card" data-name="mood-chart" data-file="components/MoodChart.js">
        <div className="flex items-center gap-2 mb-6">
          <div className="icon-trending-up text-xl text-[var(--primary-color)]"></div>
          <h3 className="text-xl font-bold">Emotional Trend</h3>
        </div>
        <div style={{ height: '320px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MoodChart component error:', error);
    return null;
  }
}