import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartDataset } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    if (!canvas) return;

    const lineChart = canvas.getContext('2d');
    if (!lineChart) return;

    const options = {
      borderWidth: 2,
      cubicInterpolationMode: 'monotone' as const,
      pointRadius: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderWidth: 4
    };

    const gradientProfit = lineChart.createLinearGradient(0, 0, 0, canvas.height);
    gradientProfit.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
    gradientProfit.addColorStop(1, 'rgba(0, 0, 0, 0)');

    const gradientLoss = lineChart.createLinearGradient(0, 0, 0, canvas.height);
    gradientLoss.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
    gradientLoss.addColorStop(1, 'rgba(0, 0, 0, 0)');

    const datasets: ChartDataset<'line'>[] = [
      {
        label: 'Profit',
        data: [1200, 1300, 1100, 1250, 1400, 1550, 1650],
        ...options,
        borderColor: '#22c55e',
        fill: 'start',
        backgroundColor: gradientProfit
      },
      {
        label: 'Loss',
        data: [500, 700, 650, 620, 580, 600, 590],
        ...options,
        borderColor: '#ef4444',
        fill: 'start',
        backgroundColor: gradientLoss
      }
    ];

    new Chart(canvas, {
      type: 'line',
      data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], datasets },
      options: {
        plugins: {
          legend: { display: true },
          tooltip: {
            backgroundColor: 'rgba(53, 27, 92, 0.8)',
            caretPadding: 5,
            boxWidth: 5,
            usePointStyle: true,
            boxPadding: 3
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            ticks: {
              callback: value => '$ ' + value,
              stepSize: 100
            }
          }
        }
      }
    });
  }

  // table

  orders = [
    {
      orderId: '#TBT20',
      customer: 'BlueSky Hotels',
      productName: 'Smartphone X10',
      amount: 1120.99,
      orderDate: '12 Mar, 2023',
      deliveryDate: '22 Mar, 2023',
      paymentMethod: 'Visa',
      deliveryStatus: 'Approved',
    },
    {
      orderId: '#TBT19',
      customer: 'Golden Fork Restaurant',
      productName: 'Wireless Earbuds',
      amount: 199.99,
      orderDate: '18 Feb, 2023',
      deliveryDate: '28 Feb, 2023',
      paymentMethod: 'COD',
      deliveryStatus: 'Requested',
    },
    {
      orderId: '#TBT18',
      customer: 'TechNova Solutions',
      productName: '4K LED TV',
      amount: 1256.75,
      orderDate: '05 Apr, 2023',
      deliveryDate: '15 Apr, 2023',
      paymentMethod: 'Mastercard',
      deliveryStatus: 'Rejected',
    },
    {
      orderId: '#TBT17',
      customer: 'CloudNet IT Services',
      productName: 'Gaming Laptop',
      amount: 2678.5,
      orderDate: '21 Jan, 2023',
      deliveryDate: '30 Jan, 2023',
      paymentMethod: 'Visa',
      deliveryStatus: 'Pending',
    },
    {
      orderId: '#TBT16',
      customer: 'FitHub Gym',
      productName: 'Fitness Tracker',
      amount: 145.25,
      orderDate: '12 Feb, 2023',
      deliveryDate: '20 Feb, 2023',
      paymentMethod: 'PayPal',
      deliveryStatus: 'Approved',
    },
    {
      orderId: '#TBT15',
      customer: 'Acoustic Lounge',
      productName: 'Bluetooth Speaker',
      amount: 89.99,
      orderDate: '07 Mar, 2023',
      deliveryDate: '17 Mar, 2023',
      paymentMethod: 'COD',
      deliveryStatus: 'Requested',
    },
    {
      orderId: '#TBT14',
      customer: 'PowerGrid Industries',
      productName: 'Portable Charger',
      amount: 45.99,
      orderDate: '11 Apr, 2023',
      deliveryDate: '21 Apr, 2023',
      paymentMethod: 'Mastercard',
      deliveryStatus: 'Rejected',
    },
    {
      orderId: '#TBT13',
      customer: 'Harmony Recording Studio',
      productName: 'Noise-Cancelling Headphones',
      amount: 199.99,
      orderDate: '25 May, 2023',
      deliveryDate: '04 Jun, 2023',
      paymentMethod: 'Visa',
      deliveryStatus: 'Pending',
    },
    {
      orderId: '#TBT12',
      customer: 'SafeHome Security',
      productName: 'Smart Home Camera',
      amount: 349.99,
      orderDate: '10 Jun, 2023',
      deliveryDate: '20 Jun, 2023',
      paymentMethod: 'PayPal',
      deliveryStatus: 'Approved',
    },
    {
      orderId: '#TBT11',
      customer: 'PrimeWave Telecom',
      productName: 'Tablet Pro 11',
      amount: 899.99,
      orderDate: '15 Jul, 2023',
      deliveryDate: '25 Jul, 2023',
      paymentMethod: 'COD',
      deliveryStatus: 'Requested',
    }
  ];
  
  
  itemsPerPage = 8;
  currentPage = 1;
  paginatedOrders = this.orders.slice(0, this.itemsPerPage);

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'badge-success';
      case 'Rejected':
        return 'badge-danger';
      case 'Pending':
        return 'badge-warning';
      case 'RETURNS':
        return 'badge-secondary';
      case 'Requested':
        return 'badge-primary';
      default:
        return 'badge-light';
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedOrders();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedOrders();
    }
  }

  updatePaginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(start, end);
  }
}