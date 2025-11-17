import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function DataPipeline2D({ isPlaying, speed, onNodeClick, timePosition, onTimeChange }) {
  const svgRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 80, right: 40, bottom: 40, left: 40 };

    // Define nodes
    const nodes = [
      { id: 'ingestion', label: 'Data Ingestion', x: margin.left + 100, y: height / 2, color: '#3B82F6' },
      { id: 'preprocessing', label: 'Preprocessing', x: margin.left + 300, y: height / 2, color: '#3B82F6' },
      { id: 'validation', label: 'Validation', x: margin.left + 500, y: height / 2, color: '#10B981' },
      { id: 'feature-store', label: 'Feature Store', x: margin.left + 700, y: height / 2 - 100, color: '#8B5CF6' },
      { id: 'training-data', label: 'Training Data', x: margin.left + 700, y: height / 2 + 100, color: '#F59E0B' },
    ];

    // Define links
    const links = [
      { source: 'ingestion', target: 'preprocessing' },
      { source: 'preprocessing', target: 'validation' },
      { source: 'validation', target: 'feature-store' },
      { source: 'validation', target: 'training-data' },
    ];

    // Create links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', isPlaying ? '5,5' : 'none')
      .attr('opacity', 0.6);

    // Animate links
    if (isPlaying) {
      link
        .transition()
        .duration(1000 / speed)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', -10)
        .on('end', function repeat() {
          d3.select(this)
            .attr('stroke-dashoffset', 0)
            .transition()
            .duration(1000 / speed)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', -10)
            .on('end', repeat);
        });
    }

    // Create nodes
    const node = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => onNodeClick(d.id));

    // Add circles
    node
      .append('circle')
      .attr('r', 40)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .on('mouseover', function() {
        d3.select(this).attr('r', 50);
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 40);
      });

    // Add labels
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', '#fff')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(d => d.label);

    // Add data particles
    if (isPlaying) {
      const particles = [];
      links.forEach((linkData, idx) => {
        const sourceNode = nodes.find(n => n.id === linkData.source);
        const targetNode = nodes.find(n => n.id === linkData.target);
        
        for (let i = 0; i < 3; i++) {
          particles.push({
            linkIdx: idx,
            progress: i / 3,
            source: sourceNode,
            target: targetNode,
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
          .attr('r', 5)
          .merge(particle)
          .attr('fill', '#3B82F6')
          .attr('opacity', 0.8)
          .attr('cx', d => {
            const t = (d.progress + (isPlaying ? 0.01 * speed : 0)) % 1;
            return d.source.x + (d.target.x - d.source.x) * t;
          })
          .attr('cy', d => {
            const t = (d.progress + (isPlaying ? 0.01 * speed : 0)) % 1;
            return d.source.y + (d.target.y - d.source.y) * t;
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
  }, [isPlaying, speed, onNodeClick]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' }}
    />
  );
}

