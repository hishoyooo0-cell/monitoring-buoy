// MonitoringBuoy demo dashboard. Replace arrays with validated sensor records/API response when available.
(() => {
  const labels = ['08:00','08:10','08:20','08:30','08:40','08:50','09:00','09:10','09:20','09:30'];
  const colors = ['#00a4a7','#ff8a00','#5bbdc5','#234b50'];
  const ancol = {
    depth:[0,1,2,3,4], do:[6.4,6.2,5.9,5.5,5.1], ph:[8.1,8.05,8.0,7.92,7.88], chl:[2.2,2.8,3.5,3.1,2.6],
    tempDO:[29.1,29.2,29.0,29.0,28.9,29.1,29.2,29.1,29.0,29.1], tempPH:[29.0,29.0,28.9,28.9,28.8,29.0,29.0,28.9,28.9,29.0], tempCHL:[28.8,28.9,28.8,28.7,28.7,28.8,28.9,28.8,28.7,28.8], tempDepth:[28.7,28.7,28.6,28.6,28.5,28.6,28.7,28.6,28.6,28.5]
  };
  const cil = {
    doA:[5.9,6.0,6.1,5.8,5.7,5.9,6.0,5.8,5.9,6.1], satA:[78,80,82,77,76,79,81,78,79,82], tempA:[29.0,29.1,29.0,28.9,28.9,29.0,29.1,29.0,29.0,29.1],
    doB:[5.6,5.7,5.9,5.6,5.5,5.7,5.8,5.6,5.7,5.9], satB:[74,76,79,74,73,76,78,74,76,79], tempB:[28.8,28.9,28.8,28.7,28.7,28.8,28.9,28.8,28.8,28.9], chl:[3.1,3.2,3.3,3.5,3.4,3.6,3.5,3.7,3.8,3.7], tempChl:[28.7,28.8,28.8,28.7,28.7,28.8,28.9,28.8,28.8,28.9]
  };
  const charts = {};
  const makeLine = (id, datasets, options={}) => {
    const canvas = document.getElementById(id); if (!canvas || !window.Chart) return;
    charts[id] = new Chart(canvas.getContext('2d'), {type:'line', data:{labels:options.labels || labels, datasets:datasets.map((d,i)=>({label:d.label,data:d.data,borderColor:d.color||colors[i%colors.length],backgroundColor:d.color||colors[i%colors.length],borderWidth:2,pointRadius:2.5,tension:.25,fill:false}))}, options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:datasets.length>1,position:'bottom',labels:{usePointStyle:true,boxWidth:7,color:'#526f73',font:{family:'DM Sans',size:10}}},tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${c.parsed.y}`}}},scales:options.scales || {x:{grid:{display:false},ticks:{color:'#789194',font:{family:'DM Sans',size:10}}},y:{grid:{color:'#e9f0ef'},ticks:{color:'#789194',font:{family:'DM Sans',size:10}}}}}});
  };
  const depthScale = {x:{title:{display:true,text:'Nilai sensor',color:'#526f73'},grid:{color:'#e9f0ef'},ticks:{color:'#789194'},reverse:false},y:{title:{display:true,text:'Kedalaman (m)',color:'#526f73'},reverse:true,min:0,max:4,grid:{color:'#e9f0ef'},ticks:{color:'#789194',callback:v=>`${v} m`}}};
  const makeProfile = (id, label, values, color) => {
    const canvas = document.getElementById(id); if (!canvas || !window.Chart) return;
    charts[id] = new Chart(canvas.getContext('2d'), {type:'scatter',data:{datasets:[{label,data:values.map((v,i)=>({x:v,y:ancol.depth[i]})),showLine:true,borderColor:color,backgroundColor:color,borderWidth:2,pointRadius:4,tension:.25}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${label}: ${c.parsed.x} · kedalaman ${c.parsed.y} m`}}},scales:{x:{type:'linear',title:{display:true,text:'Nilai sensor',color:'#526f73'},grid:{color:'#e9f0ef'},ticks:{color:'#789194'}},y:{type:'linear',title:{display:true,text:'Kedalaman (m)',color:'#526f73'},reverse:true,min:0,max:4,grid:{color:'#e9f0ef'},ticks:{color:'#789194',callback:v=>`${v} m`}}}}});
  };
  makeProfile('ancolDO','DO',ancol.do,colors[0]);
  makeProfile('ancolPH','pH',ancol.ph,colors[1]);
  makeProfile('ancolCHL','Klorofil-a',ancol.chl,colors[2]);
  makeLine('ancolTemp', [{label:'Suhu sensor DO',data:ancol.tempDO,color:colors[0]},{label:'Suhu sensor pH',data:ancol.tempPH,color:colors[1]},{label:'Suhu sensor Chl-a',data:ancol.tempCHL,color:colors[2]},{label:'Suhu sensor kedalaman',data:ancol.tempDepth,color:colors[3]}]);
  makeLine('cilDO',[{label:'DO sensor A',data:cil.doA,color:colors[0]},{label:'DO sensor B',data:cil.doB,color:colors[1]}]);
  makeLine('cilCHL',[{label:'Klorofil-a',data:cil.chl,color:colors[2]}]);
  makeLine('cilSat',[{label:'Saturasi DO A',data:cil.satA,color:colors[0]},{label:'Saturasi DO B',data:cil.satB,color:colors[1]}]);
  makeLine('cilTemp',[{label:'Suhu DO A',data:cil.tempA,color:colors[0]},{label:'Suhu DO B',data:cil.tempB,color:colors[1]},{label:'Suhu Chl-a',data:cil.tempChl,color:colors[2]}]);
  function quality(doVal, phVal, chlVal) {
    // Demonstration-only thresholds; replace with project-approved/local regulatory thresholds.
    if (doVal < 4 || phVal < 6.5 || phVal > 8.5 || chlVal > 10) return ['Buruk','bad'];
    if (doVal < 5 || phVal < 7 || phVal > 8.3 || chlVal > 5) return ['Sedang','medium'];
    return ['Baik','good'];
  }
  function statusTag(q){return `<span class="quality-pill ${q[1]}">${q[0]}</span>`;}
  const ancolRows = labels.map((time,i)=>({time,depth:ancol.depth[i%5],do:ancol.do[i%5],ph:ancol.ph[i%5],chl:ancol.chl[i%5],td:ancol.tempDO[i],tp:ancol.tempPH[i],tc:ancol.tempCHL[i],tz:ancol.tempDepth[i]}));
  document.getElementById('ancolTable').innerHTML=ancolRows.map(r=>`<tr><td>${r.time}</td><td>${r.depth.toFixed(1)}</td><td>${r.do.toFixed(2)}</td><td>${r.ph.toFixed(2)}</td><td>${r.chl.toFixed(2)}</td><td>${r.td.toFixed(1)}</td><td>${r.tp.toFixed(1)}</td><td>${r.tc.toFixed(1)}</td><td>${r.tz.toFixed(1)}</td><td>${statusTag(quality(r.do,r.ph,r.chl))}</td></tr>`).join('');
  document.getElementById('cilTable').innerHTML=labels.map((time,i)=>`<tr><td>${time}</td><td>${cil.doA[i].toFixed(2)}</td><td>${cil.satA[i].toFixed(0)}</td><td>${cil.tempA[i].toFixed(1)}</td><td>${cil.doB[i].toFixed(2)}</td><td>${cil.satB[i].toFixed(0)}</td><td>${cil.tempB[i].toFixed(1)}</td><td>${cil.chl[i].toFixed(2)}</td><td>${cil.tempChl[i].toFixed(1)}</td><td>${statusTag(quality(Math.min(cil.doA[i],cil.doB[i]),8.0,cil.chl[i]))}</td></tr>`).join('');
  const trend = values => {const a=values[values.length-1],b=values[values.length-2];return Math.abs(a-b)<.15?'● Stabil':a>b?'↗ Naik':'↘ Turun';};
  document.getElementById('ancolTrend').textContent=trend(ancol.do); document.getElementById('cilTrend').textContent=trend(cil.doA);
  const select=document.getElementById('buoySelect'), ancolEl=document.getElementById('ancolDashboard'), cilEl=document.getElementById('cilincingDashboard');
  select.addEventListener('change',()=>{const isAncol=select.value==='ancol';ancolEl.hidden=!isAncol;cilEl.hidden=isAncol;});
})();
