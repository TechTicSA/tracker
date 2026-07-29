/**
 * Chart Components - SVG and CSS-based charts
 * Professional financial visualizations
 */

const Charts = {
  /**
   * Render donut chart
   * @param {Array} data - [{ label, value, color }]
   * @param {number} total 
   * @param {number} size 
   * @returns {string} HTML
   */
  donut(data, total, size = 200) {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;
    const thickness = size * 0.12;
    const circumference = 2 * Math.PI * radius;
    
    let currentAngle = 0;
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
    
    const segments = data.map((item, index) => {
      const percentage = item.value / total;
      const strokeDasharray = `${percentage * circumference} ${circumference}`;
      const rotation = currentAngle * 360;
      currentAngle += percentage;
      
      return `
        <circle
          cx="${centerX}"
          cy="${centerY}"
          r="${radius}"
          fill="none"
          stroke="${colors[index % colors.length]}"
          stroke-width="${thickness}"
          stroke-dasharray="${strokeDasharray}"
          transform="rotate(${rotation - 90} ${centerX} ${centerY})"
          class="transition-all duration-500 ease-out"
        >
          <title>${item.label}: ${Helpers.formatCurrency(item.value)}</title>
        </circle>
      `;
    }).join('');
    
    const totalDisplay = Helpers.formatCurrency(total);
    
    return `
      <div class="relative inline-block">
        <svg width="${size}" height="${size}" class="transform -rotate-0">
          <!-- Background circle -->
          <circle
            cx="${centerX}"
            cy="${centerY}"
            r="${radius}"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="${thickness}"
          />
          <!-- Data segments -->
          ${segments}
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <p class="text-xs text-slate-500">الإجمالي</p>
            <p class="text-lg font-bold text-slate-900 tabular-nums-custom">${totalDisplay.replace('ر.س', '')}</p>
            <p class="text-xs text-slate-400">ر.س</p>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render progress ring
   * @param {number} percentage 
   * @param {number} size 
   * @param {string} color 
   * @returns {string} HTML
   */
  progressRing(percentage, size = 120, color = '#22c55e') {
    const radius = size * 0.4;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;
    
    return `
      <div class="relative inline-block">
        <svg width="${size}" height="${size}" class="transform -rotate-90">
          <circle
            cx="${size/2}"
            cy="${size/2}"
            r="${radius}"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="${size * 0.08}"
          />
          <circle
            cx="${size/2}"
            cy="${size/2}"
            r="${radius}"
            fill="none"
            stroke="${color}"
            stroke-width="${size * 0.08}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
            stroke-linecap="round"
            class="transition-all duration-1000 ease-out"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-xl font-bold ${color === '#22c55e' ? 'text-primary-600' : color === '#ef4444' ? 'text-danger-600' : 'text-warning-600'}">
            ${percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    `;
  },

  /**
   * Render bar chart
   * @param {Array} labels 
   * @param {Array} values 
   * @param {Array} colors 
   * @param {number} height 
   * @returns {string} HTML
   */
  barChart(labels, values, colors, height = 200) {
    const maxValue = Math.max(...values, 1);
    const barWidth = 60;
    const gap = 20;
    const chartWidth = labels.length * (barWidth + gap) + gap;
    
    const bars = values.map((value, index) => {
      const barHeight = (value / maxValue) * (height - 40);
      const color = colors?.[index] || (value >= 0 ? '#22c55e' : '#ef4444');
      
      return `
        <div class="flex flex-col items-center gap-2">
          <div class="text-xs font-semibold tabular-nums-custom ${value >= 0 ? 'text-primary-600' : 'text-danger-600'}">
            ${Helpers.formatCurrency(value, false)}
          </div>
          <div 
            class="w-[${barWidth}px] rounded-t-lg transition-all duration-500 ease-out hover:opacity-80 cursor-pointer"
            style="height: ${barHeight}px; background-color: ${color};"
            title="${labels[index]}: ${Helpers.formatCurrency(value)}"
          ></div>
          <div class="text-xs text-slate-600 text-center max-w-[${barWidth}px] truncate">
            ${labels[index]}
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <div class="w-full overflow-x-auto">
        <div class="flex items-end gap-[${gap}px] h-[${height}px] pb-8 min-w-max px-4">
          ${bars}
        </div>
      </div>
    `;
  },

  /**
   * Render grouped bar chart for monthly data
   * @param {Array} data - [{ month, values: [val1, val2, val3], labels: ['lbl1', 'lbl2', 'lbl3'] }]
   * @returns {string} HTML
   */
  groupedBarChart(data, height = 250) {
    if (!data || data.length === 0) return '<div class="text-center text-slate-500">لا توجد بيانات</div>';
    
    const allValues = data.flatMap(d => d.values);
    const maxValue = Math.max(...allValues, 1);
    const groupGap = 40;
    const barWidth = 24;
    const barsPerGroup = data[0]?.values?.length || 1;
    const groupWidth = barsPerGroup * barWidth + (barsPerGroup - 1) * 4;
    const chartWidth = data.length * (groupWidth + groupGap) + groupGap;
    
    const colors = ['#22c55e', '#3b82f6', '#f59e0b'];
    
    const groups = data.map((group, groupIndex) => {
      const bars = group.values.map((value, barIndex) => {
        const barHeight = (value / maxValue) * (height - 60);
        const color = colors[barIndex] || '#64748b';
        
        return `
          <div 
            class="w-[${barWidth}px] rounded-t transition-all duration-300 hover:opacity-80"
            style="height: ${Math.max(barHeight, 4)}px; background-color: ${color};"
            title="${group.labels?.[barIndex] || 'قيمة'}: ${Helpers.formatCurrency(value)}"
          ></div>
        `;
      }).join('');
      
      return `
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-end gap-1 h-[${height - 60}px]">
            ${bars}
          </div>
          <div class="text-xs text-slate-600 font-medium">${group.month}</div>
        </div>
      `;
    }).join('');
    
    const legend = (data[0]?.labels || ['']).map((label, i) => `
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-sm" style="background-color: ${colors[i] || '#64748b'};"></div>
        <span class="text-xs text-slate-600">${label}</span>
      </div>
    `).join('');
    
    return `
      <div class="w-full">
        <div class="flex items-center gap-4 mb-4">${legend}</div>
        <div class="w-full overflow-x-auto">
          <div class="flex items-end gap-[${groupGap}px] h-[${height}px] pb-4 min-w-max px-4">
            ${groups}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render progress bar
   * @param {number} percentage 
   * @param {string} color 
   * @param {boolean} showLabel 
   * @returns {string} HTML
   */
  progressBar(percentage, color = 'bg-primary-600', showLabel = true) {
    return `
      <div class="w-full">
        <div class="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div 
            class="h-full ${color} transition-all duration-700 ease-out rounded-full"
            style="width: ${Math.min(percentage, 100)}%;"
          ></div>
        </div>
        ${showLabel ? `<p class="text-xs text-slate-500 mt-1 text-left">${percentage.toFixed(1)}%</p>` : ''}
      </div>
    `;
  },

  /**
   * Render sparkline (mini trend line)
   * @param {Array} values 
   * @param {string} color 
   * @returns {string} HTML
   */
  sparkline(values, color = '#22c55e', width = 100, height = 30) {
    if (!values || values.length < 2) return '';
    
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;
    
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    const isPositive = values[values.length - 1] >= values[0];
    const strokeColor = isPositive ? '#22c55e' : '#ef4444';
    
    return `
      <svg width="${width}" height="${height}" class="overflow-visible">
        <polyline
          points="${points}"
          fill="none"
          stroke="${strokeColor}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;
  }
};

window.Charts = Charts;
