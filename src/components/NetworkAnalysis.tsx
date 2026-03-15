import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';

const data = {
  nodes: [
    { id: 'Scammer (KR IP: 211.x.x.x)', group: 1 },
    { id: 'Crypto Wallet (KR)', group: 2 },
    { id: 'Bank Account (KR)', group: 2 },
    { id: 'Local Exchange', group: 3 },
    { id: 'Victim (Seoul)', group: 4 },
    { id: 'Victim (Busan)', group: 4 },
    { id: 'Victim (Incheon)', group: 4 },
    { id: 'Scammer (Overseas)', group: 1 },
    { id: 'Proxy Server (Seoul)', group: 2 },
  ],
  links: [
    { source: 'Scammer (KR IP: 211.x.x.x)', target: 'Crypto Wallet (KR)', value: 5 },
    { source: 'Scammer (KR IP: 211.x.x.x)', target: 'Bank Account (KR)', value: 5 },
    { source: 'Crypto Wallet (KR)', target: 'Local Exchange', value: 2 },
    { source: 'Bank Account (KR)', target: 'Local Exchange', value: 2 },
    { source: 'Victim (Seoul)', target: 'Crypto Wallet (KR)', value: 1 },
    { source: 'Victim (Busan)', target: 'Crypto Wallet (KR)', value: 1 },
    { source: 'Victim (Incheon)', target: 'Bank Account (KR)', value: 1 },
    { source: 'Scammer (Overseas)', target: 'Proxy Server (Seoul)', value: 5 },
    { source: 'Proxy Server (Seoul)', target: 'Local Exchange', value: 2 },
    { source: 'Scammer (KR IP: 211.x.x.x)', target: 'Scammer (Overseas)', value: 1 },
  ]
};

export function NetworkAnalysis() {
  const { t } = useTranslation();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(data.nodes as any)
      .force('link', d3.forceLink(data.links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#27272a')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('stroke', '#09090b')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', (d: any) => {
        const colors = ['#ef4444', '#f59e0b', '#10b981', '#6366f1'];
        return colors[d.group - 1] || '#71717a';
      })
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('title')
      .text((d: any) => d.id);

    const labels = svg.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .text((d: any) => d.id)
      .attr('font-size', '10px')
      .attr('fill', '#a1a1aa')
      .attr('dx', 12)
      .attr('dy', 4);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{t('network')}</h2>
        <p className="text-zinc-500">{t('network_desc')}</p>
      </header>

      <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden p-4">
        <svg ref={svgRef} className="w-full h-auto max-h-[600px]"></svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-zinc-400">{t('scammer_entity')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-xs text-zinc-400">{t('wallet_account')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-zinc-400">{t('exchange_service')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500" />
          <span className="text-xs text-zinc-400">{t('victim_target')}</span>
        </div>
      </div>
    </div>
  );
}
