import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function MLOpsPipeline({ isPlaying, speed, onStageClick }) {
  const svgRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 100, right: 40, bottom: 40, left: 40 };

    // Define stages
    const stages = [
      { id: 'source', label: 'Source Control', x: margin.left + 100, y: height / 2, color: '#3B82F6', status: 'success' },
      { id: 'build', label: 'Build & Test', x: margin.left + 250, y: height / 2, color: '#10B981', status: 'success' },
      { id: 'train', label: 'Training', x: margin.left + 400, y: height / 2, color: '#F59E0B', status: 'running' },
      { id: 'validate', label: 'Validation', x: margin.left + 550, y: height / 2, color: '#8B5CF6', status: 'pending' },
      { id: 'deploy', label: 'Deployment', x: margin.left + 700, y: height / 2, color: '#06B6D4', status: 'pending' },
      { id: 'monitor', label: 'Monitoring', x: margin.left + 850, y: height / 2, color: '#EF4444', status: 'pending' },
    ];

    // Define links
    const links = [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 4, target: 5 },
    ];

    // Create links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', d => stages[d.source].x + 50)
      .attr('y1', d => stages[d.source].y)
      .attr('x2', d => stages[d.target].x - 50)
      .attr('y2', d => stages[d.target].y)
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 4)
      .attr('stroke-dasharray', isPlaying ? '10,5' : 'none')
      .attr('opacity', 0.6)
      .attr('marker-end', 'url(#arrowhead)');

    // Add arrow marker
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 0)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#94a3b8');

    // Animate links
    if (isPlaying) {
      link
        .transition()
        .duration(2000 / speed)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', -15)
        .on('end', function repeat() {
          d3.select(this)
            .attr('stroke-dashoffset', 0)
            .transition()
            .duration(2000 / speed)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', -15)
            .on('end', repeat);
        });
    }

    // Create stages
    const stage = svg
      .append('g')
      .selectAll('g')
      .data(stages)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => onStageClick(d.id));

    // Add rectangles
    stage
      .append('rect')
      .attr('x', -50)
      .attr('y', -30)
      .attr('width', 100)
      .attr('height', 60)
      .attr('rx', 8)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('opacity', d => d.status === 'running' && isPlaying ? 0.8 : 1)
      .on('mouseover', function() {
        d3.select(this).attr('width', 110).attr('height', 70).attr('x', -55).attr('y', -35);
      })
      .on('mouseout', function() {
        d3.select(this).attr('width', 100).attr('height', 60).attr('x', -50).attr('y', -30);
      });

    // Add status indicators
    stage
      .append('circle')
      .attr('cx', 35)
      .attr('cy', -20)
      .attr('r', 6)
      .attr('fill', d => {
        if (d.status === 'success') return '#10B981';
        if (d.status === 'running') return '#F59E0B';
        return '#94a3b8';
      })
      .attr('opacity', d => d.status === 'running' && isPlaying ? 0.8 : 1);

    // Animate running status
    if (isPlaying) {
      stage
        .filter(d => d.status === 'running')
        .select('circle')
        .transition()
        .duration(500 / speed)
        .ease(d3.easeLinear)
        .attr('opacity', 0.3)
        .transition()
        .duration(500 / speed)
        .ease(d3.easeLinear)
        .attr('opacity', 1)
        .on('end', function repeat() {
          d3.select(this)
            .transition()
            .duration(500 / speed)
            .ease(d3.easeLinear)
            .attr('opacity', 0.3)
            .transition()
            .duration(500 / speed)
            .ease(d3.easeLinear)
            .attr('opacity', 1)
            .on('end', repeat);
        });
    }

    // Add labels
    stage
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text(d => d.label);

    // Add data flow particles
    if (isPlaying) {
      const particles = [];
      links.forEach((linkData, idx) => {
        const source = stages[linkData.source];
        const target = stages[linkData.target];
        
        for (let i = 0; i < 2; i++) {
          particles.push({
            linkIdx: idx,
            progress: i / 2,
            sourceX: source.x + 50,
            sourceY: source.y,
            targetX: target.x - 50,
            targetY: target.y,
          });
        }
      });

      const particleGroup = svg.append('g').attr('class', 'particles');

      const updateParticles = () => {
        const particle = particleGroup
          .selectAll('circle.particle')
          .data(particles);

        particle
          .enter()
          .append('circle')
          .attr('class', 'particle')
          .attr('r', 6)
          .merge(particle)
          .attr('fill', '#3B82F6')
          .attr('opacity', 0.9)
          .attr('cx', d => {
            const t = (d.progress + (isPlaying ? 0.01 * speed : 0)) % 1;
            return d.sourceX + (d.targetX - d.sourceX) * t;
          })
          .attr('cy', d => {
            const t = (d.progress + (isPlaying ? 0.01 * speed : 0)) % 1;
            return d.sourceY + (d.targetY - d.sourceY) * t;
          });

        particles.forEach(p => {
          if (isPlaying) {
            p.progress = (p.progress + 0.01 * speed) % 1;
          }
        });
      };

      animationRef.current = setInterval(updateParticles, 50);
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying, speed, onStageClick]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' }}
    />
  );
}

