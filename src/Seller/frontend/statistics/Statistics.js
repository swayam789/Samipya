import React, { useState,} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { FaChartLine, FaBoxes, FaUsers, FaPercentage } from 'react-icons/fa';
import './Statistics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Statistics = () => {
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [selectedProduct, setSelectedProduct] = useState('All');

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedProduct('All');
    };

    const demoCategories = ['All Products', 'Electronics', 'Clothing', 'Food', 'Accessories'];
    const demoProducts = {
        'Electronics': ['All', 'Smartphones', 'Laptops', 'Tablets', 'Headphones'],
        'Clothing': ['All', 'T-Shirts', 'Jeans', 'Dresses', 'Jackets'],
        'Food': ['All', 'Snacks', 'Beverages', 'Frozen Foods', 'Canned Goods'],
        'Accessories': ['All', 'Watches', 'Bags', 'Jewelry', 'Belts']
    };

    const productSalesData = {
        'Smartphones': [300, 280, 350, 400, 380, 450, 480, 460, 500, 520, 550, 580],
        'Laptops': [200, 190, 220, 250, 230, 280, 300, 290, 320, 340, 360, 380],
        'Tablets': [150, 140, 160, 180, 170, 200, 220, 210, 240, 260, 280, 300],
        'Headphones': [100, 90, 110, 120, 115, 130, 140, 135, 150, 160, 170, 180],
        
        'T-Shirts': [150, 130, 180, 200, 190, 220, 240, 230, 260, 280, 300, 320],
        'Jeans': [120, 100, 140, 160, 150, 180, 200, 190, 220, 240, 260, 280],
        'Dresses': [80, 70, 90, 100, 95, 110, 120, 115, 130, 140, 150, 160],
        'Jackets': [60, 50, 70, 80, 75, 90, 100, 95, 110, 120, 130, 140],
        
        'Snacks': [180, 160, 200, 220, 210, 240, 260, 250, 280, 300, 320, 340],
        'Beverages': [150, 140, 160, 180, 170, 200, 220, 210, 240, 260, 280, 300],
        'Frozen Foods': [100, 90, 110, 120, 115, 130, 140, 135, 150, 160, 170, 180],
        'Canned Goods': [80, 70, 90, 100, 95, 110, 120, 115, 130, 140, 150, 160],
        
        'Watches': [70, 60, 80, 90, 85, 100, 110, 105, 120, 130, 140, 150],
        'Bags': [90, 80, 100, 110, 105, 120, 130, 125, 140, 150, 160, 170],
        'Jewelry': [50, 40, 60, 70, 65, 80, 90, 85, 100, 110, 120, 130],
        'Belts': [40, 30, 50, 60, 55, 70, 80, 75, 90, 100, 110, 120]
    };

    const salesData = {
        'All Products': [2100, 1800, 2300, 2800, 2600, 3100, 3400, 3200, 3800, 4100, 4500, 4800],
        'Electronics': [800, 750, 900, 1000, 950, 1200, 1300, 1250, 1400, 1500, 1600, 1700],
        'Clothing': [600, 500, 700, 800, 750, 900, 1000, 950, 1100, 1200, 1300, 1400],
        'Food': [400, 350, 400, 600, 500, 600, 700, 600, 800, 900, 1000, 1100],
        'Accessories': [300, 200, 300, 400, 400, 400, 400, 400, 500, 500, 600, 600]
    };

    const getSalesData = () => {
        if (selectedCategory === 'All Products') {
            return salesData['All Products'];
        } else if (selectedProduct === 'All') {
            return salesData[selectedCategory];
        } else {
            return productSalesData[selectedProduct];
        }
    };

    const currentSalesData = getSalesData();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            title: {
                display: true,
                text: `Sales Performance Overview ${selectedYear}`,
                font: {
                    size: 16,
                    weight: '600'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1a202c',
                bodyColor: '#4a5568',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: (context) => `Sales: ${context.parsed.y.toLocaleString()} units`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    callback: value => value.toLocaleString()
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    const data = {
        labels: months,
        datasets: [
            {
                label: selectedProduct === 'All' ? selectedCategory : selectedProduct,
                data: currentSalesData,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    const calculateGrowthRate = () => {
        const firstMonth = currentSalesData[0];
        const lastMonth = currentSalesData[currentSalesData.length - 1];
        return ((lastMonth - firstMonth) / firstMonth * 100).toFixed(1);
    };

    return (
        <div className="det-content">
            <div className="statistics-container">
                <div className="statistics-header">
                    <h1>Sales Analytics</h1>
                    <div className="controls">
                        <div className="control-group">
                            <label>Product Category:</label>
                            <select 
                                value={selectedCategory} 
                                onChange={handleCategoryChange}
                            >
                                {demoCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        
                        {selectedCategory !== 'All Products' && (
                            <div className="control-group">
                                <label>Specific Product:</label>
                                <select 
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                >
                                    {demoProducts[selectedCategory].map(product => (
                                        <option key={product} value={product}>{product}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="summary-grid">
                    <div className="summary-card">
                        <FaChartLine className="summary-icon" />
                        <div className="summary-content">
                            <h3>Total Sales</h3>
                            <p>{currentSalesData[11].toLocaleString()}</p>
                            <span className="trend positive">+12.5% vs last month</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <FaBoxes className="summary-icon" />
                        <div className="summary-content">
                            <h3>Annual Sales</h3>
                            <p>{currentSalesData.reduce((a, b) => a + b, 0).toLocaleString()}</p>
                            <span className="trend positive">+8.3% vs last year</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <FaUsers className="summary-icon" />
                        <div className="summary-content">
                            <h3>Average Sales</h3>
                            <p>{Math.round(currentSalesData.reduce((a, b) => a + b, 0) / 12).toLocaleString()}</p>
                            <span className="trend neutral">0% change</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <FaPercentage className="summary-icon" />
                        <div className="summary-content">
                            <h3>Growth Rate</h3>
                            <p>{calculateGrowthRate()}%</p>
                            <span className="trend positive">Yearly growth</span>
                        </div>
                    </div>
                </div>

                <div className="graph-container">
                    <div className="graph">
                        <Line options={options} data={data} height={400} />
                    </div>
                    <div className="year-control">
                        <button onClick={() => setSelectedYear(prev => prev - 1)}>◀</button>
                        <span>{selectedYear}</span>
                        <button onClick={() => setSelectedYear(prev => prev + 1)}>▶</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics; 