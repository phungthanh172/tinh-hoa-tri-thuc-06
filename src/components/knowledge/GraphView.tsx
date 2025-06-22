
import React, { useEffect, useRef } from 'react';
import { Note, GraphNode, GraphLink } from '@/types/note';
import { Network } from 'lucide-react';

interface GraphViewProps {
  notes: Note[];
  selectedNoteId?: string;
  onSelectNote: (noteId: string) => void;
}

const GraphView = ({ notes, selectedNoteId, onSelectNote }: GraphViewProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Create graph data from notes
  const createGraphData = () => {
    const nodes: GraphNode[] = notes.map((note, index) => ({
      id: note.id,
      title: note.title,
      group: Math.floor(index / 5), // Simple grouping
      tags: note.tags,
      linkCount: note.links.length,
      backLinkCount: notes.filter(n => n.links.includes(note.title)).length
    }));

    const links: GraphLink[] = [];
    
    notes.forEach(note => {
      note.links.forEach(linkTitle => {
        const targetNote = notes.find(n => n.title === linkTitle);
        if (targetNote) {
          links.push({
            source: note.id,
            target: targetNote.id,
            type: 'wiki',
            strength: 1
          });
        }
      });
    });

    return { nodes, links };
  };

  const { nodes, links } = createGraphData();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Simple force-directed layout simulation
    const simulation = {
      nodes: nodes.map((node, i) => ({
        ...node,
        x: (width / 2) + Math.cos(i * 2 * Math.PI / nodes.length) * Math.min(width, height) * 0.3,
        y: (height / 2) + Math.sin(i * 2 * Math.PI / nodes.length) * Math.min(width, height) * 0.3,
        radius: 8 + (node.linkCount * 2)
      }))
    };

    // Draw links
    links.forEach(link => {
      const sourceNode = simulation.nodes.find(n => n.id === link.source);
      const targetNode = simulation.nodes.find(n => n.id === link.target);
      
      if (sourceNode && targetNode) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', sourceNode.x.toString());
        line.setAttribute('y1', sourceNode.y.toString());
        line.setAttribute('x2', targetNode.x.toString());
        line.setAttribute('y2', targetNode.y.toString());
        line.setAttribute('stroke', '#e5e7eb');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('opacity', '0.6');
        svg.appendChild(line);
      }
    });

    // Draw nodes
    simulation.nodes.forEach(node => {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('cursor', 'pointer');
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', node.radius.toString());
      circle.setAttribute('fill', selectedNoteId === node.id ? '#3b82f6' : '#6b7280');
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', '2');
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x.toString());
      text.setAttribute('y', (node.y + node.radius + 15).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '12');
      text.setAttribute('fill', '#374151');
      text.textContent = node.title.length > 15 ? node.title.slice(0, 15) + '...' : node.title;
      
      group.appendChild(circle);
      group.appendChild(text);
      
      group.addEventListener('click', () => {
        onSelectNote(node.id);
      });
      
      svg.appendChild(group);
    });
  }, [notes, selectedNoteId, onSelectNote]);

  return (
    <div className="h-full bg-gray-50 relative">
      {notes.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Network className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No notes to visualize</p>
            <p className="text-sm">Create some notes with links to see the graph</p>
          </div>
        </div>
      ) : (
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
        />
      )}
    </div>
  );
};

export default GraphView;
