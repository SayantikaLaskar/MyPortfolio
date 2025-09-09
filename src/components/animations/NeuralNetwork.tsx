import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  layer: number;
}

interface Connection {
  from: Node;
  to: Node;
  animated: boolean;
}

interface NeuralNetworkProps {
  className?: string;
  animated?: boolean;
}

export function NeuralNetwork({ className = '', animated = true }: NeuralNetworkProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    // Create a simple, clean 3-layer network
    const layers = [4, 5, 3]; // Input, hidden, output layers
    const newNodes: Node[] = [];
    const layerSpacing = 200;
    const nodeSpacing = 80;

    layers.forEach((nodeCount, layerIndex) => {
      const startY = -(nodeCount - 1) * nodeSpacing / 2;
      
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: `${layerIndex}-${i}`,
          x: layerIndex * layerSpacing - 200, // Center the network
          y: startY + i * nodeSpacing,
          layer: layerIndex,
        });
      }
    });

    // Create connections between adjacent layers
    const newConnections: Connection[] = [];
    for (let layer = 0; layer < layers.length - 1; layer++) {
      const currentLayerNodes = newNodes.filter(n => n.layer === layer);
      const nextLayerNodes = newNodes.filter(n => n.layer === layer + 1);

      currentLayerNodes.forEach(fromNode => {
        nextLayerNodes.forEach(toNode => {
          newConnections.push({
            from: fromNode,
            to: toNode,
            animated: Math.random() > 0.8, // Only animate few connections
          });
        });
      });
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="-300 -200 600 400"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections */}
        {connections.map((connection, index) => (
          <motion.line
            key={`connection-${index}`}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="#568F87"
            strokeWidth="1.5"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: connection.animated ? [0.3, 0.6, 0.3] : 0.3
            }}
            transition={{
              pathLength: { duration: 2, delay: index * 0.1 },
              opacity: connection.animated ? {
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              } : { duration: 1 }
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="#F5BABB"
              stroke="#568F87"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1 
              }}
              transition={{
                duration: 0.5, 
                delay: node.layer * 0.3
              }}
            />
          </g>
        ))}

        {/* Data flow particles - very subtle */}
        {animated && connections
          .filter(c => c.animated)
          .slice(0, 2)
          .map((connection, index) => (
            <motion.circle
              key={`particle-${index}`}
              r="3"
              fill="#568F87"
              opacity="0.6"
              initial={{
                cx: connection.from.x,
                cy: connection.from.y,
                opacity: 0,
              }}
              animate={{
                cx: [connection.from.x, connection.to.x],
                cy: [connection.from.y, connection.to.y],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 1.5,
                ease: "easeInOut",
              }}
            />
          ))}
      </svg>
    </div>
  );
}