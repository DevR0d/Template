import React, { useEffect, useRef } from 'react';

type ChartProps = {
  data?: any;
};

export const LineChart: React.FC<ChartProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Set dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 40;
    
    // Sample data
    const data = [
      { month: 'Jan', value: 65 },
      { month: 'Feb', value: 59 },
      { month: 'Mar', value: 80 },
      { month: 'Apr', value: 81 },
      { month: 'May', value: 56 },
      { month: 'Jun', value: 55 },
      { month: 'Jul', value: 40 },
      { month: 'Aug', value: 70 },
      { month: 'Sep', value: 90 },
      { month: 'Oct', value: 75 },
      { month: 'Nov', value: 60 },
      { month: 'Dec', value: 85 },
    ];
    
    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.value));
    
    // Calculate scaling
    const xScale = (width - padding * 2) / (data.length - 1);
    const yScale = (height - padding * 2) / maxValue;
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb'; // gray-200
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw horizontal grid lines
    const gridCount = 5;
    ctx.textAlign = 'right';
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#6b7280'; // gray-500
    
    for (let i = 0; i <= gridCount; i++) {
      const y = height - padding - (i * (height - padding * 2) / gridCount);
      const value = Math.round(i * maxValue / gridCount);
      
      ctx.beginPath();
      ctx.strokeStyle = '#e5e7eb'; // gray-200
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      ctx.fillText(value.toString(), padding - 5, y + 3);
    }
    
    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#3b82f6'; // blue-500
    ctx.lineWidth = 2;
    
    data.forEach((d, i) => {
      const x = padding + i * xScale;
      const y = height - padding - d.value * yScale;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      // Draw point
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    ctx.stroke();
    
    // Draw area under the line
    ctx.beginPath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'; // blue-500 with opacity
    
    data.forEach((d, i) => {
      const x = padding + i * xScale;
      const y = height - padding - d.value * yScale;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.lineTo(padding + (data.length - 1) * xScale, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw x-axis labels
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6b7280'; // gray-500
    
    data.forEach((d, i) => {
      const x = padding + i * xScale;
      ctx.fillText(d.month, x, height - padding + 15);
    });
    
  }, [canvasRef]);
  
  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export const PieChart: React.FC<ChartProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Set dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    
    // Sample data
    const data = [
      { name: 'Warehouse A', value: 30, color: '#3b82f6' }, // blue-500
      { name: 'Warehouse B', value: 25, color: '#10b981' }, // green-500
      { name: 'Warehouse C', value: 15, color: '#f59e0b' }, // amber-500
      { name: 'Warehouse D', value: 20, color: '#ef4444' }, // red-500
      { name: 'Warehouse E', value: 10, color: '#8b5cf6' }, // purple-500
    ];
    
    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Draw pie segments
    let startAngle = -Math.PI / 2; // Start at top
    
    data.forEach((item, index) => {
      const sliceAngle = (2 * Math.PI * item.value) / total;
      const endAngle = startAngle + sliceAngle;
      
      // Draw pie segment
      ctx.beginPath();
      ctx.fillStyle = item.color;
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      
      // Calculate position for labels
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);
      
      // Draw percentage labels
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const percentage = Math.round((item.value / total) * 100);
      ctx.fillText(`${percentage}%`, labelX, labelY);
      
      startAngle = endAngle;
    });
    
    // Draw legend
    const legendStartY = height - data.length * 20 - 10;
    
    data.forEach((item, index) => {
      const y = legendStartY + index * 20;
      
      // Draw color box
      ctx.fillStyle = item.color;
      ctx.fillRect(width - 150, y, 12, 12);
      
      // Draw text
      ctx.fillStyle = '#4b5563'; // gray-700
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(item.name, width - 130, y);
    });
    
  }, [canvasRef]);
  
  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      style={{ width: '100%', height: '100%' }}
    />
  );
};